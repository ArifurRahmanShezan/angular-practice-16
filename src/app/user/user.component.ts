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
      name: [''],
      mobile: [''],
      email: [''],
      age: ['']
    });

    this.GetAllUsers();
  }

  SubmitForm() {
    this.service.AddUpdateUser(this.userForm.value).subscribe(data => {
      alert('Added');
      this.userForm.reset();
      this.GetAllUsers(); 
    });
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
      alert("get user successfully");
      console.log("user details",data);
      this.userForm.patchValue({
        name:data.name,
        email:data.email,
        mobile:data.mobile,
        age:data.age
      })
    })
  }
}
