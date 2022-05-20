import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../shared/movie.service';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

    movieList: any[];
    rowIndexArray: any[];
    filteredMovies: any[];
    categoryNames: string[] = [];

    constructor(private service: MovieService, public categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.service.getMovies().subscribe(movies => {
            this.movieList = movies;
            this.filteredMovies = movies;
            this.categoryNames = this.categoryService.getCategories(this.movieList).map(cat => cat.name);
            this.rowIndexArray = Array.from(Array(Math.ceil((this.movieList.length + 1) / 3)).keys());
        });
    }

    filterEvents(selectedFilter: string) {
        this.filteredMovies = this.movieList.filter(movie => movie.category === selectedFilter || selectedFilter === '');
    }
}
