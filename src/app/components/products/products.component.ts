import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../models/product';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  //products: Product[] | null = null; // M1
  //products$: Observable<Product[]> | null = null; // M2
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // recuperer les products
  onGetAllProducts() {
    // Methode 1
    // Stocke l'observable pour le template avec l'async pipe
    // this.products$ = this.productsService.getAllProducts();

    // // Si vous voulez également vous abonner et effectuer des opérations supplémentaires
    // this.products$.subscribe({
    //   next: (data) => {
    //     console.log('Produits récupérés :', data);
    //   },
    //   error: (err) => {
    //     console.error('Erreur lors de la récupération des produits :', err);
    //   },
    //   complete: () => {
    //     console.log('Récupération des produits terminée.');
    //   },
    // });

    // Methode 3
    console.log('start');
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );

    // Methode 2
    // this.productsService.getAllProducts().subscribe(
    //   (data) => {
    //     this.products = data;
    //     console.log(data);
    //     console.dir(data);
    //   },
    //   (err) => {
    //     console.error('Erreur lors de la récupération des produits :', err);
    //   }
    // );
  }

  // function for submit form
  onSerach(dataForm: any) {
    // to get keyword in input dataForm.keyword
    console.log(dataForm.keyword);
    this.products$ = this.productsService.searchProduts(dataForm.keyword).pipe(
      map((data) => {
        console.log('deux', data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  // delete  product
  onDeleteProduct(product: Product) {
    console.log('delete product', product);

    let confirme = confirm('Are you sure you want to delete this product');
    if (confirme) {
      let deleted = this.productsService.deleteProdcuts(product);
      deleted.subscribe((data) => {
        this.onGetAllProducts();
      });
    }
  }

  // update product
  onUpdateProduct(product: Product) {
    console.log('update product', product);
    this.router.navigateByUrl('/editProduct/' + product.id);
  }

  // create product
  onNewProduct() {
    // use router there to navigate to form Add
    this.router.navigateByUrl('/newProduct');
  }

  /////////////////////////////////////////
  // get product selected
  onGetSelectedProduct() {
    console.log('start');
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelectProduct(product: Product) {
    console.log('select from compo', product);
    let select = this.productsService.onSelectProduct(product);
    select.subscribe((data) => {
      product.selected = data.selected;
    });
  }

  /// get Availibale
  onGetAvaiableProduct() {
    console.log('start');
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        console.log(data);
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      // pour qui va retourne ou debut de la requete
      startWith({ dataState: DataStateEnum.LOADIN }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onAvaliableProduct(product: Product) {
    let avaliable = this.productsService.onAvailableProduct(product);
    avaliable.subscribe((data) => {
      product.available = data.available;
    });
  }
}
