import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewCandidatesComponent } from './view-candidates/view-candidates.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CoreModule } from './view-candidates/core.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [AppComponent, ViewCandidatesComponent, CandidateDetailsComponent],
  imports: [AppRoutingModule, CoreModule, SharedModule],
  bootstrap: [AppComponent],
  entryComponents: [CandidateDetailsComponent]
})
export class AppModule {}
