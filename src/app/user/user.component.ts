import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];


  constructor(private fb: FormBuilder, private service: CommonService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [null],
      name: [''],
      mobile: [''],
      email: [''],
      age: ['']
    });

    this.GetAllUsers();
  }

  // SubmitForm() {
  //   var type=this.userForm.value.id==null?"Add":"Update";
  //   this.service.AddUpdateUser(this.userForm.value,type).subscribe(data => {
  //     if(type=='Add'){
  //       alert('Added');
  //     }
  //     else{
  //       alert('Updated');
  //     }
      
  //     this.userForm.reset();
  //     this.GetAllUsers(); 
  //   });
  // }
  SubmitForm() {
  const user = this.userForm.value;

  if(user.id) {
    this.service.AddUpdateUser(user, 'Update').subscribe(() => {
      alert('Updated');
      this.userForm.reset();
      this.GetAllUsers();
    });
  } else {
    delete user.id; 
    this.service.AddUpdateUser(user, 'Add').subscribe(() => {
      alert('Added');
      this.userForm.reset();
      this.GetAllUsers();
    });
  }
}

  GetAllUsers() {
    this.service.GetAllUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
   DeleteUserByID(ID:any) {
    this.service.DeleteUserByID(ID).subscribe(() => {
      alert("USer deleted");
      this.GetAllUsers(); 
    });
  }
  GetUserById(Id:any){
  this.service.GetUserByID(Id).subscribe(data=>{
    this.userForm.patchValue({
      id: data.id,     
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      age: data.age
    });
  })
}
}
