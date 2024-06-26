import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/user';
import { FilmService } from '../../film.service';
import { iFilmPrefer } from '../../interfaces/film-prefer';
import { iFilm } from '../../interfaces/film';
import { FilmpreferService } from '../../filmprefer.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss',
})
export class ProfiloComponent {
  user!: iUser;
  films: iFilm[] = [];
  filmsPrefer: iFilmPrefer[] = [];
  users: iUser[] = [];

  constructor(
    private authSvc: AuthService,
    private filmSvc: FilmService,
    private preferSvc: FilmpreferService,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });
    this.filmSvc.getAll().subscribe((films) => {
      this.films = films;
    });
    this.preferSvc.getAll().subscribe((prefer) => {
      this.filmsPrefer = prefer;
    });
    this.userSvc.getAll().subscribe((users) => {
      this.users = users;
    });

    this.preferSvc.film$.subscribe((prefer) => {
      if (prefer) this.filmsPrefer = prefer;
    });
  }
}
