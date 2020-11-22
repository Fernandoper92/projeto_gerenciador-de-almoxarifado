import { Moviment } from './../models/moviment.model';;
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

  movimentacoes: Moviment[] = []

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
    this.teste = this.movimentacoes.filter((el: Moviment) => el.mover.name.toLocaleLowerCase().includes(filterWord))
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
    this.teste.sort((a: Moviment, b: Moviment) => this.sort(a, b, param))
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

}
