import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Candidate } from './models/candidate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'challenge-angular';
  candidatesList: Array<Candidate>;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getCandidates().subscribe((candidatesList: Array<Candidate>) => {
      this.candidatesList = candidatesList;
    });
  }
}
