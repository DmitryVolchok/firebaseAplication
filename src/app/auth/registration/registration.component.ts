import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public logField: string;
  public passField: string;
  public passSecField: string;
  public isValid: boolean = false;

  fullGroupName: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.fullGroupName = this.formBuilder.group({
      regField: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
      regPassField: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
      regSecondPassField: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-8]+$')],
      ],
    });
    this.isValid = false;
  }

  ngOnInit(): void {
    // this.fullGroupName = new FormGroup({
    //   regField: new FormControl(),
    //   regPassField: new FormControl(),
    //   regSecondPassField: new FormControl(),
    // });
  }

  newUser(): void {
    this.router.navigateByUrl('newusers');
  }

  getInfo(): void {
    this.logField = this.fullGroupName.get('regField').value;
    this.passField = this.fullGroupName.get('regPassField').value;
    this.passSecField = this.fullGroupName.get('regSecondPassField').value;
    const userDoc = this.afs.firestore.collection('users');
    const otherUserDoc = this.afs.firestore.collection('users1');
    if (this.passField === this.passSecField && this.passField != '') {
      userDoc
        .doc(this.logField)
        .get()
        .then((log) => {
          if (log.exists) {
            console.log('login exists' + this.logField);
            this.isValid = true;
          } else {
            otherUserDoc
              .doc(this.logField)
              .set({
                name: this.logField,
                password: this.passField,
              })
              .then((value) => {
                this.newUser();
              });
          }
        });
    }
  }

  errorColor(): void {
    document.getElementById('regField').style.backgroundColor = 'red';
  }
}
