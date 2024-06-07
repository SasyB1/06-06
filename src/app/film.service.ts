import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFilm } from './interfaces/film';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  filmSubject = new BehaviorSubject<null | iFilm>(null);
  film$ = this.filmSubject.asObservable();

  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:3000/films';

  getAll() {
    return this.http.get<iFilm[]>(this.apiUrl);
  }

  create(newFilm: Partial<iFilm>) {
    return this.http.post<iFilm>(this.apiUrl, newFilm);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
