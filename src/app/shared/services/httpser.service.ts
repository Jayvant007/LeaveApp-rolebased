import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http"
import { BehaviorSubject, Subject, catchError, map, tap, throwError } from "rxjs";
@Injectable({
    providedIn : 'root'
})
export class HttpHandlerService{
    apiUrl : string = "https://leaveapp-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app/user-data.json";
    apiUrlleave : string = "https://leaveapp-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app/user-leaveData.json";
    currrentAuthResp : any = {};
    isLoggedIn () : boolean{
        if(this.currrentAuthResp.idToken){
            return true
        }else{
            return false
        }
    }
    err:boolean = true;
    checkAuthentication() : Promise<boolean> {
        return new Promise((resolve)=>{
            if(this.currrentAuthResp?.idToken){
                resolve(this.isLoggedIn())
            }
        })
    }

    datastaff :any| []=[]

constructor(private http : HttpClient){}
postUser(userObj : any){
    return this.http.post(this.apiUrl,userObj,{
        params : new HttpParams().set('auth',this.currrentAuthResp?.idToken)
    })
}
patchUser(id:any,obj:any){
    return this.http.patch(`https://leaveapp-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app/user-data/${id}.json`,obj)
}
postLeaveData(leaveObj : any){
    return this.http.post(this.apiUrlleave,leaveObj,{
        params : new HttpParams().set('auth',this.currrentAuthResp?.idToken)
    })
}

patchLeaveData(id:any,obj:any){
    return this.http.patch(`https://leaveapp-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app/user-leaveData/${id}.json`,obj)
}



getUsers(){
    let myParams = new HttpParams();
    myParams = myParams.append('auth',this.currrentAuthResp?.idToken)
   return this.http.get
   (this.apiUrl,{
    headers : new HttpHeaders({
        'jwt' : 'ASDF',
    }),
    params : myParams ,
   }
   ).pipe(map((rawData : any)=>{

        
        let arr = [];
        for(let user in rawData){
            arr.push({...rawData[user],id : user})
        }
        return arr
    }),
    catchError((errD : any)=>{
        return throwError(errD.message)
    })
    )
}
getSpecialData(key : any){
    let myParams = new HttpParams();
    // myParams = myParams.append('pa',1);
    // myParams = myParams.append('pb',2);
    myParams = myParams.append('auth',this.currrentAuthResp?.idToken)
    return this.http.get(`https://leaveapp-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app/user-data/${key}.json`,{
        headers : new HttpHeaders({
            'jwt' : 'ASDF',
        }),
        params : myParams 
    }).pipe(
        map((rawData : any)=>{
        //     let arr = [];
        // for(let user in rawData){
        //     arr.push({...rawData[user]})
        // }
        // return arr
        console.log('jayvatn',rawData);
        })
    )
}

getLeaveDataOfStaff(userId1:any){
return this.http.get(this.apiUrlleave).pipe(map((rawData:any)=>{
     
    let arr = [];
    for(let user in rawData){
        if(rawData[user].userId == userId1){
        arr.push({...rawData[user],id : user})

        }
    }
    return arr
}))
}



getLeaveData(){
    let myParams = new HttpParams();
    myParams = myParams.append('auth',this.currrentAuthResp?.idToken)
   return this.http.get
   (this.apiUrlleave,{
    headers : new HttpHeaders({
        'jwt' : 'ASDF',
    }),
    params : myParams ,
   }
   ).pipe(map((rawData : any)=>{

        
        let arr = [];
        for(let user in rawData){
            arr.push({...rawData[user],id : user})
        }
        return arr
    }),
    catchError((errD : any)=>{
        return throwError(errD.message)
    })
    )
}


signUpNewUser(credentials : any){
    let payload = {
        email : credentials.username,
        password : credentials.password,
        returnSecureToken : true
    }
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_guVcaZ0jOegdprqqDYcHECfxXFtxb4E',payload)
}
signInCurrentUser(credentials:any){
    let payload = {
        email : credentials.userId,
        password :credentials.userPass,
        returnSecureToken : true
    }
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_guVcaZ0jOegdprqqDYcHECfxXFtxb4E',payload).pipe(tap((data:any)=>{
        this.currrentAuthResp = data;
    }))
}
getuserdataofStuff(obj:any){
    this.datastaff.push(obj);
}

getData():any|[]{
   if(this.datastaff.length){
    return this.datastaff
   }
}
clearData():any{
    this.datastaff=[];
}

 dialongStaffrelSubj = new Subject();
 hodSub = new Subject()

staffdetails : any | [] = [];

getAllDataOfStuff(obj:any){
    this.staffdetails = obj;
};

getAlldataStuff(){
    if(this.staffdetails.length){
        return this.staffdetails;
    }
}
clearAllStuffData(){
    this.staffdetails = []
}

deleteDataOfuser(userId:any){

return this.http.delete(`https://leaveapp-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app/user-data/${userId}.json`);



}










}


