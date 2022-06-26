import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LandingPage } from './pages/landing/landing.page';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },

  {
    path: 'my-matches',
    loadChildren: () => import('./pages/my-matches/my-matches.module').then(m => m.MyMatchesPageModule)
  },

  {
    path: 'daily-recommendations',
    loadChildren: () => import('./pages/daily-recommendations/daily-recommendations.module').then(m => m.DailyRecommendationsPageModule)
  },
  
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
