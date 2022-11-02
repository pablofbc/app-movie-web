import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { homeDTO, movieCreationDTO, movieDTO, MoviePostGetDTO, MoviePutGetDTO } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _http: HttpClient) { }
  private apiURL = environment.apiURL + '/movies';

  public getHomePageMovies(): Observable<homeDTO> {
    var apiURL = environment.apiURL + '/movies/selectMovies';
    return this._http.get<homeDTO>(apiURL);
  }

  public putGet(id: number): Observable<MoviePutGetDTO> {
    return this._http.get<MoviePutGetDTO>(`${this.apiURL}/putget/${id}`);
  }

  public edit(id: number, movieCreationDTO: movieCreationDTO) {
    var apiURL = environment.apiURL + '/movies/updateMovie';
    const formData = this.BuildFormData(movieCreationDTO);
    return this._http.put(`${apiURL}/${id}`, formData);
  }

  public getById(id: number): Observable<movieDTO> {
    var apiURL = environment.apiURL + '/movies/selectMovie';
    return this._http.get<movieDTO>(`${apiURL}/${id}`);
  }

  public filter(values: any): Observable<any> {
    const params = new HttpParams({ fromObject: values });
    return this._http.get<movieDTO[]>(`${this.apiURL}/filter`, { params, observe: 'response' });
  }

  public postGet(): Observable<MoviePostGetDTO> {
    return this._http.get<MoviePostGetDTO>(`${this.apiURL}/postget`);
  }

  public create(movieCreationDTO: movieCreationDTO): Observable<number> {
    var apiURL = environment.apiURL + '/movies/saveMovie';
    const formData = this.BuildFormData(movieCreationDTO);
    return this._http.post<number>(apiURL, formData);
  }

  public delete(id: number) {
    var apiURL = environment.apiURL + '/movies/deleteMovie';
    return this._http.delete(`${apiURL}/${id}`);
  }

  private BuildFormData(movie: movieCreationDTO): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('inTheaters', String(movie.inTheaters));
    if (movie.releaseDate) {
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }

    if (movie.poster) {
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }

}
