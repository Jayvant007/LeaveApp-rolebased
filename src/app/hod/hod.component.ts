import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHandlerService } from '../shared/services/httpser.service';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css']
})
export class HodComponent implements OnInit , OnDestroy{
hodDetails:any ;
departLeaveArr : any = [];
hoddepart :any

constructor(private httpServ : HttpHandlerService){}
ngOnInit(): void {
  
  this.hodDetails = this.httpServ.getData()[0];
  console.log(this.hodDetails)
  this.httpServ.getLeaveData().subscribe((param:any)=>{
    for(const user in param){
      if(param[user].depart == this.hodDetails.depart){
        this.departLeaveArr.push(param[user])
      }
    }
  })

  this.httpServ.getUsers().subscribe((param:any)=>{
    let arr : any= []
    for(let user in param){
      if(param[user].depart == this.hodDetails.depart){
        arr.push(param[user])
      }
    }
    this.httpServ.getAllDataOfStuff(arr)
  })
  
  
}

onApprove(lData:any){


this.httpServ.patchLeaveData(lData.id,{statusLeave:'Approved'}).subscribe((param:any)=>{
  for(let data in this.departLeaveArr){
    if(this.departLeaveArr[data].id == lData.id){
      this.departLeaveArr[data].statusLeave='Approved';
    }
  }
})
let totalLeavess = lData.totalLeaves - lData.leaveDays;
let obj1 = {

   approvedleave :lData.leaveDays + lData.approvedleave  ,
   totalLeaves : totalLeavess,
}
this.httpServ.getUsers().subscribe((param:any)=>{
  for(let user in param){
    if(param[user].email == lData.userId){
      this.httpServ.patchUser(param[user].id,obj1).subscribe((para:any)=>{
      })
    }
  }
})
}

onReject(lData:any){
  this.httpServ.patchLeaveData(lData.id,{statusLeave:'Rejected'}).subscribe((param:any)=>{
    for(let data in this.departLeaveArr){
      if(this.departLeaveArr[data].id == lData.id){
        this.departLeaveArr[data].statusLeave='Rejected';
      }
    }
  })
  let obj1 = {
    rejectedleave :  lData.leaveDays + lData.rejectedleave,
    statusLeave : 'Rejected'
 }
 this.httpServ.getUsers().subscribe((param:any)=>{
   for(let user in param){
     if(param[user].email == lData.userId){
       console.log('this is id to patch', param[user].id)
       this.httpServ.patchUser(param[user].id,obj1).subscribe((para:any)=>{
       })
     }
   }
 })





}

ngOnDestroy(): void {
  this.httpServ.clearData();
}
}
