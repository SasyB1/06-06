import { FilmpreferService } from './../filmprefer.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';
import { iFilmPrefer } from '../interfaces/film-prefer';

@Injectable({
  providedIn: 'root',
})
export class PreferGuard {
  constructor(
    private authSvc: AuthService,
    private preferSvc: FilmpreferService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.preferSvc
      .getAll()
      .pipe(map((filmsPrefer: iFilmPrefer[]) => filmsPrefer.length >= 1));
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
