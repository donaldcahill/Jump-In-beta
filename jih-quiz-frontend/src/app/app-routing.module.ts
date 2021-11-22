import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryListComponent } from './dashboard/history-list/history-list.component';
import { LoginComponent } from './login/login.component';
import { HistoryRegisterComponent } from './dashboard/history-register/history-register.component';
import { QuizListComponent } from './dashboard/quiz-list/quiz-list.component';
import { QuizRegisterComponent } from './dashboard/quiz-register/quiz-register.component';
import { WriterRegisterComponent } from './writer-register/writer-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CategoryRegisterComponent } from './dashboard/category-register/category-register.component';
import { CategoryListComponent } from './dashboard/category-list/category-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'writer-register', component: WriterRegisterComponent },
  {
    path: 'dashboard', component: DashboardComponent, children:
      [
        { path: '', component: HistoryListComponent },
        { path: 'history-list', component: HistoryListComponent },
        { path: 'history-register', component: HistoryRegisterComponent },
        { path: 'quiz-list', component: QuizListComponent },
        { path: 'quiz-register', component: QuizRegisterComponent },
        { path: 'category-register', component: CategoryRegisterComponent },
        { path: 'category-list', component: CategoryListComponent },
      ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
