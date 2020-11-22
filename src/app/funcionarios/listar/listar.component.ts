import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Employee } from './../../models/employee.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  ordemCrescente = true;
  public busca = new FormControl('');
  teste: {}[] = [];

  colunas = ['Nome', 'ID', 'Cargo', 'Setor'];

  Employees: Employee[] = [];

  constructor() { }

  ngOnInit(): void {
    this.teste = this.Employees;
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
      if (!this.busca.value) this.teste = this.Employees;
    })
  }

  filterArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.teste = this.Employees.filter((el: Employee) => el.name.toLocaleLowerCase().includes(filterWord))
  }

  organizar(param:string) {
    this.teste.sort((a,b) => this.ordenar(a,b,param))
    this.ordemCrescente = !this.ordemCrescente;
  }

  ordenar(a, b, param) {

    param = param.toLowerCase();

    let modeloA = a[param];
    let modeloB = b[param];

    if(typeof modeloA === 'string' && typeof modeloB === 'string') {
      console.log('works')
    modeloA = modeloA.toUpperCase();
    modeloB = modeloB.toUpperCase();
    }

    if(this.ordemCrescente) return this.ordenarCrescente(modeloA, modeloB);
    return this.ordernarDecrescente(modeloA, modeloB);
  }

  ordenarCrescente(modeloA, modeloB): number {
    if(modeloA > modeloB) return 1;
    return -1;
  }

  ordernarDecrescente(modeloA, modeloB): number {
    if(modeloA < modeloB) return 1;
    return -1;
  }


}
