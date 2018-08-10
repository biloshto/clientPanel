import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,
    public afAuth:AngularFireAuth
  ) { }

  // what a guard does is, we have some condition and if it returns false that means that we shouldn't be able to access the route, the URL, and if it's true - we should be able to
  // we want to check to see if the user is logged in, if they are not then we want to redirect them and return false, if they are we want to return true, meaning everything is okay and they should be able to visit the route
  // basically if the user is not login they cannot see any other page than the login page
  canActivate(): Observable<boolean>{
    return this.afAuth.authState.map(auth => {
      if(!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }
}