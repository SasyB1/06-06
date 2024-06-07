import { iFilm } from './film';

export interface iFilmPrefer {
  id: number | null;
  film: iFilm;
  userId: number;
}
