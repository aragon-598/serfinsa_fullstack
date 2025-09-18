import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService, Product, TipoProducto } from './product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm;
  tipos: TipoProducto[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      tipoProducto: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  private mapFormToProduct(): Product {
    const value = this.productForm.value;
    return {
      nombre: value.nombre ?? '',
      descripcion: value.descripcion ?? '',
      precio: value.precio ?? 0,
      stock: value.stock ?? 0,
      tipoProducto: value.tipoProducto ?? { id: 0, nombre: '', descripcion: '' }
    };
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    this.loading = true;
    const product = this.mapFormToProduct();
    this.productService.createProduct(product).subscribe({
      next: () => {
        this.snackBar.open('Producto creado con éxito', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/productos']);
      },
      error: () => {
        this.snackBar.open('Error al crear producto', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
