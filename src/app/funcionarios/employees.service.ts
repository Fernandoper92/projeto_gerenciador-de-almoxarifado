import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly API = 'http://localhost:3000/employees';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API);
  }

  postEmployee(employee): Observable<Employee> {
    console.log(employee)
    return this.http.post<Employee>(this.API, JSON.stringify(employee), this.httpOptions);
  }

  deleteEmployee(id): Observable<Employee> {
    return this.http.delete<Employee>(this.API + '/' + id, this.httpOptions);
  }
}
