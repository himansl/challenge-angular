import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://localhost:3001';

  constructor(private _http: HttpClient) {}

  getCandidates() {
    return this._http.get<Array<Candidate>>(this.baseUrl + '/candidates');
  }

  addCandidate(candidate: Candidate) {
    return this._http.post<Candidate>(this.baseUrl + '/candidate', candidate);
  }

  deleteCandidate(id: number) {
    return this._http.delete(this.baseUrl + '/candidate/' + id);
  }

  getCandidate(id: number) {
    return this._http.get<Candidate>(this.baseUrl + '/candidate/' + id);
  }

  updateCandidate(id: number, candidateData: Candidate) {
    return this._http.put(this.baseUrl + '/candidate/' + id, candidateData);
  }
}
