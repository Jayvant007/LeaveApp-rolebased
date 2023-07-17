import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpHandlerService } from 'src/app/shared/services/httpser.service';

@Component({
  selector: 'app-stuff-details',
  templateUrl: './stuff-details.component.html',
  styleUrls: ['./stuff-details.component.css']
})
export class StuffDetailsComponent implements OnInit,OnDestroy {
  hodDetailsArr : any;
constructor(private httpServe : HttpHandlerService){}
  ngOnInit(): void {
    this.hodDetailsArr = this.httpServe.getAlldataStuff()
  }
  onRemove(user:any){
    let obj : any = {};
    obj = user;
    this.httpServe.deleteDataOfuser(user.id).subscribe((param:any)=>{
      for(let user in this.hodDetailsArr){
        if(this.hodDetailsArr[user].username == obj.email){
            this.hodDetailsArr.splice(user,1)
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.httpServe.clearAllStuffData()
  }
}
