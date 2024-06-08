import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  open(message: string, duration = 2000, action?: string): void {
    this.snackBar.open(message, action, { verticalPosition: 'top', duration });
  }
}
