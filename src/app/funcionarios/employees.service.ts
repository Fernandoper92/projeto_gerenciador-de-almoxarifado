import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  dbPath = '/funcionários'

  EmployeesList: AngularFireList<Employee> = null;


  constructor(private db: AngularFireDatabase) {
    this.EmployeesList = db.list(this.dbPath);
   }

  listAllEmployees(): AngularFireList<Employee> {
    return this.EmployeesList;
  }

  pushEmployee(emplyee: Employee) {
    this.db.list(this.dbPath).push(emplyee).then((result: any) => {
    });
  }

  updateEmployee(key: string, value: any): Promise<void> {
    return this.EmployeesList.update(key, value);
  }

  deleteEmployee2(key: string): Promise<void> {
    return this.EmployeesList.remove(key);
  }
}
