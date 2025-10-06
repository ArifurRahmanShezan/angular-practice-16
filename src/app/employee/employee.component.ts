import { Component } from '@angular/core';
import { EmployeeModel } from '../model/employeeModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employeeForm : FormGroup= new FormGroup({});

  employeeObj : EmployeeModel = new EmployeeModel();
  employeeList :EmployeeModel[]=[];
  constructor(){
    this.createfrom()  
    const olddata=localStorage.getItem("EmpData")
    if(olddata!= null){
      const ParseData= JSON.parse(olddata);
      this.employeeForm.controls["empId"].setValue(ParseData.length+1);
      this.employeeList=ParseData;
    }
  }
   createfrom(){
    this.employeeForm= new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name : new FormControl(this.employeeObj.name,[Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.employeeObj.email,[Validators.required,Validators.email]),
      contactno: new FormControl(this.employeeObj.contactno,[Validators.required, Validators.pattern('^[0-9]{11}$')]),
      address: new FormControl(this.employeeObj.address,[Validators.required,Validators.minLength(5)])
    });

   }
   isEditMode: boolean = false;

   onSave(){
    if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched();
    return;
  }
    const olddata=localStorage.getItem("EmpData")
    if(olddata!= null){
      const ParseData= JSON.parse(olddata);
      this.employeeForm.controls["empId"].setValue(ParseData.length+1);
      this.employeeList.push(this.employeeForm.value);
   }
   else{
    this.employeeList.push(this.employeeForm.value);
   
   }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
     this.employeeObj=new EmployeeModel();
    this.createfrom();
  }
  onEdit(item:EmployeeModel){
    this.isEditMode = true;
    this.employeeForm.patchValue(item);
  }
  onUpdate() {
  
  if (this.employeeForm.invalid) {
    this.employeeForm.markAllAsTouched(); 
    return;
  }

  const record = this.employeeList.find(m => m.empId == this.employeeForm.controls["empId"].value);
  if (record != undefined) {
    record.address = this.employeeForm.controls['address'].value;
    record.name = this.employeeForm.controls['name'].value;
    record.email = this.employeeForm.controls['email'].value;
    record.contactno = this.employeeForm.controls['contactno'].value;
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  }

  this.resetForm();
  this.isEditMode = false;
}

  onDelete(id:number){
    const isDelete= confirm("are you sure?");
    if(isDelete){
      const index=this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    }

  }
  resetForm(){
    this.employeeObj = new EmployeeModel();
    this.createfrom();
    this.employeeForm.controls["empId"].setValue(this.employeeList.length + 1);
  }
}
