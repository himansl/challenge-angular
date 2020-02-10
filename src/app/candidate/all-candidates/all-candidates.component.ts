import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/_helpers/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CandidateElement } from 'src/app/_helpers/candidate-interface';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'shortlist-all-candidates',
  templateUrl: './all-candidates.component.html',
  styleUrls: ['./all-candidates.component.scss']
})
export class AllCandidatesComponent implements OnInit {
  displayNothing = false;
  tableColumnsArr = [];
  candidateData;
  routeQueryParams;
  selection = new SelectionModel<CandidateElement>(true, []);

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.candidateData = [];
    this.tableColumnsArr = ['select', 'name', 'email', 'phone', 'experience'];
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.get('dialog')) {
        let id = +params.get('id');
        this.openDialog(id);
      }
    });
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position +
      1}`;
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '700px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['.'], { relativeTo: this.activatedRoute });
      console.log('The dialog was closed');
    });
  }
}
