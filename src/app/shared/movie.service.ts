import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    movieDetailList: AngularFireList<any>;
    movieDoc: AngularFirestoreDocument<any>;

    constructor(private firebase: AngularFireDatabase) {
    }

    getMovieDetailList() {
        this.movieDetailList = this.firebase.list('movieDetails');
    }

    insertMovieDetails(movieDetails) {
        this.movieDetailList.push(movieDetails);
    }

    deleteMovie(movie) {
        console.log(movie.title);
        this.movieDetailList.remove(movie.title);
    }
}
