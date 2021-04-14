import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { NewRegistrationUserComponent } from './new-registration-user/new-registration-user.component';

const routes: Routes = [
  { path: 'mainapp', component: AppComponent },
  {
    path: 'page',
    loadChildren: () =>
      import('../app/page/page.module').then((m) => m.PageModule),
    canActivate: [AuthGuard],
  },
  // { path: 'pageadmin', component: PageadminComponent },
  { path: 'newusers', component: NewRegistrationUserComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
