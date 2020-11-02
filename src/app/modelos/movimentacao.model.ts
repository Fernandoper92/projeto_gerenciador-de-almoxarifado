import { Funcionario } from './funcionario.model'
import { Produto } from './produto.model'

export class Movimentacao {
    key?: string
    funcionario: Funcionario
    produto: Produto
    quantidade: number
    data: Date
    Tipo: boolean
}