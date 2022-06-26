import { RouterModule, Routes } from '@angular/router';

import { LandingPage } from './landing.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
