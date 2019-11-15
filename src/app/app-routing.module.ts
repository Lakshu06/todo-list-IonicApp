import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'forgetpassword', loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then(m => m.ForgetpasswordPageModule) },
  { path: 'view-profile', loadChildren: './pages/view-profile/view-profile.module#ViewProfilePageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
