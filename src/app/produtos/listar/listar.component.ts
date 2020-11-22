import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Product } from './../../models/product.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  ordemCrescente = true;
  public busca = new FormControl('');
  teste: {}[] = [];

  colunas = ['Nome', 'Cod.Estruturado', 'cod.Alternativo', 'estoque'];

  Products: Product[] = []

  constructor() { }

  ngOnInit(): void {
    this.teste = this.Products;
    this.reactiveFilter();
  }

  reactiveFilter() {
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      console.log(filterWord)
      if (this.busca.value) this.filterArray(filterWord);
      if (!this.busca.value) this.teste = this.Products;
    })
  }

  filterArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.teste = this.Products.filter((el: Product) => el.name.toLocaleLowerCase().includes(filterWord))
  }

  organizar(param: string) {
    this.teste.sort((a, b) => this.ordenar(a, b, param))
    this.ordemCrescente = !this.ordemCrescente;
  }

  ordenar(a, b, param) {

    param = param.toLowerCase();

    let modeloA = a[param];
    let modeloB = b[param];

    if (typeof modeloA === 'string' && typeof modeloB === 'string') {
      console.log('works')
      modeloA = modeloA.toUpperCase();
      modeloB = modeloB.toUpperCase();
    }

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
