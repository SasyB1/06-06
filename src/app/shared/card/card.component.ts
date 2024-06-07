import { Component, Input } from '@angular/core';
import { iFilm } from '../../interfaces/film';
import { FilmpreferService } from '../../filmprefer.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardFilm: iFilm | null = null;
  @Input() userId!: number;
  isFavorite: boolean = false;
  favoriteId: number | null = null;

  constructor(private preferSvc: FilmpreferService) {}

  ngOnInit() {
    this.preferSvc.film$.subscribe((prefer) => {
      if (prefer && prefer.film && this.cardFilm) {
        this.isFavorite =
          prefer.film.id === this.cardFilm.id && prefer.userId === this.userId;
        this.favoriteId = prefer.id;
      } else {
        this.isFavorite = false;
        this.favoriteId = null;
      }
    });
  }

  toggleFavorite() {
    if (this.cardFilm && this.userId !== null) {
      if (this.isFavorite && this.favoriteId !== null) {
        this.preferSvc.delete(this.favoriteId).subscribe(() => {
          this.isFavorite = false;
          this.favoriteId = null;
        });
      } else {
        this.preferSvc
          .create({ id: null, userId: this.userId, film: this.cardFilm })
          .subscribe((prefer) => {
            this.isFavorite = true;
            this.favoriteId = prefer.id;
          });
      }
    } else {
      console.log('Big fail! 😥');
    }
  }
}
