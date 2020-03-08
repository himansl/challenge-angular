import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesListComponent } from './candidates/candidates-list/candidates-list.component';
import { CandidateprofileComponent } from './candidates/candidateprofile/candidateprofile.component';
import { AddcandidateComponent } from './candidates/addcandidate/addcandidate.component';
import { SharedModule } from './shared/service/shared.module';
import { MaterialModule } from '../module/shared/angularmaterial/material/material.module';
import { CandidateService } from './shared/service/candidate.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', component: CandidatesListComponent},
    {path: 'addCandidate',  component: AddcandidateComponent}
];

@NgModule({
  declarations: [CandidatesListComponent, CandidateprofileComponent, AddcandidateComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CandidatesListComponent,
    CandidateprofileComponent,
    AddcandidateComponent
  ],
  providers: [
    CandidateService
  ],
  entryComponents: [CandidateprofileComponent]

})
export class CandidateModule { }
