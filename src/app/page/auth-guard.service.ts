import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private isAutintificated: boolean = false;
  constructor() {}

  get getAuthStatus(): boolean {
    return this.isAutintificated;
  }

  set setAuthSatatus(status: boolean) {
    this.isAutintificated = status;
  }
}
