import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { BestSellerComponent } from "../best-seller/best-seller.component";
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, BestSellerComponent, MatIconModule, SignupComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private dialog: MatDialog, private ngxLoader: NgxUiLoaderService) { }

  // ngOnInit() {
  //   this.ngxLoader.start();

  //   setTimeout(() => {
  //     this.ngxLoader.stop();
  //   }, 3000);
  // }

  signupAction() { 
    try {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      this.dialog.open(SignupComponent, dialogConfig);
    } catch (error) {
      console.log(error + "... erro ao abrir o modal");
    }
  }
}
