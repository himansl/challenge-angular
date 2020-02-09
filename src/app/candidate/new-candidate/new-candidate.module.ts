import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCandidateComponent } from './new-candidate.component';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';

const routes: Route[] = [
  {
    path: '',
    component: NewCandidateComponent
  }
];

@NgModule({
  declarations: [NewCandidateComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, AngularMaterialModule]
})
export class NewCandidateModule {}
