import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class MovieService implements OnInit {
    movieDetailList: AngularFireList<any>;
    feedbackList: AngularFireList<any>;
    feedbacks: Observable<any[]>;
    movies: Observable<any[]>;
    ratingList: AngularFireList<any>;
    ratings: Observable<any[]>;


    constructor(private firebase: AngularFireDatabase, private authService: AuthService) {
        this.movieDetailList = firebase.list('movieDetails');
        this.movies = this.movieDetailList.snapshotChanges().pipe(
            map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()
                }))
            ));
        this.feedbackList = firebase.list('feedbackList');
        this.feedbacks = this.feedbackList.snapshotChanges().pipe(
            map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()
                }))
            ));
        this.ratingList = firebase.list('ratingList');
        this.ratings = this.ratingList.snapshotChanges().pipe(
            map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()
            }))
        ));
    }

    ngOnInit() {
    }

    getMovies() {
        return this.movies;
    }



    getFeedback() {
        return this.feedbacks;
    }

    deleteFeedback(feedback) {
        this.firebase.object('/feedbackList/' + feedback.key).remove();
    }

    insertFeedback(feedback) {
        this.feedbackList.push(feedback);
    }

    insertRating(rating) {
        this.ratingList.push(rating);
    }

    getRating(title) {
         let filterRating = [];
        this.ratings.subscribe(r => {
            r.forEach(k => {

                console.log(title);
               if ( k.title === title){
                   filterRating.push(k);
               }
            })
        })

        return filterRating;
    }

    deleteRating(rat) {
        this.firebase.object('/ratingList/' + rat.key).remove();
    }

    insertMovieDetails(movieDetails) {
        this.movieDetailList.push(movieDetails);
    }

    deleteMovie(movie) {
        this.firebase.object('/movieDetails/' + movie.key).remove();
    }

    updateMovie(movie, formValue) {
        this.firebase.object('/movieDetails/' + movie.key)
            .set({
                title: formValue.title,
                category: formValue.category,
                description: formValue.description,
                duration: formValue.duration,
                imageUrl: formValue.imageUrl,
                trailerUrl: formValue.trailerUrl,
        })
    }
}
