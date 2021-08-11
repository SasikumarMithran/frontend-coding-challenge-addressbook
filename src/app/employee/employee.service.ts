import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeelist() {
    return this.http.get('/assets/db.json');
  }

}
