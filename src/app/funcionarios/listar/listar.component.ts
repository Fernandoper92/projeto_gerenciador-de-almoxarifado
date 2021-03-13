import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Employee } from './../../models/employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  entry = 0;
  colunaOrdenada: string;
  ordemCrescente = true;
  employees: Employee[];
  employeesTemp: Employee[];
  public busca = new FormControl('');
  
  colunas = ['name', 'code', 'address', 'phoneNumber', 'position', 'sector'];

  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.listAllEmployees();
  }

  listAllEmployees() {
    this.employeeService.listAllEmployees().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.reactiveFilter(data);
    });
}

deleteEmployee(key) {
  this.employeeService.deleteEmployee(key);
}

reactiveFilter(data) {
  this.employeesTemp = data;
  this.employees = data;
  this.entry = this.employees.length;
  this.busca.valueChanges.pipe(
    map(value => value.trim()),
    debounceTime(500),
    distinctUntilChanged(),
  ).subscribe((filterWord: string) => {
    if (this.busca.value) this.filterArray(filterWord);
    if (!this.busca.value) this.employees = this.employeesTemp;
    this.entry = this.employees.length;
  })
}

filterArray(filterWord) {
  filterWord = filterWord.toLowerCase();
  this.employees = this.employeesTemp.filter((el: Employee) => {
    let name = `${el.name}${el.lastName}`
    if (name.toLocaleLowerCase().includes(filterWord)) return true
  });
}

organizar(param: string) {
  this.colunaOrdenada = param;
  this.employees.sort((a, b) => this.ordenar(a, b, param))
  this.ordemCrescente = !this.ordemCrescente;
}

ordenar(a, b, param) {
  let modeloA;
  let modeloB;

  if (param === 'position' || param === 'sector') {
    modeloA = a['position'];
    modeloA = modeloA[param];
    modeloB = b['position'];
    modeloB = modeloB[param];
  } else {
    modeloA = a[param];
    modeloB = b[param];
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
