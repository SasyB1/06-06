import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFilmPrefer } from './interfaces/film-prefer';
import { Observable, map, catchError, of, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmpreferService {
  filmSubject = new BehaviorSubject<iFilmPrefer[]>([]);
  film$ = this.filmSubject.asObservable();
  filmsArr: iFilmPrefer[] = [];

  apiUrl: string = 'http://localhost:3000/filmPrefers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iFilmPrefer[]>(this.apiUrl).pipe(
      tap((films) => {
        this.filmsArr = films;
        this.filmSubject.next(films);
      })
    );
  }

  getFavouriteByUserId(userId: number) {
    return this.http.get<iFilmPrefer[]>(`${this.apiUrl}?userId=${userId}`);
  }

  create(newPrefer: iFilmPrefer) {
    return this.http.post<iFilmPrefer>(this.apiUrl, newPrefer).pipe(
      tap((prefer) => {
        this.filmsArr.push(prefer);
        this.filmSubject.next(this.filmsArr);
      })
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.filmsArr = this.filmsArr.filter((film) => film.id !== id);
        this.filmSubject.next(this.filmsArr);
      })
    );
  }
}
