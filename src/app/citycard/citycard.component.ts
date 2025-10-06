import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityModel } from '../model/cityModel';

@Component({
  selector: 'app-citycard',
  templateUrl: './citycard.component.html',
  styleUrls: ['./citycard.component.css']
})
export class CitycardComponent {

    cityForm : FormGroup= new FormGroup({});
  
    cityObj : CityModel = new CityModel();
    cityList :CityModel[]=[];
    constructor(){
      this.createfrom()  
      const olddata=localStorage.getItem("CityData")
      if(olddata!= null){
        const ParseData= JSON.parse(olddata);
        this.cityForm.controls["cityId"].setValue(ParseData.length+1);
        this.cityList=ParseData;
      }
    }
     createfrom(){
      this.cityForm= new FormGroup({
        cityId: new FormControl(this.cityObj.cityId),
        cname : new FormControl(this.cityObj.cname,[Validators.required, Validators.minLength(3)]),
        carea: new FormControl(this.cityObj.carea,[Validators.required]),
        cpopulation: new FormControl(this.cityObj.cpopulation,[Validators.required]),
        caddress: new FormControl(this.cityObj.caddress,[Validators.required,Validators.minLength(5)])
      });
  
     }
     isEditMode: boolean = false;
  
     onSave(){
      if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }
      const olddata=localStorage.getItem("CityData")
      if(olddata!= null){
        const ParseData= JSON.parse(olddata);
        this.cityForm.controls["cityId"].setValue(ParseData.length+1);
        this.cityList.push(this.cityForm.value);
     }
     else{
      this.cityList.push(this.cityForm.value);
     
     }
      localStorage.setItem("CityData",JSON.stringify(this.cityList))
       this.cityObj=new CityModel();
      this.createfrom();
    }

    onEdit(item:CityModel){
      this.isEditMode = true;
      this.cityForm.patchValue(item);
    }
    onUpdate() {
    
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched(); 
      return;
    }
  
    const record = this.cityList.find(m => m.cityId == this.cityForm.controls["cityId"].value);
    if (record != undefined) {
      record.caddress = this.cityForm.controls['caddress'].value;
      record.cname = this.cityForm.controls['cname'].value;
      record.carea = this.cityForm.controls['carea'].value;
      record.cpopulation = this.cityForm.controls['cpopulation'].value;
      localStorage.setItem("CityData", JSON.stringify(this.cityList));
    }
  
    this.resetForm();
    this.isEditMode = false;
  }
  
    onDelete(id:number){
      const isDelete= confirm("are you sure?");
      if(isDelete){
        const index=this.cityList.findIndex(m=>m.cityId==id);
        this.cityList.splice(index,1);
        localStorage.setItem("CityData",JSON.stringify(this.cityList));
      }
  
    }
    resetForm(){
      this.cityObj = new CityModel();
      this.createfrom();
      this.cityForm.controls["cityId"].setValue(this.cityList.length + 1);
    }
  }
