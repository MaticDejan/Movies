import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movies/movie/movie.component';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'home', component: HomeComponent },
    {path: 'movie', component: MoviesComponent, children: [
            {path: 'upload', component: MovieComponent},
            {path: 'list', component: MovieListComponent}
        ]},
    {path: 'movie/:title', component: MovieDetailsComponent},
    { path: '**', component: HomeComponent }
    // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
