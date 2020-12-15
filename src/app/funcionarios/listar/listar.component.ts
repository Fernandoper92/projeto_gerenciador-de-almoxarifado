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

  ordemCrescente = true;
  employees: Employee[];
  employeesTemp: Employee[];
  public busca = new FormControl('');

  colunas = ['Nome', 'ID', 'Cargo', 'Setor'];


  constructor(private employeeService: EmployeesService) { }

  ngOnInit(): void {
    this.getAllEmplyees();
  }

  getAllEmplyees() {
    this.employeeService.getAllEmployee().subscribe(data => this.reactiveFilter(data));
  }

  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(data => console.log('Deletado com sucesso!'));
    this.getAllEmplyees();
  }

  reactiveFilter(data) {
    this.employeesTemp = data;
    this.employees = this.employeesTemp;
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      if (this.busca.value) this.filterArray(filterWord);
      if (!this.busca.value) this.employees = this.employeesTemp;
    })
  }

  filterArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.employees = this.employeesTemp.filter((el: Employee) => el.name.toLocaleLowerCase().includes(filterWord))
  }

  organizar(param:string) {
    this.employees.sort((a,b) => this.ordenar(a,b,param))
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
