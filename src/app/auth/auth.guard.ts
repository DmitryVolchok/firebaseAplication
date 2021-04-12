import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGuardService } from '../page/auth-guard.service';

import { AuthModule } from './auth.module';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthModule) private auth: AuthModule,
    private authGuardService: AuthGuardService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // return localStorage.getItem('isAutintificated') === 'true' ? true : false;
    return this.authGuardService.getAuthStatus;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state);
  }
}
