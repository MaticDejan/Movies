import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {
    isSubmitted: boolean;

    formTemplate = new FormGroup({
        reason: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
    });

    constructor(private storage: AngularFireStorage, private authService: AuthService, private afs: AngularFirestore) {

    }
    ngOnInit(): void {
        this.resetForm();
    }

    resetForm() {
        this.formTemplate.reset();
        this.formTemplate.setValue({
            reason: 'Other',
            description: ''
        });
        this.isSubmitted = false;
    }

    onSubmit(formValue) {
        this.isSubmitted = true;
        if (this.formTemplate.valid) {

            var filePath = `${formValue.reason}/${formValue.description}_${this.authService.name}`;
            const fileRef = this.storage.ref(filePath);

            this.storage.upload(filePath, formValue).snapshotChanges().pipe(
                finalize(() => {
                        this.resetForm();
                })
            ).subscribe();
        }
    }

    get formControls() {
        return this.formTemplate['controls'];
    }
}
