import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    let feedbackMessage = message;
    let panelClass = action === 'error' ? ['black-snackbar'] : ['green-snackbar'];

    if (message === "There is no asd@teste.com in this app.") {
      feedbackMessage = "Não existe este email neste app.";
      panelClass = ['black-snackbar']
    }

    this.snackbar.open(feedbackMessage, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: panelClass
    });
  }
}
