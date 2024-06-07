import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFilmPrefer } from './interfaces/film-prefer';
import { Observable, map, catchError, of, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmpreferService {
  filmSubject = new BehaviorSubject<null | iFilmPrefer>(null);
  film$ = this.filmSubject.asObservable();

  apiUrl: string = 'http://localhost:3000/filmPrefers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iFilmPrefer[]>(this.apiUrl);
  }

  getFavouriteByUserId(userId: number) {
    return this.http.get<iFilmPrefer[]>(`${this.apiUrl}?userId=${userId}`);
  }

  create(newPrefer: iFilmPrefer) {
    return this.http.post<iFilmPrefer>(this.apiUrl, newPrefer).pipe(
      tap((prefer) => {
        this.filmSubject.next(prefer);
      })
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.filmSubject.next(null);
      })
    );
  }
}
