import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionTwoPage } from './question-two.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionTwoPageRoutingModule {}
