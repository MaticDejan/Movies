import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MovieService} from "../services/movie.service";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter();
  movies: any[];
  title: string;
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }
  searchMovie(  ){
    this.movies.forEach(m => {
      if (m.title === this.title){
        this.search.emit(m.title);
      }
    });
  }


}
