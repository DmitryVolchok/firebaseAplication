import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
// import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [RegistrationComponent, AutorizationComponent, AuthComponent],
  exports: [RegistrationComponent, AutorizationComponent],
  // providers: [AuthGuard],
})
export class AuthModule {
  isLoggedIn: boolean;
}
