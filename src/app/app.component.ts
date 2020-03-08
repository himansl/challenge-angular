import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: number;
  experience: number;
  photo: string;
  github: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'challenge-angular';

  candidatesList: Array<Candidate>;
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get('http://localhost:3001/candidates').subscribe((candidatesList: Array<Candidate>) => {
      this.candidatesList = candidatesList;
    });
  }
}
