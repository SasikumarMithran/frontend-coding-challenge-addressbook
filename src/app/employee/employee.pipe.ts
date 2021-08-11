import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employees';

@Pipe({
  name: 'searchFilter'
})
export class employeeFilter implements PipeTransform {

  transform(Employees: Employee[], searchValue: string): Employee[] {

    if (!Employees || !searchValue) {
      return Employees;
    }

    // return the filtered array
    return Employees.filter(employee => {
      return employee.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        employee.lastName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        employee.department.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    });
   }
}
