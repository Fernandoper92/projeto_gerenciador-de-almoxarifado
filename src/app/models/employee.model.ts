import { Mover } from '../interfaces/mover.model';
import { Position } from './position.model';

export class Employee implements Mover {
    id: number;
    type = "employee";
    name: string;
    lastName: string;
    uniformSize?: string;
    shoeSize?: number;
    gloveSize?: number;
    role: Position | {};
}