import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from './models/movies';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy{
  sticky = true;
  subs: Subscription [] = [];
  trending: Movies;
  pupular: Movies;
  topRated: Movies;
  originals: Movies;
  nowPlaying: Movies;



  sliderConfig ={
    slidesToShow: 9,
    slidesToScroll:2,
    arrows: true,
    autoplay:false
  };

  @ViewChild ('stickHeader') header: ElementRef;
  headerBGUrl:string;

  constructor(private movie: MovieService)
  {}

  ngOnInit(): void{
    this.subs.push(this.movie.getTrinding().subscribe(data => {
      this.trending = data;
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original'+ this.trending.results[0].backdrop_path;
    }));
    this.subs.push(this.movie.getPopularMovie().subscribe(data => this.pupular = data));
    this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));
  }

  ngOnDestroy(): void
  {
      this.subs.map(s => s.unsubscribe());
  }
  @HostListener('window:scroll',['$event'])


  handleScrool(){
    const windowScroll  = window.pageYOffset;


    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }



}
