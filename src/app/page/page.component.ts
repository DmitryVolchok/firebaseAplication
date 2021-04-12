import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

interface Iread {
  img: string;
  title: string;
  discript: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  public userRoleValue: string;
  public array: Iread[] = [];

  constructor(
    private afs: AngularFirestore,
    private activateRoute: ActivatedRoute
  ) {
    this.userRoleValue = this.activateRoute.snapshot.paramMap.get('userRole');
  }

  ngOnInit(): void {
    localStorage.removeItem('isAutintificated');
    console.log(this.activateRoute.snapshot.paramMap.get('userRole'));

    console.log(typeof this.userRoleValue);
    if (this.userRoleValue === 'admin') {
      this.afs.firestore
        .collection('other1')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.array.push(doc.data() as Iread);
          });
        });
    } else {
      this.afs.firestore
        .collection('other')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.array.push(doc.data() as Iread);
          });
        });
    }
  }
}
