import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    const panelClass = action === 'error' ? ['black-snackbar'] : ['green-snackbar'];

    this.snackbar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: panelClass
    });
  }
}
