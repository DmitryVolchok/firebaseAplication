import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testdev',
  templateUrl: './testdev.component.html',
  styleUrls: ['./testdev.component.css'],
})
export class TestdevComponent implements OnInit {
  public name: string = 'hello world';
  public wow: string = 'git works';
  constructor() {}

  ngOnInit(): void {}
}
