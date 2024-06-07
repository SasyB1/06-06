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
    if (this.cardFilm && this.userId !== null) {
      this.preferSvc
        .getFavouriteByUserId(this.userId)
        .subscribe((preferences) => {
          const favorite = preferences.find(
            (pref) => pref.filmId === this.cardFilm!.id
          );
          this.isFavorite = !!favorite;
          this.favoriteId = favorite ? favorite.id : null;
        });
    }
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
          .create({ userId: this.userId, filmId: this.cardFilm.id })
          .subscribe((prefer) => {
            this.isFavorite = true;
            this.favoriteId = prefer.id;
          });
      }
    } else {
      console.log('f');
    }
  }
}
