import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, TipoProducto } from './product.service';
import { TipoProductoService } from './tipo-producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule
  ]
})
export class ProductDetailComponent implements OnInit {
  onCancel() {
    this.router.navigate(['/productos']);
  }
  productForm;
  tipos: TipoProducto[] = [];
  loading = false;
  productId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private tipoProductoService: TipoProductoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      tipoProducto: [undefined as TipoProducto | undefined, Validators.required]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productId = id;
      this.loading = true;
      let loadedProduct: Product | undefined;
      let loadedTipos: TipoProducto[] = [];

      // Cargar ambos en paralelo y luego hacer el patch
      this.productService.getProductById(id).subscribe({
        next: product => {
          loadedProduct = product;
          // Si los tipos ya están cargados, hacer el patch
          if (loadedTipos.length > 0) {
            this.patchFormWithProductAndTipos(loadedProduct, loadedTipos);
            this.loading = false;
          }
        },
        error: () => {
          this.snackBar.open('Error al cargar producto', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/productos']);
        }
      });
      this.tipoProductoService.getAll().subscribe({
        next: tipos => {
          loadedTipos = tipos;
          this.tipos = tipos;
          // Si el producto ya está cargado, hacer el patch
          if (loadedProduct) {
            this.patchFormWithProductAndTipos(loadedProduct, loadedTipos);
            this.loading = false;
          }
        },
        error: () => {
          this.snackBar.open('Error al cargar tipos de producto', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  private patchFormWithProductAndTipos(product: Product, tipos: TipoProducto[]) {
    const tipoSeleccionado = tipos.find(t => t.id === product.tipoProducto?.id) ?? null;
    this.productForm.patchValue({
      ...product,
      tipoProducto: tipoSeleccionado
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.snackBar.open('Completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
      return;
    }
    if (!this.productId) return;
    this.loading = true;
    const formValue = this.productForm.value;
    const product: Product = {
      id: this.productId,
      nombre: formValue.nombre ?? '',
      descripcion: formValue.descripcion ?? '',
      precio: formValue.precio ?? 0,
      stock: formValue.stock ?? 0,
      tipoProducto: formValue.tipoProducto ?? { id: 0, nombre: '', descripcion: '' }
    };
    this.productService.updateProduct(this.productId, product).subscribe({
      next: () => {
        this.snackBar.open('Producto actualizado con éxito', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/productos']);
      },
      error: () => {
        this.snackBar.open('Error al actualizar producto', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
