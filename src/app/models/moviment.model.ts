import { Mover } from '../interfaces/mover.model';
import { Product } from './product.model';

export class Moviment {
    id: string;
    quantity: number;
    input: boolean;
    output: boolean;
    date: string;
    mover: Mover;
    product: Product;
}