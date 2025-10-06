import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from '../model/studentModel';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  
    studentForm : FormGroup= new FormGroup({});
  
    studentObj : StudentModel = new StudentModel();
    studentList :StudentModel[]=[];
    constructor(){
      this.createfrom()  
      const olddata=localStorage.getItem("StudentData")
      if(olddata!= null){
        const ParseData= JSON.parse(olddata);
        this.studentForm.controls["stdId"].setValue(ParseData.length+1);
        this.studentList=ParseData;
      }
    }
     createfrom(){
      this.studentForm= new FormGroup({
        stdId: new FormControl(this.studentObj.stdId),
        sname : new FormControl(this.studentObj.sname,[Validators.required, Validators.minLength(3)]),
        semail: new FormControl(this.studentObj.semail,[Validators.required,Validators.email]),
        scontactno: new FormControl(this.studentObj.scontactno,[Validators.required, Validators.pattern('^[0-9]{11}$')]),
        scgpa:new FormControl(this.studentObj.scgpa,[Validators.required,Validators.min(0),Validators.max(4)]),
        saddress: new FormControl(this.studentObj.saddress,[Validators.required,Validators.minLength(5)])
      });
  
     }
     isEditMode: boolean = false;
  
     onSave(){
      if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
      const olddata=localStorage.getItem("StudentData")
      if(olddata!= null){
        const ParseData= JSON.parse(olddata);
        this.studentForm.controls["stdId"].setValue(ParseData.length+1);
        this.studentList.push(this.studentForm.value);
     }
     else{
      this.studentList.push(this.studentForm.value);
     
     }
      localStorage.setItem("StudentData",JSON.stringify(this.studentList))
       this.studentObj=new StudentModel();
      this.createfrom();
    }
    onEdit(item:StudentModel){
      this.isEditMode = true;
      this.studentForm.patchValue(item);
    }
    onUpdate() {
  if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched(); // triggers validation messages
    return;
  }

  const record = this.studentList.find(m => m.stdId == this.studentForm.controls["stdId"].value);
  if (record != undefined) {
    record.saddress = this.studentForm.controls['saddress'].value;
    record.sname = this.studentForm.controls['sname'].value;
    record.semail = this.studentForm.controls['semail'].value;
    record.scontactno = this.studentForm.controls['scontactno'].value;
    record.scgpa = this.studentForm.controls['scgpa'].value;
    localStorage.setItem("StudentData", JSON.stringify(this.studentList))
  }

  this.resetForm();
  this.isEditMode = false;
}
  
    onDelete(id:number){
      const isDelete= confirm("are you sure?");
      if(isDelete){
        const index=this.studentList.findIndex(m=>m.stdId==id);
        this.studentList.splice(index,1);
        localStorage.setItem("StudentData",JSON.stringify(this.studentList));
      }
  
    }

    resetForm(){
      this.studentObj = new StudentModel();
      this.createfrom();
      this.studentForm.controls["stdId"].setValue(this.studentList.length + 1);
    }
  }
  


