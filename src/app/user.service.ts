import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iUser } from './interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject = new BehaviorSubject<null | iUser>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  apiUrl: string = ' http://localhost:3000/users';

  getAll() {
    return this.http.get<iUser[]>(this.apiUrl);
  }
}
