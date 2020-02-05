import { NgModule } from '@angular/core';

import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { SharedModule } from '../shared.module';
import { AddUpdateRoutingModule } from './add-update-routing.module';

@NgModule({
  imports: [SharedModule, AddUpdateRoutingModule],
  declarations: [AddCandidateComponent],
  exports: [AddCandidateComponent]
})
export class AddUpdateModule {}
