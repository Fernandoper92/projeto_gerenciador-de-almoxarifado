import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Moviment } from '../models/moviment.model';

@Injectable({
  providedIn: 'root'
})
export class MovimentsService {

  dbPath = '/movimentações'

  movimentsList: AngularFireList<Moviment> = null;

  constructor(private movimentDb: AngularFireDatabase) {
    this.movimentsList = movimentDb.list(this.dbPath);
   }

   listAllMoviments(): AngularFireList<Moviment> {
     return this.movimentsList;
   }

   pushMoviment(moviment: Moviment) {
     this.movimentDb.list(this.dbPath).push(moviment).then((result: any) => {
     });
   }

   updateMoviment(key: string, value: any): Promise<void> {
     return this.movimentsList.update(key, value);
   }

   deleteMoviment(key: string): Promise<void> {
     return this.movimentsList.remove(key);
   }
}
