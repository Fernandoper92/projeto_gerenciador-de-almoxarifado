import { MovimentsService } from './moviments.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Moviment } from './../models/moviment.model';
import { Product } from '../models/product.model';
import { Employee } from './../models/employee.model';
import { Provider } from '../models/provider.model';
import { Branch } from '../models/branch.model';
import { ProductsService } from '../produtos/products.service';
import { EmployeesService } from '../funcionarios/employees.service';
import { ProvidersService } from '../providers-branchs/providers.service';
import { BranchsService } from '../providers-branchs/branchs.service';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.scss']
})
export class MovimentacoesComponent implements OnInit {

  entry = 0;
  orderColumn: string;
  ascendingOrder = true;
  form: FormGroup;
  moviments: Moviment[] = [];
  movimentsTemp: Moviment[] = [];
  products: Product[] = [];
  employees: Employee[] = [];
  providers: Provider[] = [];
  branchs: Branch[] = [];
  currentEmployee: string = "";
  selectedEmployee: Employee;
  currentProduct: string = "";
  selectedProduct: Product;
  public busca = new FormControl('');

  columns = ['mover', 'product', 'quantity', 'cost', 'date'];


  constructor(
    private formBuilder: FormBuilder,
    private movimentsService: MovimentsService,
    private productsService: ProductsService,
    private employeesService: EmployeesService,
    private providersService: ProvidersService,
    private branchsService: BranchsService
  ) { }

  ngOnInit(): void {
    this.listAllMoviments();
    this.listAllProducts();
    this.listAllEmployees();
    this.listAllProviders();
    this.listAllBranchs();
    this.createFormGroup();
    this.collapseMenu();
  }

  listAllProducts() {
    this.productsService.listAllProducts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val()})
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
  listAllProviders() {
    return this.providersService.listAllProviders().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.providers = data;
    });
  }

  listAllBranchs() {
    return this.branchsService.listAllBranchs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.branchs = data;
    });
  }

  listAllMoviments() {
    return this.movimentsService.listAllMoviments().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(movimentsList => {
      this.reactiveFilter(movimentsList);
    });
  }

  isNegative(number) {
    if (number < 0) return 'is-negative';
  }

  deleteMoviment(key) {
    if (confirm("Tem certeza que deseja deletar essa movimentação ?")) {
      this.movimentsService.deleteMoviment(key);
    }
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      quantity: [null],
      input: [0],
      output: [0],
      date: [null],
      cost: [null],
      mover: [null, Validators.required],
      product: [null, Validators.required]
    });
  }

  pushMoviments(moviment) {
    this.movimentsService.pushMoviment(moviment);
  }

  onSubmit(form) {
    const mover = this.getEmployeeByName(form.value.mover);
    const product = this.getProductByName(form.value.product);
    const quantity = this.form.value.input - this.form.value.output;
    const newDate = Date.now();
    this.form.patchValue({
      quantity: quantity,
      date: newDate,
      mover: mover,
      product: product,
      cost: this.getCost(product.value, quantity)
    })
    this.pushMoviments(form.value);
    this.productStockAdjust(form.value);
    this.form.reset({
      input: 0,
      output: 0,
      date: newDate
    });
  }

  onEmployeeChange(employeeName) {
    console.log(employeeName);
    this.selectedEmployee = this.getEmployeeByName(employeeName);
    console.log(this.selectedEmployee);
}

  getEmployeeByName(name: string): Employee {
    return this.employees.find(employee => `${employee.name} ${employee.lastName}` === name);
  }

  onProductChange(productName) {
    this.selectedEmployee = this.getEmployeeByName(productName);
}

  getProductByName(name: string): Product {
    return this.products.find(product => `${product.name}` === name);
  }

  getCost(price, quantity) {
    let cost: number;
    console.log(price, quantity)
    if (price && quantity) {
      cost = price * quantity;
    } else {
      cost = null;
    }
    console.log(cost);
    return cost;
  }

  productStockAdjust(formValue) {
    let formProduct = formValue.product;
    let key = formProduct.key;
    formProduct.stock = formProduct.stock + formValue.quantity;
    this.productsService.updateProduct(key, formProduct);
  }

  reactiveFilter(data) {
    this.movimentsTemp = data;
    this.moviments = data;
    this.entry = this.moviments.length;
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      if (this.busca.value) this.filterArray(filterWord);
      if (!this.busca.value) this.moviments = this.movimentsTemp;
      this.entry = this.moviments.length;
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
    this.orderColumn = param;
    this.moviments.sort((a, b) => this.sort(a, b, param))
    this.ascendingOrder = !this.ascendingOrder;
  }

  sort(a, b, param) {
    let modelA;
    let modelB;

    modelA = a[param];
    modelB = b[param];

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
