import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/_helpers/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateElement } from 'src/app/_helpers/candidate-interface';
import { faMobileAlt, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'shortlist-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataInput;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faBriefcase = faBriefcase;
  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<CandidateElement>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dataInput = data.id;
  }
  profileData;
  id;
  ngOnInit() {
    this.profileData = this.dataService.getDataById(this.dataInput);
    console.log(this.profileData);
  }
}
