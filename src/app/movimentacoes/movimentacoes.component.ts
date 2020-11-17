import { Movimentacao } from './../modelos/movimentacao.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  date = new Date;
  ascendingOrder = true;
  form: FormGroup;
  public busca = new FormControl('');
  teste: {}[] = [];

  colunas = [
    {ref:'employee', name:'Funcionario' },
    {ref:'product', name:'Produto' },
    {ref:'quantity', name:'Quantidade' },
    {ref:'date', name:'Data' }
  ]

  movimentacoes: Movimentacao[] = [
    { employee: 'Lucas', sector: 'produção', product: 'caneta azul', quantity: +11, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Mateus', sector: 'expedição', product: 'lapis', quantity: 1, date: this.date.toLocaleDateString(), output: true, input: false },
    { employee: 'Pedro', sector: 'produção', product: 'luva 7', quantity: 1, date: this.date.toLocaleDateString(), output: true, input: false },
    { employee: 'Alex', sector: 'administração', product: 'luva 8', quantity: 2, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Franciele', sector: 'produção', product: 'botina', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Gisele', sector: 'administração', product: 'chave', quantity: 3, date: this.date.toLocaleDateString(), output: true, input: false },
    { employee: 'Natalia', sector: 'motorista', product: 'fita adesiva', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'joão', sector: 'expedição', product: 'caneta vermelha', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'katia', sector: 'administração', product: 'caneta azul', quantity: 2, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Lizabete', sector: 'produção', product: 'capacete', quantity: 30, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'joão', sector: 'administração', product: 'Fone', quantity: 2, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Pedro', sector: 'produção', product: 'rolo strech', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Leandro', sector: 'controle de qualidade', product: 'papel hig.', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Pedro', sector: 'produção', product: 'luva couro', quantity: 5, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Fernando', sector: 'motorista', product: 'parafuso', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Julio Cesar', sector: 'produção', product: 'capa de chuva', quantity: 1, date: this.date.toLocaleDateString(), output: false, input: true },
    { employee: 'Julio Rodrigues', sector: 'produção', product: 'canetaão azul', quantity: 5, date: this.date.toLocaleDateString(), output: false, input: true },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.teste = this.movimentacoes;
    this.createFormGroup();
    this.reactiveFilter();
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      employee: [null, Validators.required],
      product: [null, Validators.required],
      input: [null],
      output: [null],
      date: [null]
    });
  }

  onSubmit() {
    this.form.patchValue({date: this.date.toLocaleDateString()});

    this.http.post('http://httpbin.org/post', JSON.stringify(this.form.value)).pipe().subscribe(data => {
      console.log(data)
      this.form.reset();
    },
      (error: any) => alert('Erro ao enviar os dados, por favor tente de novo mais tarde!')
    );
  }

  reactiveFilter() {
    this.busca.valueChanges.pipe(
      map(value => value.trim()),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((filterWord: string) => {
      console.log(filterWord)
      if (this.busca.value) this.filterArray(filterWord);
      if (!this.busca.value) this.teste = this.movimentacoes;
    })
  }

  filterArray(filterWord) {
    filterWord = filterWord.toLowerCase()
    this.teste = this.movimentacoes.filter((el: Movimentacao) => el.employee.toLocaleLowerCase().includes(filterWord))
  }

  cssErro(param) {
    if (this.form.get(param).touched) {
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
    this.teste.sort((a: Movimentacao, b: Movimentacao) => this.sort(a, b, param))
    this.ascendingOrder = !this.ascendingOrder;
  }

  sort(a: Movimentacao, b: Movimentacao, param: string) {

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

}
