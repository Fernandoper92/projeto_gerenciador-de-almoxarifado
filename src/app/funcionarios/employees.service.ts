import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  dbPath = '/funcionários'

  employeesList: AngularFireList<Employee> = null;


  constructor(private db: AngularFireDatabase) {
    this.employeesList = db.list(this.dbPath);
   }

  listAllEmployees(): AngularFireList<Employee> {
    return this.employeesList;
  }

  getEmployee(employeeKey) {
   return this.db.database.ref(this.dbPath).child(employeeKey).once('value').then((snapshot) => {
     snapshot.val();
   })
  }

  pushEmployee(emplyee: Employee) {
    this.db.list(this.dbPath).push(emplyee).then((result: any) => {
    });
  }

  updateEmployee(key: string, value: any): Promise<void> {
    return this.employeesList.update(key, value);
  }

  deleteEmployee(key: string): Promise<void> {
    return this.employeesList.remove(key);
  }
}
