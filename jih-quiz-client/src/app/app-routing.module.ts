import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'question',
    loadChildren: () =>
      import('./question/question.module').then((m) => m.QuestionPageModule),
  },
  {
    path: 'congrats',
    loadChildren: () =>
      import('./congrats/congrats.module').then((m) => m.CongratsPageModule),
  },
  {
    path: 'question-two',
    loadChildren: () =>
      import('./question-two/question-two.module').then(
        (m) => m.QuestionTwoPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./create-account/create-account.module').then(
        (m) => m.CreateAccountPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
