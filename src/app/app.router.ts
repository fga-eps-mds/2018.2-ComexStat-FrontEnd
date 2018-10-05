import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const router: Routes = [
  { path: '', redirectTo:'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);