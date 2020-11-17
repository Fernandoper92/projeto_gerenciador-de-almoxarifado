import { Funcionario } from './funcionario.model'
import { Produto } from './produto.model'

export class Movimentacao {
    key?: string
    employee: string
    sector: string
    product: string
    quantity: number
    date: string
    input: boolean
    output: boolean
}