import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorizationComponent } from './auth/autorization/autorization.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRegistrationUserComponent } from './new-registration-user/new-registration-user.component';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './page/page.module';
import { Checkinterseptor } from './check.interseptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [AppComponent, NewRegistrationUserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    PageModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: Checkinterseptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
