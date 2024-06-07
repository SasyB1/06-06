import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/user';
import { FilmService } from '../../film.service';
import { iFilmPrefer } from '../../interfaces/film-prefer';
import { iFilm } from '../../interfaces/film';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent {
  user!: iUser;
  films: iFilm[] = [];
  filmsPrefer: iFilmPrefer[] = [];

  constructor(private authSvc: AuthService, private filmSvc: FilmService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });
    this.filmSvc.getAll().subscribe((films) => {
      this.films = films;
    });
  }
}
