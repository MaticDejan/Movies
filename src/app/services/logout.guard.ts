import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

    constructor(private router: Router, private afAuth: AngularFireAuth, private authService: AuthService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise((resolve, reject) => {
            if(this.authService.userLoggedIn === false){
                resolve(true);
            }
            else {

                this.router.navigate(['/movie/list']);
                resolve(false);

            }
            /*this.afAuth.onAuthStateChanged((user) => {
                if (user) {

                    // if (!user.emailVerified)                            // if the user hasn't verified their email, send them to that page
                    //     this.router.navigate(['/verify-email']);

                    resolve(true);
                } else {
                    console.log('Auth Guard: user is not logged in');
                    this.router.navigate(['/home']);                   // a logged out user will always be sent to home
                    resolve(false);
                }
            }); */
        });
    }

}
