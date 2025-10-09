import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url="http://localhost:3000/";

  constructor(private http:HttpClient) {

   }
   AddUpdateUser(User: any, type:any): Observable<any> {
    if(type=='Add'){
      return this.http.post(this.url + "users", User);
    }
    else{
      return this.http.put(this.url + "users/"+ User.id,User);
    }
    
    
}
   GetAllUsers(): Observable<any> {
    
    return this.http.get(this.url + "users");
}
DeleteUserByID(ID:any): Observable<any> {
    
    return this.http.delete(this.url+"users/"+ID);
}
GetUserByID(Id:any):Observable<any>{
  return this.http.get(this.url+"users/"+Id);
}


}
