import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'mover':
        value = 'Colaborador(a) / Empresa';
        break;
      case 'product':
        value = 'Produto';
        break;
      case 'quantity':
        value = 'Quantidade';
        break;
      case 'cost':
        value = 'Custo';
        break;
      case 'date':
        value = 'Data';
        break;
      case 'name':
        value = 'Nome';
        break;
      case 'code':
        value = 'Código';
        break;
      case 'address':
        value = 'Endereço';
        break;
      case 'phoneNumber':
        value = 'Telefone';
        break;
      case 'position':
        value = 'Função';
        break;
      case 'sector':
        value = 'Setor';
        break;
      case 'group':
        value = 'Grupo';
        break;
      case 'provider':
        value = 'Fornecedor';
        break;
      case 'value':
        value = 'Valor';
        break;
      case 'stock':
        value = 'Estoque';
        break;
      case 'type':
        value = 'Tipo';
        break;
      case 'employee':
        value = 'Colaborador(a)';
        break;
    }
    return value;
  }
}