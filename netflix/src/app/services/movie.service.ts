import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Movies } from '../models/movies';

 const enum endpoint  {
  latest = '/movie/latest',
  now_playing = '/movie/now_playing',
  poplupar = '/movie/popular',
  top_rated = '/movie/top_rated',
  upcoming = '/movie/upcoming',
  trending = '/trending/all/week',
  originals = '/discover/tv'
}


@Injectable({
  providedIn :'root'
})
export class MovieService {

  private URL = 'https://api.themoviedb.org/3';
  private api_key = environment.api;


constructor(private http: HttpClient) { }


  getLatesMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.latest}`, {
      params:{
        api_key: this.api_key
      }
    });
  }
  getNowPlaying(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.now_playing}`, {
      params:{
        api_key: this.api_key
      }
    });
  }
  getOriginals(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.originals}`, {
      params:{
        api_key: this.api_key
      }
    });
  }
  getPopularMovie(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.poplupar}`, {
      params:{
        api_key: this.api_key
      }
    });
  }
  getTopRated(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.top_rated}`, {
      params:{
        api_key: this.api_key
      }
    });
  }
  getTrinding(): Observable<Movies> {
    return this.http.get<Movies>(`${this.URL}${endpoint.trending}`, {
      params:{
        api_key: this.api_key
      }
    });
  }
}
