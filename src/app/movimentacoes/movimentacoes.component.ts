import { MovimentsService } from './moviments.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Moviment } from './../models/moviment.model';
import { Product } from '../models/product.model';
import { Employee } from './../models/employee.model';
import { ProductsService } from '../produtos/products.service';
import { EmployeesService } from '../funcionarios/employees.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.scss']
})
export class MovimentacoesComponent implements OnInit {

  ascendingOrder = true;
  form: FormGroup;
  moviments: Moviment[] = [];
  movimentsTemp: Moviment[] = [];
  products: Product[] = [];
  employees: Employee[] = [];
  public busca = new FormControl('');

  columns = ['employee', 'product', 'quantity', 'date']


  constructor(
    private formBuilder: FormBuilder,
    private movimentsService: MovimentsService,
    private productsService: ProductsService,
    private employeesService: EmployeesService
  ) { }

  ngOnInit(): void {
    this.listAllMoviments();
    this.listAllProducts();
    this.listAllEmployees();
    this.createFormGroup();
    this.collapseMenu();
  }

  listAllProducts() {
    this.productsService.listAllProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.products = data;
    });
  }

  listAllEmployees() {
    return this.employeesService.listAllEmployees().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.employees = data;
    });
  }

  listAllMoviments() {
    return this.movimentsService.listAllMoviments().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.reactiveFilter(data);
    });
  }

  deleteMoviment(key) {
    this.movimentsService.deleteMoviment(key);
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      quantity: [null],
      input: [0],
      output: [0],
      date: [null],
      mover: [null, Validators.required],
      product: [null, Validators.required]
    });
  }

  pushMoviments(moviment) {
    this.movimentsService.pushMoviment(moviment);
  }

  onSubmit(form) {
    const quantity = this.form.value.input - this.form.value.output;
    const newDate = Date.now();
    this.form.patchValue({quantity: quantity, date: newDate})
    this.pushMoviments(form.value);
    this.form.reset({
      input: 0,
      output: 0,
      date: newDate
    });
  }

  // getDate() {
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, '0');
  //   var mm = String(today.getMonth() + 1).padStart(2, '0');
  //   var yyyy = today.getFullYear();
  //   var date = mm + '/' + dd + '/' + yyyy;
  //   return date;
  // }

  reactiveFilter(data) {
    console.log(data);
    this.movimentsTemp = data;
    this.moviments = data;
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      if (this.busca.value) this.filterArray(filterWord);
      if (!this.busca.value) this.moviments = this.movimentsTemp;
    });
  }

  filterArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.moviments = this.movimentsTemp.filter((el: Moviment) => el.mover.name.toLocaleLowerCase().includes(filterWord))
  }

  cssErro(param) {
    if (this.form && this.form.get(param).touched) {
      const valid = this.form.get(param).valid;
      return {
        'is-invalid': !valid,
        'is-valid': valid
      }
    }
  }

  checkValidTouched(param) {
    return !this.form.get(param).valid
  }

  organize(param: string) {
    this.moviments.sort((a: Moviment, b: Moviment) => this.sort(a, b, param))
    this.ascendingOrder = !this.ascendingOrder;
  }

  sort(a: Moviment, b: Moviment, param: string) {

    param = param.toLowerCase();

    let modelA = a[param];
    let modelB = b[param];

    if (typeof modelA === 'string' && typeof modelB === 'string') {
      modelA = modelA.toLowerCase();
      modelB = modelB.toLowerCase();
    }


    if (this.ascendingOrder) return this.sortAscending(modelA, modelB);
    return this.sortDescending(modelA, modelB);
  }

  sortAscending(modeloA, modeloB): number {
    if (modeloA > modeloB) return 1;
    return -1;
  }

  sortDescending(modeloA, modeloB): number {
    if (modeloA < modeloB) return 1;
    return -1;
  }


  collapseMenu() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }
}
