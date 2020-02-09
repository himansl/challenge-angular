import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/_helpers/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CandidateElement } from 'src/app/_helpers/candidate-interface';

@Component({
  selector: 'shortlist-all-candidates',
  templateUrl: './all-candidates.component.html',
  styleUrls: ['./all-candidates.component.scss']
})
export class AllCandidatesComponent implements OnInit {
  displayNothing = false;
  tableColumnsArr = [];
  candidateData;
  selection = new SelectionModel<CandidateElement>(true, []);

  constructor(private dataService: DataService) {
    this.candidateData = [];
    this.tableColumnsArr = ['name', 'email', 'phone', 'experience'];
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    let data = this.dataService.getData();
    this.candidateData = new MatTableDataSource<CandidateElement>(data);
    if (data.length > 0) {
      this.displayNothing = false;
    } else {
      this.displayNothing = true;
    }
    this.candidateData.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.candidateData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.candidateData.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
