import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/page/auth-guard.service';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css'],
})
export class AutorizationComponent implements OnInit {
  public name: string;
  public password: string = '';
  fullNameControl: FormGroup;
  private role: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private _http: HttpClient,
    private authGuardService: AuthGuardService
  ) {
    _http.get('/auth/auth.module').subscribe((result) => {
      console.log(result);
    });
  }

  getInfo(): void {
    let userDoc = this.afs.firestore.collection('users');
    console.log(userDoc);
    userDoc.doc();

    this.name = this.fullNameControl.get('firstName').value;
    this.password = this.fullNameControl.get('passwordValue').value;
    console.log(userDoc.doc(this.name).get());
    userDoc
      .doc(this.name)
      .get()
      .then((log) => {
        console.log(log.data());
        if (log.exists && this.password === log.data().password) {
          if (this.name === this.password && this.name === 'admin') {
            this.routeAdmin();
          } else {
            this.routeOk();
          }
        } else console.log('document written with id', this.name);
      });
  }

  routeOk(): void {
    // this.router.navigateByUrl(`page/${this.role}`);
    // localStorage.setItem('isAutintificated', 'true');
    this.authGuardService.setAuthSatatus = true;
    this.router.navigateByUrl(`page/content`);
    console.log(this.role, 'aladldlldld');
  }

  routeAdmin(): void {
    // localStorage.setItem('isAutintificated', 'true');
    this.authGuardService.setAuthSatatus = true;
    this.router.navigateByUrl(`page/admin`);
  }

  // routeBack(): void {
  //   this.router.navigate(['']);
  // }

  nameControl: FormControl;
  loginControl: FormControl;

  ngOnInit(): void {
    this.fullNameControl = new FormGroup({
      firstName: new FormControl(),
      passwordValue: new FormControl(),
    });

    this.fullNameControl
      .get('firstName')
      .valueChanges.subscribe((value) => console.log(value));

    this.fullNameControl
      .get('passwordValue')
      .valueChanges.subscribe((value) => console.log(value));

    this.nameControl = new FormControl('new', [
      Validators.required,
      Validators.pattern('^[а-яА-ЯёЁa-zA-Z0-9]+$'),
    ]);

    this.loginControl = new FormControl('name', [
      Validators.required,
      Validators.pattern('^[а-яА-ЯёЁa-zA-Z0-9]+$'),
    ]);
    this.loginControl.valueChanges.subscribe((value) => console.log(value));
    this.nameControl.valueChanges.subscribe((value) => console.log(value));
    this.nameControl.statusChanges.subscribe((status) => console.log(status));
  }
}
