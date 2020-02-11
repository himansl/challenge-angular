import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/_collaborators/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'shortlist-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.scss']
})
export class NewCandidateComponent implements OnInit {
  experienceArr: any[];
  phoneCodeArr: Number[];
  newCandidateForm: FormGroup;
  selectedFile = null;
  imageUploaded;

  faLongArrowAltLeft = faLongArrowAltLeft;
  @Output() changeImageEvent = new EventEmitter();

  constructor(private dataService: DataService, private snackbar: MatSnackBar) {
    this.experienceArr = new Array(100);
    this.phoneCodeArr = [+91, +62, +254, +67];
  }

  ngOnInit() {
    this.newCandidateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      code: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      experience: new FormControl(0, [Validators.required, Validators.max(100)]),
      github: new FormControl('', [Validators.required]),
      photo: new FormControl('')
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(this.selectedFile);
    fr.addEventListener('load', () => {
      this.imageUploaded = fr.result.toString();
      document.getElementById('picUploadImage').setAttribute('src', this.imageUploaded);
    });
  }

  changePicture() {
    document.getElementById('dp').click();
  }

  submitForm() {
    if (this.imageUploaded) {
      this.newCandidateForm.patchValue({ photo: this.imageUploaded });
    }
    this.dataService.saveData(this.newCandidateForm.value).subscribe();
    this.snackbar.open('Candidate Added !!', '', {
      duration: 2000
    });
    this.selectedFile = null;
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
