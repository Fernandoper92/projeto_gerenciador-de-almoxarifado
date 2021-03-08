import { ProductsService } from './../products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Product } from './../../models/product.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  ordemCrescente = true;
  products: Product[] = []
  productsTemp: Product[] = []
  public busca = new FormControl('');

  columns = ['name', 'code', 'group', 'provider', 'stock'];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.listAllProducts();
  }

  listAllProducts() {
    this.productsService.listAllProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(products => {
      this.reactiveFilter(products);
    });
}

ifZero(number) {
  if(number < 1) return 'is-zero';
}

deleteProduct(key) {
  this.productsService.deleteProduct(key);
}

reactiveFilter(data) {
  this.productsTemp = data;
  this.products = data;
  this.busca.valueChanges.pipe(
    map(value => value.trim()),
    debounceTime(500),
    distinctUntilChanged(),
  ).subscribe((filterWord: string) => {
    if (this.busca.value) this.filterArray(filterWord);
    if (!this.busca.value) this.products = this.productsTemp;
  });
}

filterArray(filterWord) {
  filterWord = filterWord.toLowerCase()
  this.products = this.productsTemp.filter((el: Product) => el.name.toLocaleLowerCase().includes(filterWord))
}

organizar(param: string) {
  this.products.sort((a, b) => this.ordenar(a, b, param))
  this.ordemCrescente = !this.ordemCrescente;
}

ordenar(a, b, param) {
  let modeloA;
  let modeloB;

  param = param.toLowerCase();

  if (param === 'role' || param === 'sector') {
    modeloA = a['role'];
    modeloA = modeloA[param];
    modeloB = b['role'];
    modeloB = modeloB[param];
  } else {
    modeloA = a[param];
    modeloB = b[param];
  }

  // if(typeof modeloA === 'string' && typeof modeloB === 'string') {
  // modeloA = modeloA.toUpperCase();
  // modeloB = modeloB.toUpperCase();
  // }

  if (this.ordemCrescente) return this.ordenarCrescente(modeloA, modeloB);
  return this.ordernarDecrescente(modeloA, modeloB);
}

ordenarCrescente(modeloA, modeloB): number {
  if (modeloA > modeloB) return 1;
  return -1;
}

ordernarDecrescente(modeloA, modeloB): number {
  if (modeloA < modeloB) return 1;
  return -1;
}


}
