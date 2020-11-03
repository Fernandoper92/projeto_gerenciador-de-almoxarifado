import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  date = new Date;
  today = `${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
  ascendingOrder = true;
  form: FormGroup;

  colunas = ['Funcionario', 'Produto', 'Quantidade', 'Data'];

  movimentacoes = [
    { employee: 'Lucas', sector: 'produção', product: 'caneta azul', quantity: +11, date: this.today, output: false, input: true },
    { employee: 'Mateus', sector: 'expedição', product: 'lapis', quantity: 1, date: this.today, output: true, input: false },
    { employee: 'Pedro', sector: 'produção', product: 'luva 7', quantity: 1, date: this.today, output: true, input: false },
    { employee: 'Alex', sector: 'administração', product: 'luva 8', quantity: 2, date: this.today, output: false, input: true },
    { employee: 'Franciele', sector: 'produção', product: 'botina', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'Gisele', sector: 'administração', product: 'chave', quantity: 3, date: this.today, output: true, input: false },
    { employee: 'Natalia', sector: 'motorista', product: 'fita adesiva', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'joão', sector: 'expedição', product: 'caneta vermelha', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'katia', sector: 'administração', product: 'caneta azul', quantity: 2, date: this.today, output: false, input: true },
    { employee: 'Lizabete', sector: 'produção', product: 'capacete', quantity: 30, date: this.today, output: false, input: true },
    { employee: 'joão', sector: 'administração', product: 'Fone', quantity: 2, date: this.today, output: false, input: true },
    { employee: 'Pedro', sector: 'produção', product: 'rolo strech', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'Leandro', sector: 'controle de qualidade', product: 'papel hig.', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'Pedro', sector: 'produção', product: 'luva couro', quantity: 5, date: this.today, output: false, input: true },
    { employee: 'Fernando', sector: 'motorista', product: 'parafuso', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'Julio Cesar', sector: 'produção', product: 'capa de chuva', quantity: 1, date: this.today, output: false, input: true },
    { employee: 'Julio Rodrigues', sector: 'produção', product: 'canetaão azul', quantity: 5, date: this.today, output: false, input: true },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.createFormGroup();
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
    this.form.patchValue({date: this.today.toString()});

    this.http.post('http://httpbin.org/post', JSON.stringify(this.form.value)).pipe().subscribe(date => {
      console.log(date)
      this.form.reset();
    },
      (error: any) => alert('Erro ao enviar os dados, por favor tente de novo mais tarde!')
    );
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
    this.movimentacoes.sort((a, b) => this.sort(a, b, param))
    this.ascendingOrder = !this.ascendingOrder;
  }

  sort(a, b, param) {

    param = param.toLowerCase();

    let modelA = a[`${param}`];
    let modelB = b[`${param}`];

    if (typeof modelA === 'string' && typeof modelB === 'string') {
      console.log('works')
      modelA = modelA.toUpperCase();
      modelB = modelB.toUpperCase();
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
