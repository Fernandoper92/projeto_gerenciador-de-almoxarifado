import { Component, OnInit } from '@angular/core';

import { Funcionario } from 'src/app/modelos/funcionario.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  ordemCrescente = true;

  colunas = ['Nome', 'ID', 'Cargo', 'Setor'];

  funcionarios: Funcionario[] = [
    { id: 1, nome: 'Fernando', sobrenome: 'Pereira', setor: 'Almoxarifado', cargo: 'Auxiliar de Almoxarifado' },
    { id: 2, nome: 'João', sobrenome: 'Manjoli', setor: 'Expedição', cargo: 'Gerente de Expedição' },
    { id: 3, nome: 'Eduardo', sobrenome: 'Vilarinho', setor: 'Expedição', cargo: 'Auxiliar de Expedição' },
    { id: 4, nome: 'Ivonete', sobrenome: 'Teresinha', setor: 'Recursos Humanos', cargo: 'Gerente de RH' },
    { id: 5, nome: 'Jonas', sobrenome: 'Pavi', setor: 'Comercial', cargo: 'Gerente Comercial' },
    { id: 6, nome: 'Julio', sobrenome: 'da Silva', setor: 'Produção', cargo: 'Gerente de Produção' },
    { id: 7, nome: 'Maria', sobrenome: 'do Bairro', setor: 'Produção', cargo: 'Auxiliar de Produção' },
    { id: 8, nome: 'Raquel', sobrenome: 'Bagatini', setor: 'Vendas', cargo: 'Auxiliar de Vendas' },
    { id: 9, nome: 'Leticia', sobrenome: 'Melo', setor: 'Vendas', cargo: 'Gerente de Vendas' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  organizar(parametro:string) {
    this.funcionarios.sort((a,b) => this.ordenar(a,b,parametro))
    this.ordemCrescente = !this.ordemCrescente;
  }

  ordenar(a, b, parametro) {

    parametro = parametro.toLowerCase();

    let modeloA = a[`${parametro}`];
    let modeloB = b[`${parametro}`];

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
