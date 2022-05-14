import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';



const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'signup', component: SignupComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
                     // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
