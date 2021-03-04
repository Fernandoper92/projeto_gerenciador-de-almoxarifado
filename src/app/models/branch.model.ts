import { Mover } from '../interfaces/mover.model';

export class Branch implements Mover{
    id: number;
    code?: number;
    name: string;
    type = "branch";
}