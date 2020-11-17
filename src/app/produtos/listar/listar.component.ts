import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Produto } from 'src/app/modelos/produto.model';
import { EditarComponent } from '../editar/editar.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  ordemCrescente = true;
  // @ViewChild('modal', { static: true }) modal: EditarComponent;
  public busca = new FormControl('');
  teste: {}[] = [];

  colunas = ['Nome', 'Cod.Estruturado', 'cod.Alternativo', 'estoque'];

  produtos: Produto[] = [
    { nome: 'Tela 20x202', codigoEstruturado: 300000001001, codigoAlternativo: 991001, estoque: 5, grupo: 'Mecanica/Elétrica' },
    { nome: 'Tela 40*250', codigoEstruturado: 300000001002, codigoAlternativo: 991002, estoque: 2, grupo: 'Mecanica/Elétrica' },
    { nome: 'Luva 7', codigoEstruturado: 300000002001, codigoAlternativo: 992001, estoque: 10, grupo: 'EPI' },
    { nome: 'Luva lisa 8', codigoEstruturado: 300000002002, codigoAlternativo: 992002, estoque: 7, grupo: 'EPI' },
    { nome: 'Caneta azul', codigoEstruturado: 300000003001, codigoAlternativo: 993001, estoque: 23, grupo: 'Escritório' },
    { nome: 'Estilete', codigoEstruturado: 300000003002, codigoAlternativo: 993002, estoque: 16, grupo: 'Escritório' },
    { nome: 'Papel Higiênico', codigoEstruturado: 300000004001, codigoAlternativo: 994001, estoque: 22, grupo: 'Outros' },
    { nome: 'Desengripante', codigoEstruturado: 300000005001, codigoAlternativo: 995001, estoque: 531, grupo: 'Líquido' },
  ]

  constructor() { }

  ngOnInit(): void {
    this.teste = this.produtos;
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
      if (!this.busca.value) this.teste = this.produtos;
    })
  }

  filterArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.teste = this.produtos.filter((el: Produto) => el.nome.toLocaleLowerCase().includes(filterWord))
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
