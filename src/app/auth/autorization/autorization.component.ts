import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/page/auth-guard.service';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css'],
})
export class AutorizationComponent implements OnInit {
  public name: string;
  public password: string = '';
  public fullNameControl: FormGroup;
  public checkValueError: boolean = false;
  private role: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authGuardService: AuthGuardService,
    private formBulder: FormBuilder
  ) {
    this.fullNameControl = this.formBulder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
      passwordValue: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
    });
  }

  getInfo(): void {
    let userDoc = this.afs.firestore.collection('users');
    userDoc.doc();
    this.name = this.fullNameControl.get('firstName').value;
    this.password = this.fullNameControl.get('passwordValue').value;
    userDoc
      .doc(this.name)
      .get()
      .then((log) => {
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
    this.authGuardService.setAuthSatatus = true;
    this.router.navigateByUrl(`page/content`);
  }

  routeAdmin(): void {
    this.authGuardService.setAuthSatatus = true;
    this.router.navigateByUrl(`page/admin`);
  }

  QQQ() {
    console.log(this.fullNameControl.controls.firstName.invalid);
  }

  ngOnInit(): void {}
}
