import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule, MatCardModule, CurrencyPipe]
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.productService.getProductById(id).subscribe({
        next: product => {
          this.product = product;
          this.loading = false;
        },
        error: () => {
          this.snackBar.open('Error al cargar producto', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/productos']);
        }
      });
    }
  }
}
