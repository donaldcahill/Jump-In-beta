import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryRegisterComponent } from './history-register/history-register.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizRegisterComponent } from './quiz-register/quiz-register.component';
import { ComunModule } from '../comun/comun.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialImportModule } from '../material-import';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRegisterComponent } from './category-register/category-register.component';



@NgModule({
  declarations: [
    HistoryRegisterComponent,
    HistoryListComponent,
    QuizListComponent,
    QuizRegisterComponent,
    DashboardComponent,
    HomeComponent,

    CategoryListComponent,
    CategoryRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComunModule,
    AppRoutingModule,
    MaterialImportModule,
  ],
  exports: [
    HistoryRegisterComponent,
    HistoryListComponent,
    QuizListComponent,
    QuizRegisterComponent
  ]
})
export class DashboardModule { }
