import { Funcionario } from './funcionario.model'
import { Produto } from './produto.model'

export class Movimentacao {
    key?: string
    employee: Funcionario
    product: Produto
    quantity: number
    date: Date
    input: boolean
    output: boolean
}