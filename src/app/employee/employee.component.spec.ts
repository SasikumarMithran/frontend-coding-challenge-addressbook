import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import { employeeFilter } from './employee.pipe';
import { not } from '@angular/compiler/src/output/output_ast';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let expectedData: any;
  let nativeEl: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeComponent, employeeFilter ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expectedData={
      "EmployeeList":[
        {"firstName":"Sasi",
         "lastName":"Kumar",
         "department":"IT",
         "phoneNumber":"0471234567"
        },
        {"firstName":"Afsal",
         "lastName":"Rahim",
         "department":"Architect",
         "phoneNumber":"0471234567"
        }]
      }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit("should add an object to EmployeeList array on click of Add button", ()=>{
    component.EmployeeList=expectedData['EmployeeList'];
    const currentlength = component.EmployeeList.length;
    component.addEmployee();
    expect(component.EmployeeList.length).toBe(currentlength+1);
  });

  fit("should delete an object to EmployeeList array on click of Add button", ()=>{
    component.EmployeeList=expectedData['EmployeeList'];
    component.addEmployee();
    const currentlength = component.EmployeeList.length;
    fixture.detectChanges()
    nativeEl = fixture.nativeElement
    const deleteButton = nativeEl.querySelectorAll(".delete")[0]
    deleteButton.click();
    expect(component.EmployeeList.length).toBe(currentlength-1);
  });

  fit("should sort the objects in the EmployeeList array alphabetically on click of Add button", ()=>{
    component.EmployeeList=expectedData['EmployeeList'];
    fixture.detectChanges()
    nativeEl = fixture.nativeElement
    const sortButton = nativeEl.querySelectorAll(".sort-img")[0]
    const spy = spyOn(component.EmployeeList, 'sort');
    sortButton.click();
    expect(component.EmployeeList).not.toEqual(spy);
  });

  fit("Filter EmployeeList based on Name and Department", ()=>{
    component.EmployeeList=expectedData['EmployeeList'];
    nativeEl = fixture.nativeElement
    const searchfield = nativeEl.querySelectorAll(".search-input")[0];
    searchfield.value ='Kumar';
    searchfield.dispatchEvent(new Event(".search-input"));
    fixture.detectChanges();
    expect(component.EmployeeList[0].firstName).toBe('Sasi');
  });

});
