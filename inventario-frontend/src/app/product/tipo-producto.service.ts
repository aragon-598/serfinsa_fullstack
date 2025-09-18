import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoProducto } from './product.service';

@Injectable({ providedIn: 'root' })
export class TipoProductoService {
  private apiUrl = `${environment.apiUrl}/tipo-productos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl);
  }
}
