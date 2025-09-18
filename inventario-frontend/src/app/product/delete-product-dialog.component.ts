import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-product-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>¿Eliminar producto?</h2>
    <mat-dialog-content>Esta acción no se puede deshacer.</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="false">Cancelar</button>
      <button mat-button color="warn" mat-dialog-close="true">Eliminar</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class DeleteProductDialog {}
