import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidateService } from '../../shared/service/candidate.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from 'src/app/model/candidate';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CandidateprofileComponent } from '../candidateprofile/candidateprofile.component';


// tslint:disable-next-line: class-name
export interface tableContent {
  name: string;
  email: string;
  phone: number;
  experience: number;
}

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  allCandidatesList: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private candidateService: CandidateService, private dialog: MatDialog, private router: Router) {

  }

  displayedColumns: string[] = ['name', 'email', 'phone', 'experience'];
  dataSource = new MatTableDataSource(this.allCandidatesList);


  ngOnInit() {
    this.getAllCandidates();
  }


  btnClick() {
    this.router.navigate(['./addCandidate']);
  }

  getAllCandidates() {
    this.candidateService.getAllCandidates().subscribe((candidatesList: Candidate) => {
      this.allCandidatesList = candidatesList;
      this.dataSource = new MatTableDataSource(this.allCandidatesList);
      this.dataSource.sort = this.sort;

    });

  }
  openAlertDialog(data) {
    console.log(data);
    const dialogRef = this.dialog.open(CandidateprofileComponent, {
      data: {
        message: data,
        buttonText: {
          cancel: 'x'
        }
      },
    });
  }
}
