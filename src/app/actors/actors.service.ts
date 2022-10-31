import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { actorCreationDTO, actorDTO, actorsMovieDTO } from './actors.model';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private _http: HttpClient) { }

  get(page: number, recordsPerPage: number): Observable<any> {
    var apiURL = environment.apiURL + '/actors/selectActorList';
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this._http.get<actorDTO[]>(apiURL, { observe: 'response', params });
  }

  getAll(): Observable<actorDTO[]> {
    var apiURL = environment.apiURL + '/actors/selectActorList';
    return this._http.get<actorDTO[]>(apiURL);
  }

  getById(id: number): Observable<actorDTO> {
    var apiURL = environment.apiURL + '/actors/selectActor';
    return this._http.get<actorDTO>(`${apiURL}/${id}`);
  }

  searchByName(name: string): Observable<actorsMovieDTO[]> {
    var apiURL = environment.apiURL + '/actors/searchByName';
    const headers = new HttpHeaders('Content-Type: application/json');
    return this._http.post<actorsMovieDTO[]>(`${apiURL}`,
      JSON.stringify(name), { headers });
  }

  create(actor: actorCreationDTO) {
    var apiURL = environment.apiURL + '/actors/saveActor';
    const formData = this.buildFormData(actor);
    return this._http.post(apiURL, formData);
  }

  edit(id: number, actor: actorCreationDTO) {
    var apiURL = environment.apiURL + '/actors/updateActor';
    const formData = this.buildFormData(actor);
    return this._http.put(`${apiURL}/${id}`, formData);
  }

  delete(id: number) {
    var apiURL = environment.apiURL + '/actors/deleteActor';
    return this._http.delete(`${apiURL}/${id}`);
  }

  private buildFormData(actor: actorCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);

    if (actor.biography) {
      formData.append('biography', actor.biography);
    }

    if (actor.dateOfBirth) {
      formData.append('dateOfBirth', formatDateFormData(actor.dateOfBirth));
    }

    if (actor.picture) {
      formData.append('picture', actor.picture);
    }

    return formData;
  }
}
