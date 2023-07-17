import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHandlerService } from '../shared/services/httpser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @ViewChild('registerForm') regFromObj : any;
  constructor(private httpServ : HttpHandlerService, private router : Router){}
  ngOnInit(): void {
    // this.onregister()
  }
onregister(){
  let obj1 = {
    username : this.regFromObj.value.username,
    password : this.regFromObj.value.password
  }
  let obj:any;
  obj=this.regFromObj.value
  obj.assignedLeaves = 10;
  obj.totalLeaves=10;
  obj.approvedleave = 0;
  obj.rejectedleave=0;
  obj.appliedLeaveData=[];
  obj.statusLeave='Pending  '
  // console.log(obj)
  
  this.httpServ.signUpNewUser(obj1).subscribe((rawdata:any)=>{
    this.httpServ.postUser(obj).subscribe((data:any)=>{
    });
  })
  this.regFromObj.reset()
  this.router.navigate(['/log'])
}
}
