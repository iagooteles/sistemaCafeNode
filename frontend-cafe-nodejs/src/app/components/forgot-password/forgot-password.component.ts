import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { catchError, tap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatToolbarModule, MatDialogModule, ReactiveFormsModule, MatFormField, MatLabel, MatError, NgIf, MatInputModule, HttpClientModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  forgotPasswordForm:any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder:FormBuilder, 
    private userService:UserService,
    private router:Router, 
    private dialogRef:MatDialogRef<ForgotPasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService  
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
    });
  }

  handleSubmit() {
    this.ngxService.start();
    
    const formData = this.forgotPasswordForm.value;
    const data = {
      email: formData.email
    }

  this.userService.forgotPassword(data).pipe(
    tap((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      
      this.dialogRef.close();
      this.snackbarService.openSnackBar(`Email enviado com sucesso para: ${data.email}.`, "");
      this.router.navigate(["/"]);
    }),
    catchError((error) => {
      this.ngxService.stop();      
      this.responseMessage = error.error?.message || GlobalConstants.genericError;
      this.snackbarService.openSnackBar(this.responseMessage, "error");
      return EMPTY;
    })
  ).subscribe();
  }
}
