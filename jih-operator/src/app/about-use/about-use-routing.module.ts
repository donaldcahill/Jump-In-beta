import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsePage } from './about-use.page';

const routes: Routes = [
  {
    path: '',
    component: AboutUsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsePageRoutingModule {}
