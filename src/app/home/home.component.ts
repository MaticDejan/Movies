import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor(public afAuth: AngularFireAuth, public authService: AuthService) {

    }

    ngOnInit(): void {

    }

    logout(): void {
        this.afAuth.signOut();
    }
}
