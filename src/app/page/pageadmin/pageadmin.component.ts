import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

interface Iread {
  img: string;
  title: string;
  discript: string;
}

@Component({
  selector: 'app-pageadmin',
  templateUrl: './pageadmin.component.html',
  styleUrls: ['./pageadmin.component.css'],
})
export class PageadminComponent implements OnInit {
  public array: Iread[] = [];
  constructor(
    private afs: AngularFirestore,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.activateRoute.snapshot.params.value);
    this.afs.firestore
      .collection('other1')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.array.push(doc.data() as Iread);
        });
      });
  }
}
