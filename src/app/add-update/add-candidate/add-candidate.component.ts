import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  profilePic;
  candidateId: number;
  edit: boolean;
  countryCodes = [
    { name: 'india', code: 91 },
    { name: 'usa', code: 1 }
  ];
  constructor(
    private data: DataService,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.candidateId = this.route.snapshot.queryParams['candidateId'];
    this.edit = this.route.snapshot.queryParams['edit'];
    if (this.candidateId) {
      this.data.getCandidate(this.candidateId).subscribe(data => {
        this.profilePic = data.photo;
        this.candidateForm = new FormGroup({
          name: new FormControl(data.name, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
          email: new FormControl(data.email, [Validators.required, Validators.email]),
          countryCode: new FormControl(data.countryCode),
          phone: new FormControl(data.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
          experience: new FormControl(data.experience),
          github: new FormControl(data.github)
        });
      });
    } else {
      this.candidateForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
        email: new FormControl('', [Validators.required, Validators.email]),
        countryCode: new FormControl(''),
        phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        experience: new FormControl(0),
        github: new FormControl('')
      });
    }
  }

  submitForm() {
    if (this.edit)
      this.data
        .updateCandidate(this.candidateId, { photo: this.profilePic, ...this.candidateForm.value })
        .subscribe(candidate => {
          this.snackBar.open('Candidate Updated', ' ', {
            duration: 2000
          });
        });
    else
      this.data.addCandidate({ photo: this.profilePic, ...this.candidateForm.value }).subscribe(candidate => {
        this.snackBar.open('Candidate Added', ' ', {
          duration: 2000
        });
      });
  }
  openFileUploadDialog() {
    (this.renderer.selectRootElement('#picUpload') as HTMLElement).click();
  }

  photoChange(files) {
    var file = files[0];
    // Basic type checking.
    if (file.type.indexOf('image') < 0) {
      return;
    }
    // Create a file reader
    var fReader = new FileReader();
    fReader.addEventListener('load', () => {
      // Show the uploaded image to banner.
      let img: HTMLImageElement = document.getElementById('profile-pic') as HTMLImageElement;
      this.profilePic = fReader.result.toString();
    });
    // Read the file to DataURL format.
    fReader.readAsDataURL(file);
  }
}
