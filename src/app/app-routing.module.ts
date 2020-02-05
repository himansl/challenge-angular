import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCandidatesComponent
  },
  {
    path: 'new',
    loadChildren: './add-update/add-update.module#AddUpdateModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
