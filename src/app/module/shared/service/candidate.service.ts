import { Injectable } from '@angular/core';
import { Candidate } from 'src/app/model/candidate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  mockUrl = 'http://localhost:3001/candidates';
  allCandidates: Candidate[];

  currentEmployee: Candidate = {
    id: null,
    candidateId: '',
    name: '',
    email: '',
    phone: null,
    experience: null,
    photo: '',
    github: ''

  };

  constructor(
    private http: HttpClient
  ) { }

  getAllCandidates() {
    return this.http.get('http://localhost:3001/candidates');
  }
  createCandidate(candidateva) {
    return this.http.post(this.mockUrl, candidateva);
  }
  updateCandidate(candidateupdate) {
    return this.http.post(this.mockUrl + '/' + candidateupdate.id, candidateupdate, headerOption);
  }
}
