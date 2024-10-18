import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../shared/global-constants';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatToolbarModule, MatDialogModule, MatFormField, MatLabel, MatError, ReactiveFormsModule, FlexLayoutModule, MatInputModule, NgIf, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:any = FormGroup;
  responseMessage:any;

  constructor(
    private formBuilder:FormBuilder, 
    private router:Router, 
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService
  ) { }

  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      email:[null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, Validators.required]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.loginForm.value;
    const data = {
      email: formData.email,
      password: formData.password
    }

    this.userService.login(data).pipe(
      tap((response:any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        this.router.navigate(['/cafe/dashboard']);
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
