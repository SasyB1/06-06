import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFilm } from './interfaces/film';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  apiUrl: string = 'http://localhost:3000/films';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iFilm[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<iFilm>(`${this.apiUrl}/${id}`);
  }

  create(newFilm: Partial<iFilm>) {
    return this.http.post<iFilm>(this.apiUrl, newFilm);
  }

  update(film: iFilm) {
    return this.http.put(`${this.apiUrl}/${film.id}`, film);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
