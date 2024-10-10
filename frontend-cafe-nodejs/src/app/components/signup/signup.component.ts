import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../shared/global-constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatToolbarModule, MatDialogModule, ReactiveFormsModule, MatFormField, MatLabel, MatError, FlexLayoutModule, MatInputModule, NgIf, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder:FormBuilder, 
    private router:Router, 
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: [null, [Validators.required]],
    })
  }
 
  handleSubmit() {
    this.ngxService.start();
    const formData = this.signupForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    };
 
    this.userService.signup(data).pipe(
      tap((response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = `${data.name} registrado com sucesso!`;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
        this.router.navigate(["/"]);
      }),
      catchError((error) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, "error");
        return of(null);
      })
    ).subscribe();
  }

}
