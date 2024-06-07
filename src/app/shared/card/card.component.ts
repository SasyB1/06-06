import { Component, Input, OnInit } from '@angular/core';
import { iFilm } from '../../interfaces/film';
import { FilmpreferService } from '../../filmprefer.service';
import { iFilmPrefer } from '../../interfaces/film-prefer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() cardFilm: iFilm | null = null;
  @Input() userId!: number;
  isFavorite: boolean = false;
  favoriteId: number | null = null;

  constructor(private preferSvc: FilmpreferService) {}

  ngOnInit() {
    this.preferSvc.film$.subscribe((prefers) => {
      const foundPrefer = prefers.find(
        (prefer) =>
          prefer.film.id === this.cardFilm?.id && prefer.userId === this.userId
      );
      this.isFavorite = !!foundPrefer;
      this.favoriteId = foundPrefer ? foundPrefer.id : null;
    });
  }

  toggleFavorite() {
    if (this.cardFilm && this.userId !== null) {
      if (this.isFavorite && this.favoriteId !== null) {
        this.preferSvc.delete(this.favoriteId).subscribe();
      } else {
        const newPrefer: iFilmPrefer = {
          id: null,
          userId: this.userId,
          film: this.cardFilm,
        };
        this.preferSvc.create(newPrefer).subscribe();
      }
    } else {
      console.error('Big fail! 😥');
    }
  }
}
