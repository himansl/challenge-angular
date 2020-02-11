import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/_collaborators/data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faMobileAlt,
  faEnvelope,
  faBriefcase,
  faCat
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'shortlist-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  dataId;
  faMobileAlt = faMobileAlt;
  faEnvelope = faEnvelope;
  faBriefcase = faBriefcase;
  faCat = faCat;
  constructor(private dataService: DataService, @Inject(MAT_DIALOG_DATA) data) {
    this.dataId = data.id;
  }
  profileData;
  ngOnInit() {
    this.dataService.getDataById(this.dataId).subscribe(el => {
      this.profileData = el;
      document.getElementById('profilePhoto').setAttribute('src', this.profileData.photo);
    });
  }
}
