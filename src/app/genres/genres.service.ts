import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { genreCreationDTO, genreDTO } from './genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<genreDTO[]> {
    var apiURL = environment.apiURL + '/genres/selectListGenres';
    return this._http.get<genreDTO[]>(apiURL); //[{ id: 1, name: 'Drama' }]
  }

  getById(id: number): Observable<genreDTO> {
    var apiURL = environment.apiURL + '/genres/selectGenre';
    return this._http.get<genreDTO>(`${apiURL}/${id}`);
  }

  create(genre: genreCreationDTO) {
    var apiURL = environment.apiURL + '/genres/saveGenre';
    return this._http.post(apiURL, genre);
  }

  edit(id: number, genre: genreCreationDTO) {
    var apiURL = environment.apiURL + '/genres/updateGenre';
    return this._http.put(`${apiURL}/${id}`, genre);
  }

  delete(id: number) {
    var apiURL = environment.apiURL + '/genres/deleteGenre';
    return this._http.delete(`${apiURL}/${id}`);
  }
}
