import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movieTheatersCreationDTO, movieTheatersDTO } from './movie-theaters.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private _http: HttpClient) { }

  public get(): Observable<movieTheatersDTO[]> {
    var apiURL = environment.apiURL + '/movietheaters/selectMovieTheaterList';
    return this._http.get<movieTheatersDTO[]>(apiURL);
  }

  public getById(id: number): Observable<movieTheatersDTO> {
    var apiURL = environment.apiURL + '/movietheaters/selectMovieTheater';
    return this._http.get<movieTheatersDTO>(`${apiURL}/${id}`);
  }

  public create(movieTheaterDTO: movieTheatersCreationDTO) {
    var apiURL = environment.apiURL + '/movietheaters/saveMovieTheater';
    return this._http.post(apiURL, movieTheaterDTO);
  }

  public edit(id: number, movieTheaterDTO: movieTheatersCreationDTO) {
    var apiURL = environment.apiURL + '/movietheaters/updateMovieTheater';
    return this._http.put(`${apiURL}/${id}`, movieTheaterDTO);
  }

  public delete(id: number) {
    var apiURL = environment.apiURL + '/movietheaters/deleteMovieTheater';
    return this._http.delete(`${apiURL}/${id}`);
  }

}
