import { Mover } from '../interfaces/mover.model';

export class Provider implements Mover{
    id: number;
    name: string;
    type = "provider";
}