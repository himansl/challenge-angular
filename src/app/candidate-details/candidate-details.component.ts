import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  name: string;
  countryCode: number;
  phone: number;
  email: string;
  github: string;
  experience: number;
  photo: string;
  constructor(private dialogRef: MatDialogRef<CandidateDetailsComponent>, @Inject(MAT_DIALOG_DATA) private data) {}

  ngOnInit() {
    this.name = this.data.name;
    this.countryCode = this.data.countryCode;
    this.phone = this.data.phone;
    this.experience = this.data.experience;
    this.github = this.data.github;
    this.email = this.data.email;
    this.photo = this.data.photo || '../assets/profile_pic_default.png';
  }
}
