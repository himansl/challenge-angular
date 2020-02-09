import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/_helpers/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'shortlist-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})
export class NewCandidateComponent implements OnInit {
  experienceArr: any[];
  phoneCodeArr: Number[];
  newCandidateForm: FormGroup;
  constructor(private dataService: DataService, private snackbar: MatSnackBar) {
    this.experienceArr = new Array(100);
    this.phoneCodeArr = [+91, +62, +254, +67];
  }

  ngOnInit() {
    this.newCandidateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      code: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      experience: new FormControl(0, [Validators.required, Validators.max(100)]),
      github: new FormControl('', [Validators.required])
    });
  }

  submitForm() {
    console.log(this.newCandidateForm.value);
    this.dataService.saveData(this.newCandidateForm.value);
    this.snackbar.open('Candidate Added !!', '', {
      duration: 2000
    });
  }
  get name() {
    return this.newCandidateForm.controls['name'];
  }

  get email() {
    return this.newCandidateForm.controls['email'];
  }

  get code() {
    return this.newCandidateForm.controls['code'];
  }

  get phone() {
    return this.newCandidateForm.controls['phone'];
  }

  get experience() {
    return this.newCandidateForm.controls['name'];
  }

  get github() {
    return this.newCandidateForm.controls['github'];
  }
}
