import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { CandidateElement } from './candidate-interface';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataChangeSubject: Subject<any>;
  constructor(private http: HttpClient) {}

  getData(): Observable<CandidateElement[]> {
    return this.http.get<CandidateElement[]>('https://localhost:3001/candidates');
  }

  getDataById(id): Observable<CandidateElement> {
    return this.http.post<CandidateElement>('https://localhost:3001/candidate', {
      id: id
    });
  }

  saveData(value: any) {
    return this.http.post('https://localhost:3001/new-candidate', { value: value });
  }
}
