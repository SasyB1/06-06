import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFilmPrefer } from './interfaces/film-prefer';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmpreferService {
  apiUrl: string = 'http://localhost:3000/filmPrefers';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<iFilmPrefer[]>(this.apiUrl);
  }

  getFavouriteByUserId(userId: number) {
    return this.http.get<iFilmPrefer[]>(`${this.apiUrl}?userId=${userId}`);
  }

  create(newPrefer: iFilmPrefer) {
    return this.http.post<iFilmPrefer>(this.apiUrl, newPrefer);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
