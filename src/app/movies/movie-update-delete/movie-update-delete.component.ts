import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../shared/movie.service';

@Component({
    selector: 'app-movie-update-delete',
    templateUrl: './movie-update-delete.component.html',
    styleUrls: ['./movie-update-delete.component.css']
})
export class MovieUpdateDeleteComponent implements OnInit {

    movieList: any[];
    newMovies: any[];
    editState = false;
    movieToEdit: any;

    constructor(private service: MovieService) {
    }

    ngOnInit(): void {
        this.service.getMovies().subscribe(movies => this.movieList = movies );
    }

    deleteMovie(movie: any) {
        if (confirm('Are you sure you want to delete ' + movie.title + '?')) {
            this.service.deleteMovie(movie);
        }
    }

}
