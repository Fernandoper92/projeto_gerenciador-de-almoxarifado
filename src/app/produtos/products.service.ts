import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  dbPath = '/produtos'

  ProductsList: AngularFireList<Product> = null;


  constructor(private db: AngularFireDatabase) {
    this.ProductsList = db.list(this.dbPath);
   }

   listAllProducts(): AngularFireList<Product> {
    return this.ProductsList;
  }

  pushProduct(product: Product) {
    this.db.list(this.dbPath).push(product).then((result: any) => {
    });
  }

  updateProduct(key: string, value: any): Promise<void> {
    return this.ProductsList.update(key, value);
  }

  deleteProduct(key: string): Promise<void> {
    return this.ProductsList.remove(key);
  }
}
