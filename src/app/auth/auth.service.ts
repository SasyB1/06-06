import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { iUser } from '../interfaces/user';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iAuthWithTok } from '../interfaces/auth-with-tok';
import { iAuthData } from '../interfaces/auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<null | iUser>(null);
  user$ = this.authSubject.asObservable();

  loggedIn: boolean = false;

  logged$ = this.user$.pipe(
    map((user) => !!user),
    tap((user) => (this.loggedIn = user))
  );

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  loginUrl: string = 'http://localhost:3000/login';
  registerUrl: string = 'http://localhost:3000/register';

  register(newUser: Partial<iUser>): Observable<iAuthWithTok> {
    return this.http.post<iAuthWithTok>(this.registerUrl, newUser);
  }

  login(autData: iAuthData): Observable<iAuthWithTok> {
    return this.http.post<iAuthWithTok>(this.loginUrl, autData).pipe(
      tap((data) => {
        this.authSubject.next(data.user);
        localStorage.setItem('token', JSON.stringify(data));
        this.autoLogout();
      })
    );
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getAccessData(): iAuthWithTok | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const tokenParsed = JSON.parse(token);
    return tokenParsed;
  }

  restoreUser(): void {
    const token = this.getAccessData();
    if (!token) return;
    if (this.jwtHelper.isTokenExpired(token.accessToken)) return;

    this.authSubject.next(token.user);
    this.autoLogout();
  }

  autoLogout() {
    const token = this.getAccessData();
    if (!token) return;
    const expDate = this.jwtHelper.getTokenExpirationDate(
      token.accessToken
    ) as Date;
    const expMs = expDate.getTime() - new Date().getTime();
    setTimeout(this.logout, expMs);
  }
}
