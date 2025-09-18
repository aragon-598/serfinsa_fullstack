
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteProductDialog } from './delete-product-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['nombre', 'descripcion', 'precio', 'stock', 'tipoProducto', 'acciones'];
  loading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: products => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  editProduct(product: Product) {
    this.router.navigate(['/productos', product.id]);
  }

  deleteProduct(product: Product) {
    console.log('Botón eliminar clickeado:', product); // Depuración
    const dialogRef = this.dialog.open(DeleteProductDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result); // Depuración
      if (result) {
        if (product.id == null) {
          this.snackBar.open('El producto no tiene ID', 'Cerrar', { duration: 3000 });
          console.error('ID de producto es null o undefined:', product);
          return;
        }
        console.log('Eliminando producto con ID:', product.id); // Depuración
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            console.log('Servicio deleteProduct ejecutado correctamente');
            this.snackBar.open('Producto eliminado con éxito', 'Cerrar', { duration: 2000 });
            this.loadProducts();
          },
          error: (err) => {
            console.error('Delete error:', err);
            if (err.status === 404) {
              this.snackBar.open('El producto no existe', 'Cerrar', { duration: 3000 });
            } else {
              this.snackBar.open('Error al eliminar producto', 'Cerrar', { duration: 3000 });
            }
          }
        });
      } else {
        console.log('Eliminación no funciona'); // Depuración
      }
    });
  }

  createProduct() {
    this.router.navigate(['/productos/nuevo']);
  }
}

// ...existing code...
// Eliminar la segunda declaración de ProductListComponent y referencias incorrectas
