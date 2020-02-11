import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatRippleModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {}
