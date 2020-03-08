import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-candidateprofile',
  templateUrl: './candidateprofile.component.html',
  styleUrls: ['./candidateprofile.component.scss']
})
export class CandidateprofileComponent implements OnInit {
  message: object = {};
  cancelButtonText = 'Cancel';
  ngOnInit() {
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CandidateprofileComponent>) {
    if (data) {
      this.message = data.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.dialogRef.updateSize('auto', 'auto');
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
