import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Provider } from '../models/Provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  dbPath = '/fornecedores'

  ProvidersList: AngularFireList<Provider> = null;


  constructor(private db: AngularFireDatabase) {
    this.ProvidersList = db.list(this.dbPath);
   }

  listAllProviders(): AngularFireList<Provider> {
    return this.ProvidersList;
  }

  getProvider(providerKey) {
   return this.db.database.ref(this.dbPath).child(providerKey).once('value').then((snapshot) => {
     snapshot.val();
   })
  }

  pushProvider(provider: Provider) {
    this.db.list(this.dbPath).push(provider).then((result: any) => {
    });
  }

  updateProvider(key: string, value: any): Promise<void> {
    return this.ProvidersList.update(key, value);
  }

  deleteProvider(key: string): Promise<void> {
    return this.ProvidersList.remove(key);
  }
}
