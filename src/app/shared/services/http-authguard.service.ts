import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { HttpHandlerService } from "./httpser.service";
import { Observable } from "rxjs";

@Injectable(
    {
    providedIn : 'root'
}
)
 class HttpAuthGuardService  {

constructor(private httpServ : HttpHandlerService ,private router : Router){}
 canActivate(route : ActivatedRouteSnapshot , state : RouterStateSnapshot) : Promise<any> | Observable <boolean> | boolean {
     if(this.httpServ.isLoggedIn()){
        return true
     }else{
        this.router.navigate(['/log']);
        return false
     }

}
 }
export const isGuard : CanActivateFn = (route : ActivatedRouteSnapshot , state : RouterStateSnapshot) : Promise<any> | Observable <boolean> | boolean =>{
    return inject(HttpAuthGuardService).canActivate(route,state)
}