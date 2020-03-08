import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddcandidateComponent } from './module/candidates/addcandidate/addcandidate.component';

const routes: Routes = [
{ path: '',
  loadChildren: () => import('../app/module/candidate.module').then(m =>
  m.CandidateModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
