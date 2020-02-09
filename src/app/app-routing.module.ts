import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCandidatesComponent } from './candidate/all-candidates/all-candidates.component';
import { ProfileComponent } from './candidate/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AllCandidatesComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'new-candidate',
    loadChildren: () =>
      import('../app/candidate/new-candidate/new-candidate.module').then(
        module => module.NewCandidateModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
