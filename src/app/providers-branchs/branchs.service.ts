import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class BranchsService {

  dbPath = '/filiais'

  BranchsList: AngularFireList<Branch> = null;


  constructor(private db: AngularFireDatabase) {
    this.BranchsList = db.list(this.dbPath);
   }

  listAllBranchs(): AngularFireList<Branch> {
    return this.BranchsList;
  }

  getBranch(BranchKey) {
   return this.db.database.ref(this.dbPath).child(BranchKey).once('value').then((snapshot) => {
     snapshot.val();
   })
  }

  pushBranch(branch: Branch) {
    this.db.list(this.dbPath).push(branch).then((result: any) => {
    });
  }

  updateBranch(key: string, value: any): Promise<void> {
    return this.BranchsList.update(key, value);
  }

  deleteBranch(key: string): Promise<void> {
    return this.BranchsList.remove(key);
  }
}
