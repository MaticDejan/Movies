import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MovieService implements OnInit {
    movieDetailList: AngularFireList<any>;
    movies: Observable<any[]>;

    constructor(private firebase: AngularFireDatabase) {
        this.movieDetailList = firebase.list('movieDetails');
        this.movies = this.movieDetailList.snapshotChanges().pipe(
            map(res => res.map(c => ({ key: c.payload.key, ...c.payload.val()
                }))
            ));
    }

    ngOnInit() {
    }

    getMovies() {
        return this.movies;
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
