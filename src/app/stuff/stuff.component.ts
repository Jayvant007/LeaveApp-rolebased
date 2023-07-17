import {  AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHandlerService } from '../shared/services/httpser.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogApplyLeaveComponent } from './dialog-apply-leave/dialog-apply-leave.component';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.css']
})
export class StuffComponent implements OnInit,OnDestroy{
stuffdata : any =[];
fromDate: Date |any;
toDate: Date | any;
leaveArr:any= []
constructor(private httpServ : HttpHandlerService,public dialog: MatDialog){
}
onSelection(): void {
  console.log('Start Date:', this.fromDate);
  console.log('End Date:', this.toDate);
}
  ngOnInit(): void {
    this.stuffdata = this.httpServ.getData()[0];
    this.httpServ.getLeaveDataOfStaff(this.stuffdata?.username).subscribe((param:any)=>{
      this.leaveArr=param
    })
    this.httpServ.dialongStaffrelSubj.subscribe((param:any)=>{
      this.leaveArr=param;
    })
  }
  openDialog() {
    this.dialog.open(DialogApplyLeaveComponent,{
    });
  }
  ngOnDestroy(): void {
    this.httpServ.clearData();
  }
}


