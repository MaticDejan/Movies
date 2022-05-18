import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    movieDetailList: AngularFireList<any>;

    constructor(private firebase: AngularFireDatabase) {
    }

    getMovieDetailList() {
        this.movieDetailList = this.firebase.list('movieDetails');
    }

    insertMovieDetails(movieDetails) {
        this.movieDetailList.push(movieDetails);
    }
}
