import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from '../../shared/service/candidate.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addcandidate',
  templateUrl: './addcandidate.component.html',
  styleUrls: ['./addcandidate.component.scss']
})
export class AddcandidateComponent implements OnInit {
  private sucessMessage = 'Candidate successfully added';
  candidateForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneNumber = /^[6-9]\d{9}$/;

  constructor(
    private formBuilder: FormBuilder,
    private candidateService: CandidateService, private location: Location,
    private cd: ChangeDetectorRef, private snackBar: MatSnackBar
  ) { }

  @ViewChild('fileInput', { static: true }) el: ElementRef;

  ngOnInit() {
    this.candidateForm = this.formBuilder.group({
      photo: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      countryCode: [null],
      phone: [null, [Validators.required, Validators.pattern(('[6-9]\\d{9}'))]],
      github: [null]
    });
  }

  uploadFile(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.candidateForm.patchValue({
          file: reader.result
        });
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  submit(candidateVal) {
    this.candidateService.createCandidate(candidateVal).subscribe(
      (data) => {
        const action = '';
        this.openSucessAlert(this.sucessMessage, action);
        this.candidateService.getAllCandidates();
      });

  }
  goBack() {
    this.location.back();
  }
  openSucessAlert(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['bluesnackbar'],
      verticalPosition: 'top'
    });
  }
}
