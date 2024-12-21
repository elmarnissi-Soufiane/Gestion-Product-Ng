import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // recupere une listes des produits
  getAllProducts(): Observable<Product[]> {
    let host = 'http://localhost:3000';
    //let failedHots = 'http://localhost:8000';
    //let host = Math.random() > 0.2 ? validHost : failedHots;
    //let host = environment.host;
    console.log(host);
    let data = this.http.get<Product[]>(host + '/products');
    console.log('products', data);
    return data;
  }
  // Methode search
  searchProduts(keyword: string): Observable<Product[]> {
    //let host = environment.host;
    let validHost = 'http://localhost:3000';
    let failedHots = 'http://localhost:8000';
    let host = Math.random() > 0.2 ? validHost : failedHots;
    return this.http.get<Product[]>(host + '/products?name=' + keyword);
  }

  // delete Produt
  deleteProdcuts(product: Product): Observable<void> {
    let host = 'http://localhost:3000';
    return this.http.delete<void>(host + '/products/' + product.id);
  }

  ////////////////

  // get Sekected
  getSelectedProducts(): Observable<Product[]> {
    //let host = environment.host;
    let validHost = 'http://localhost:3000';
    let failedHots = 'http://localhost:8000';
    let host = Math.random() > 0.2 ? validHost : failedHots;
    return this.http.get<Product[]>(host + '/products?select=true');
  }

  // onSelectProduct
  onSelectProduct(product: Product): Observable<Product> {
    console.log('Prodcut selected service', product);
    let host = 'http://localhost:3000';
    // let failedHots = 'http://localhost:8000';
    // let host = Math.random() > 0.2 ? validHost : failedHots;

    // si eagala true prend false si non true
    product.selected = !product.selected;

    return this.http.put<Product>(host + '/products/' + product.id, product);
  }

  // get available
  getAvailableProduts(): Observable<Product[]> {
    //let host = environment.host;
    let host = 'http://localhost:3000';
    return this.http.get<Product[]>(host + '/products?available=true');
  }

  // select avaiblable Prudt
  onAvailableProduct(product: Product): Observable<Product> {
    console.log('available product service', product);
    let host = 'http://localhost:3000';
    product.available = !product.available;
    return this.http.put<Product>(host + '/products/' + product.id, product);
  }
}