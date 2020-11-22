import { Mover } from '../interfaces/mover.model';
import { Role } from './role.model';

export class Employee implements Mover {
    id: number;
    name: string;
    type = "employee";
    lastName: string;
    uniformSize: string;
    shoeSize: number;
    gloveSize: number;
    role: Role;
}