import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistrationUserComponent } from './new-registration-user.component';

describe('NewRegistrationUserComponent', () => {
  let component: NewRegistrationUserComponent;
  let fixture: ComponentFixture<NewRegistrationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRegistrationUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegistrationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
