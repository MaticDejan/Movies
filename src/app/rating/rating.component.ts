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
        rating: new FormControl(0, Validators.required),
        comment: new FormControl('', Validators.required),
        title: new FormControl(this.movieTitle)
    });

    constructor(private storage: AngularFireStorage, private authService: AuthService, private service: MovieService) {

    }

    ngOnInit(): void {
        this.movies = this.service.getRating(this.movieTitle);
        console.log(this.movies);
        this.resetForm();
    }

    resetForm() {
        this.formTemplate.reset();
        this.formTemplate.setValue({
            rating: 0,
            comment: '',
            title: this.movieTitle
        });
        this.isSubmitted = false;
    }

    onSubmit(formValue) {
        this.isSubmitted = true;
        if (this.formTemplate.valid) {

            var filePath = `${formValue.rating}/${formValue.comment}_${this.authService.email}`;

            this.storage.upload(filePath, formValue).snapshotChanges().pipe(
                finalize(() => {
                    this.service.insertRating(formValue);
                    this.resetForm();
                    window.location.reload();
                })
            ).subscribe();
        }
    }

    get formControls() {
        return this.formTemplate['controls'];
    }
}
