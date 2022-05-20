import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './home/home.component';
import {MoviesComponent} from './movies/movies.component';
import {MovieComponent} from './movies/movie/movie.component';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {MovieUpdateDeleteComponent} from './movies/movie-update-delete/movie-update-delete.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {FeedbackComponent} from './feedback/feedback.component';

const routes: Routes = [
    { path: '', redirectTo: 'movie/list', pathMatch: 'full' },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent },
    {path: 'movie', component: MoviesComponent, canActivate: [AuthGuard], children: [
            {path: 'upload', component: MovieComponent, canActivate: [AuthGuard]},
            {path: 'list', component: MovieListComponent, canActivate: [AuthGuard]},
            {path: 'updateOrDelete', component: MovieUpdateDeleteComponent, canActivate: [AuthGuard]}
        ]},
    {path: 'movie/:title', component: MovieDetailsComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
    {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
    { path: '**', component: HomeComponent }
    // catch-all in case no other path matched
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
