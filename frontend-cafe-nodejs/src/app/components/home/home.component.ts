import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, BestSellerComponent, MatIconModule, SignupComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isMenuOpen = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userServices: UserService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
  
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
  
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.log('Token expirado.');
        localStorage.clear();
        this.router.navigate(['/']);
      } else {
        this.userServices.checkToken().subscribe({
          next: (response: any) => {
            this.router.navigate(['/cafe/dashboard']);
          },
          error: (error: any) => {
            console.log('Erro ao verificar o token:', error);
          }
        });
      }
    }
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    const menu = document.querySelector('ul');
    if (menu) {
      menu.classList.toggle('show');
    }
  }

  signupAction() { 
    try {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      this.dialog.open(SignupComponent, dialogConfig);
    } catch (error) {
      console.log(error + "... erro ao abrir o modal");
    }
  }

  forgotPasswordAction() {
    try {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      this.dialog.open(ForgotPasswordComponent, dialogConfig);
    } catch (error) {
      console.log(error + "... erro ao abrir o modal");
    }
  }

  loginAction() {
    try {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      this.dialog.open(LoginComponent, dialogConfig);
    } catch (error) {
      console.log(error + "... erro ao abrir o modal");
    }
  }
}
