import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    isProgressVisible: boolean;
    signupForm: FormGroup;
    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router) {
        this.isProgressVisible = false;
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {

        if (this.authService.userLoggedIn) {
            if((this.signupForm.value.email.toLocaleLowerCase() === "dejan_andrei45@yahoo.com" ) || ( this.signupForm.value.email.toLocaleLowerCase() === "edy.lata2001@gmail.com") )
                this.authService.admin = true; // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)

            this.router.navigate(['movie/list']);
        }

        this.signupForm = new FormGroup({
            'displayName': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required),


        });
    }

    signup() {
        if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
            return;

        this.isProgressVisible = true;
        this.authService.signupUser(this.signupForm.value).then((result) => {
            if((this.signupForm.value.email.toLocaleLowerCase() === "dejan_andrei45@yahoo.com" ) || ( this.signupForm.value.email.toLocaleLowerCase() === "edy.lata2001@gmail.com") )
                this.authService.admin = true;
            else
                this.authService.admin = false;
            this.authService.email = this.signupForm.value.email;
            this.authService.banAccount = false;
            if (result == null)                                 // null is success, false means there was an error
                this.router.navigate(['movie/list']);
            else if (result.isValid == false)
                this.firebaseErrorMessage = result.message;

            this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
        }).catch(() => {
            this.isProgressVisible = false;
        });
    }
}
