import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
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

  fullGroupName: FormGroup;

  constructor(private afs: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    this.fullGroupName = new FormGroup({
      regField: new FormControl(),
      regPassField: new FormControl(),
      regSecondPassField: new FormControl(),
    });
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
}
