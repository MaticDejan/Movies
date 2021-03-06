import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {MovieService} from '../services/movie.service';

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

    constructor(private storage: AngularFireStorage, private authService: AuthService, private service: MovieService) {

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
            var directory = `Feedback`;
            var filePath = `${directory}/${formValue.reason}/${formValue.description}_${new Date().getTime()}`;
            this.storage.upload(filePath, formValue).snapshotChanges().pipe(
                finalize(() => {
                    this.service.insertFeedback(formValue);
                    this.resetForm();
                })
            ).subscribe();
        }
    }

    get formControls() {
        return this.formTemplate['controls'];
    }
}
