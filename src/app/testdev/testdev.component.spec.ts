import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdevComponent } from './testdev.component';

describe('TestdevComponent', () => {
  let component: TestdevComponent;
  let fixture: ComponentFixture<TestdevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
