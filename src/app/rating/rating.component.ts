import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MovieService} from "../services/movie.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
    movies: any[];
    isSubmitted: boolean;
    @Input() movieTitle = '';
    formTemplate = new FormGroup({
        rating: new FormControl(1, Validators.required),
        comment: new FormControl('', Validators.required),
        title: new FormControl(this.movieTitle)
    });

    constructor(private storage: AngularFireStorage, public authService: AuthService, public service: MovieService) {
    }

    ngOnInit(): void {
        this.movies = this.service.getRating(this.movieTitle);
        this.resetForm();
    }

    resetForm() {
        this.formTemplate.reset();
        this.formTemplate.setValue({
            rating: 1,
            comment: '',
            title: this.movieTitle,
        });
        this.isSubmitted = false;
    }

    onSubmit(formValue) {
        this.isSubmitted = true;
        if (this.formTemplate.valid) {
            var directory = `Rating`;
            var filePath = `${directory}/${formValue.rating}/${formValue.comment}_${new Date().getTime()}`;
            this.storage.upload(filePath, formValue).snapshotChanges().pipe(
                finalize(() => {
                    this.service.insertRating(formValue);
                    this.resetForm();
                })
            ).subscribe();
        }
    }

    get formControls() {
        return this.formTemplate['controls'];
    }
}
