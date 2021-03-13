import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Provider } from './../../models/Provider.model';
import { ProvidersService } from '../providers.service';
import { Branch } from 'src/app/models/branch.model';
import { BranchsService } from '../branchs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  providersEntry = 0;
  branchsEntry = 0;
  tableSelector = 'providers';
  ordenarColuna: string;
  ordemCrescente = true;
  providers: Provider[];
  providersTemp: Provider[];
  branchs: Branch[];
  branchsTemp: Branch[];
  public busca = new FormControl('');

  colunas = ['name', 'code', 'address', 'phoneNumber', 'type'];

  constructor(
    private ProvidersService: ProvidersService,
    private branchService: BranchsService
  ) { }

  ngOnInit(): void {
    this.listAllProviders();
    this.listAllBranchs();
  }

  listAllProviders() {
    this.ProvidersService.listAllProviders().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.reactiveProvidersFilter(data);
    });
  }

  deleteProvider(key) {
    this.ProvidersService.deleteProvider(key);
  }

  listAllBranchs() {
    this.branchService.listAllBranchs().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.reactiveBranchsFilter(data, 'branch');
    });
  }

  deleteBranch(key) {
    this.branchService.deleteBranch(key);
  }

  setSelector(string) {
    this.tableSelector = string;
  }

  reactiveProvidersFilter(data) {
    this.providersTemp = data;
    this.providers = data;
    this.providersEntry = this.providers.length;
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      if (this.busca.value) this.filterProvidersArray(filterWord);
      if (!this.busca.value) this.providers = this.providersTemp;
      this.providersEntry = this.providers.length;
    })
  }

  reactiveBranchsFilter(data, string: String) {
    this.branchsTemp = data;
    this.branchs = data;
    this.branchsEntry = this.branchs.length;
    console.log()
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      if (this.busca.value) this.filterBranchsArray(filterWord);
      if (!this.busca.value) this.branchs = this.branchsTemp;
      this.branchsEntry = this.branchs.length;
    })
  }

  filterProvidersArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.providers = this.providersTemp.filter((el: Provider) => el.name.toLocaleLowerCase().includes(filterWord))
  }

  filterBranchsArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.branchs = this.branchsTemp.filter((el: Provider) => el.name.toLocaleLowerCase().includes(filterWord))
  }

  organizar(param: string) {
    this.ordenarColuna = param;
    this.providers.sort((a, b) => this.ordenar(a, b, param));
    this.branchs.sort((a, b) => this.ordenar(a, b, param));
    this.ordemCrescente = !this.ordemCrescente;
  }

  ordenar(a, b, param) {
    let modelA;
    let modelB;


    modelA = a[param];
    modelB = b[param];

    if (this.ordemCrescente) return this.ordenarCrescente(modelA, modelB);
    return this.ordernarDecrescente(modelA, modelB);
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
