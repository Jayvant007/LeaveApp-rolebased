import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHandlerService } from 'src/app/shared/services/httpser.service';

@Component({
  selector: 'app-dialog-apply-leave',
  templateUrl: './dialog-apply-leave.component.html',
  styleUrls: ['./dialog-apply-leave.component.css']
})
export class DialogApplyLeaveComponent implements OnInit,OnDestroy {
  startDate: Date | any;
  endDate: Date | any;
  info: any;
  reason: string | any;
  // leaveArr : any;
  constructor(private httpServ: HttpHandlerService, private snackBar: MatSnackBar) { }
 
  ngOnInit(): void {
    this.info = this.httpServ.getData()[0];

  }

  onSubmit() {
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const startTime = this.startDate.getTime();
      const endTime = this.endDate.getTime();
      const difference = endTime - startTime;
      const days = Math.floor(difference / millisecondsPerDay) + 1;
      
    let startFrom: string = this.startDate.toString().slice(3, 15);
    let endTo: string = this.endDate.toString().slice(3, 15);
    
    let numberOfDays: any = days;
    let postLeaveObj: any = {
      leaveStart: startFrom,
      leaveEnd: endTo,
      leaveDays: numberOfDays,
      leaveReason: this.reason,
      userId: this.info.email,
      approvedleave: this.info.approvedleave ,
      rejectedleave: this.info.rejectedleave,
      statusLeave:"Pending  " ,
      totalLeaves: this.info.totalLeaves,
      depart: this.info.depart,
      fName: this.info.fName,
      lName: this.info.lName
    };

// console.log('postLeaveObj',postLeaveObj)


this.httpServ.getLeaveDataOfStaff(this.info.email).subscribe((param:any)=>{
  // console.log('This is userLeaveData',param);
  for(let leave in param){
    if(param[leave].statusLeave == "Pending  "){
      console.log('')
      // alert('Already applied for leave. Please wait till the status of leave Applied.')
      let message : string = 'Already applied for leave. Please wait till the status of leave Applied.';
      let action : string = 'OK'
      this.snackBar.open(message, action, {
        duration: 5000, // Duration in milliseconds (e.g., 3 seconds)
        horizontalPosition : 'center',
    verticalPosition : 'top'
      });
      return
    }
    
  }
  if(this.info.totalLeaves >= numberOfDays){
    this.httpServ.postLeaveData(postLeaveObj).subscribe((param: any) => {
       this.httpServ.getLeaveDataOfStaff(this.info?.username).subscribe((param: any) => {
        //  console.log('inDialog leave Data', param)
         this.httpServ.dialongStaffrelSubj.next(param)
       })
      //  console.log(param);
     })
 }else{
  console.log('')
  //  alert(`Can not apply leaves more than Balanced Leaves. Your Balanced leaves = ${this.info.totalLeaves}`)
  let message : string = `Can not apply leaves more than Balanced Leaves. Your Balanced leaves = ${this.info.totalLeaves}`;
  let action : string = 'OK'
  this.snackBar.open(message, action, {
    duration: 5000, // Duration in milliseconds (e.g., 3 seconds)
    horizontalPosition : 'center',
    verticalPosition : 'top'
  });
 }
 
  
})




 
  }
  ngOnDestroy(): void {
    this.httpServ.clearData();
  }

}


