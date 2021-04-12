import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',

    // canActivateChild: [AuthGuard],
    component: AuthComponent,
    children: [
      { path: 'autorize', component: AutorizationComponent },
      { path: 'regist', component: RegistrationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
  // providers: [AuthGuard],
})
export class AuthRoutingModule {}
