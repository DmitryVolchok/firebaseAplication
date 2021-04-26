import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  private role: string;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authGuardService: AuthGuardService,
    private formBulder: FormBuilder
  ) {}

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
  // nameControl: FormControl;
  // loginControl: FormControl;

  ngOnInit(): void {
    // this.fullNameControl = new FormGroup({
    //   firstName: new FormControl(),
    //   passwordValue: new FormControl(),
    // });

    this.fullNameControl = this.formBulder.group({
      firstName: [
        '',
        Validators.required,
        Validators.pattern('^[а-яА-ЯёЁa-zA-Z0-9]+$'),
      ],
      passwordValue: [
        '',
        Validators.required,
        Validators.pattern('^[а-яА-ЯёЁa-zA-Z0-9]+$'),
      ],
    });

    this.fullNameControl.valueChanges.subscribe((value) => console.log(value));

    this.fullNameControl.get('firstName');
    //   //if you need to see value changes .valueChanges.subscribe((value) => console.log(value));

    //   this.fullNameControl.get('passwordValue');
    //   //if you need to see value changes .valueChanges.subscribe((value) => console.log(value));

    //   this.nameControl = new FormControl('new', [
    //     Validators.required,
    //     Validators.pattern('^[а-яА-ЯёЁa-zA-Z0-9]+$'),
    //   ]);

    //   this.loginControl = new FormControl('name', [
    //     Validators.required,
    //     Validators.pattern('^[а-яА-ЯёЁa-zA-Z0-9]+$'),
    //   ]);
    //   this.loginControl.valueChanges.subscribe((value) => console.log(value));
    //   this.nameControl.valueChanges.subscribe((value) => console.log(value));
    //   this.nameControl.statusChanges.subscribe((status) => console.log(status));
    // }
  }
}
