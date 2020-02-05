import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Candidate } from '../models/candidate';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDetailsComponent } from '../candidate-details/candidate-details.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.scss']
})
export class ViewCandidatesComponent implements OnInit {
  candidatesList: MatTableDataSource<Candidate>;
  displayedColumns: string[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  initialSelection = [];
  allowMultiSelect = true;
  selection: SelectionModel<Candidate>;

  constructor(private data: DataService, private dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.selection = new SelectionModel<Candidate>(this.allowMultiSelect, this.initialSelection);
    this.data.getCandidates().subscribe((candidatesList: Array<Candidate>) => {
      this.candidatesList = new MatTableDataSource(candidatesList);
      this.candidatesList.sort = this.sort;
    });
    this.displayedColumns = ['select', 'name', 'email', 'phone', 'experience'];
  }
  showDetails(rowData) {
    console.log(rowData);
    this.dialog.open(CandidateDetailsComponent, {
      data: rowData
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.candidatesList.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.candidatesList.data.forEach(row => this.selection.select(row));
  }

  deleteCandidates() {
    this.selection.selected.forEach(candidate => {
      this.data.deleteCandidate(candidate.id).subscribe(
        (id: any) => {
          let newdata = this.candidatesList.data;
          this.candidatesList.data = newdata;
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  updateCandidate() {
    this.router.navigate(['new'], {
      queryParams: {
        candidateId: this.selection.selected[0].id,
        edit: true
      }
    });
  }
}
