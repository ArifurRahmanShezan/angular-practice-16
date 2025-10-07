import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
 


  userList: any[] = [];
 

  constructor(private httpclient: HttpClient) {}

  ngOnInit(): void {
    this.getuserList();
  }

  public getuserList(): void {
    this.httpclient.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((result: any) => {
        this.userList = result;
      });
  }
}
