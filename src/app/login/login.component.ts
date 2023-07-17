import { Component, ViewChild } from '@angular/core';
import { HttpHandlerService } from '../shared/services/httpser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('userForm') loginFormObj : any;
  useractive: any;
constructor(private httpServ : HttpHandlerService, private router:Router){}
checkUser(){
  let obj1 = {
    userId : this.loginFormObj.value.username,
    userPass : this.loginFormObj.value.password
  }
  this.httpServ.signInCurrentUser(obj1).subscribe((respdata:any)=>{
    this.httpServ.getUsers().subscribe((rawData:any)=>{
      for(let mainuser in rawData){
        if(rawData[mainuser].username == respdata.email){
         this.httpServ.getuserdataofStuff(rawData[mainuser])
         if(rawData[mainuser].regfor == 'staff'){
          this.httpServ.getuserdataofStuff(rawData[mainuser])
          this.router.navigate(['/stuff'])
          return
         }else{
          this.router.navigate(['/hod'])
          this.httpServ.getuserdataofStuff(rawData[mainuser]);
          return
         }
        }
      }
    })    
  })
  this.loginFormObj.reset()
}
}
