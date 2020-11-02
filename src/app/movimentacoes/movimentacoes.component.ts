import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  data = new Date;
  today = `${this.data.getDay()}/${this.data.getMonth()}/${this.data.getFullYear()}`;
  ascendingOrder = true;
  form: FormGroup;

  colunas = ['Funcionario', 'Produto', 'Quantidade', 'Data'];

  movimentacoes = [
    { funcionario: 'Lucas', setor: 'produção', produto: 'caneta azul', quantidade: +11, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Mateus', setor: 'expedição', produto: 'lapis', quantidade: 1, data: this.today, saida: true, Entrada: false },
    { funcionario: 'Pedro', setor: 'produção', produto: 'luva 7', quantidade: 1, data: this.today, saida: true, Entrada: false },
    { funcionario: 'Alex', setor: 'administração', produto: 'luva 8', quantidade: 2, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Franciele', setor: 'produção', produto: 'botina', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Gisele', setor: 'administração', produto: 'chave', quantidade: 3, data: this.today, saida: true, Entrada: false },
    { funcionario: 'Natalia', setor: 'motorista', produto: 'fita adesiva', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'joão', setor: 'expedição', produto: 'caneta vermelha', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'katia', setor: 'administração', produto: 'caneta azul', quantidade: 2, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Lizabete', setor: 'produção', produto: 'capacete', quantidade: 30, data: this.today, saida: false, Entrada: true },
    { funcionario: 'joão', setor: 'administração', produto: 'Fone', quantidade: 2, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Pedro', setor: 'produção', produto: 'rolo strech', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Leandro', setor: 'controle de qualidade', produto: 'papel hig.', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Pedro', setor: 'produção', produto: 'luva couro', quantidade: 5, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Fernando', setor: 'motorista', produto: 'parafuso', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Julio Cesar', setor: 'produção', produto: 'capa de chuva', quantidade: 1, data: this.today, saida: false, Entrada: true },
    { funcionario: 'Julio Rodrigues', setor: 'produção', produto: 'canetaão azul', quantidade: 5, data: this.today, saida: false, Entrada: true },
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

    this.http.post('http://httpbin.org/post', JSON.stringify(this.form.value)).pipe().subscribe(data => {
      console.log(data)
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
