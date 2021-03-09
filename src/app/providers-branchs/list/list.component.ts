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

  ordenarColuna: string;
  ordemCrescente = true;
  providers: Provider[];
  providersTemp: Provider[];
  branchs: Branch[];
  branchsTemp: Branch[];
  public busca = new FormControl('');
  
  colunas = ['name', 'code', 'type'];

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
      this.reactiveBranchsFilter(data);
    });
}

deleteBranch(key) {
  this.branchService.deleteBranch(key);
}

reactiveProvidersFilter(data) {
  this.providersTemp = data;
  this.providers = data;
  this.busca.valueChanges.pipe(
    map(value => value.trim()),
    debounceTime(500),
    distinctUntilChanged(),
  ).subscribe((filterWord: string) => {
    if (this.busca.value) this.filterArray(filterWord);
    if (!this.busca.value) this.providers = this.providersTemp;
  })
}

reactiveBranchsFilter(data) {
  this.branchsTemp = data;
  this.branchs = data;
  this.busca.valueChanges.pipe(
    map(value => value.trim()),
    debounceTime(500),
    distinctUntilChanged(),
  ).subscribe((filterWord: string) => {
    if (this.busca.value) this.filterArray(filterWord);
    if (!this.busca.value) this.providers = this.providersTemp;
  })
}

filterArray(filterWord) {
  filterWord = filterWord.toLowerCase()
  this.providers = this.providersTemp.filter((el: Provider) => el.name.toLocaleLowerCase().includes(filterWord))
}

organizar(param: string) {
  this.ordenarColuna = param;
  this.providers.sort((a, b) => this.ordenar(a, b, param))
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
