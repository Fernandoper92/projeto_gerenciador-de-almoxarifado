import { Mover } from '../interfaces/mover.model';

export class Branch implements Mover{
    public id: number;
    public name: string;
    public type = "branch";
}