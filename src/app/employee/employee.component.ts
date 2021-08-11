import { Component, OnInit } from '@angular/core';
import { Employee } from './employees';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  searchValue: string;
  EmployeeList : Employee[] = [];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeList();
  }

  employeeList() {
    this.employeeService.getEmployeelist().subscribe((response) => {
      this.EmployeeList = response['EmployeeList'];
  });  }

  addEmployee() {
    let employee = {"firstName":"","lastName":"","department":"","phoneNumber":""}
    this.EmployeeList.push(employee);
  }

  deleteEmployee(index) {
    this.EmployeeList.splice(index,1);
  }

  sort(key) {
    var array = this.EmployeeList;
    array.sort((a,b) => a.lastName.localeCompare(b.lastName));
  }

}
