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
    if (this.cardFilm && this.userId) {
      this.preferSvc
        .getFavouriteByUserId(this.userId)
        .subscribe((preferences) => {
          const favorite = preferences.find(
            (pref) => pref.userId === this.cardFilm!.id
          );
          this.isFavorite = !!favorite;
          this.favoriteId = favorite?.userId ?? null;
        });
    }
  }

  toggleFavorite() {
    if (this.cardFilm && this.userId !== null) {
      if (this.isFavorite && this.favoriteId !== null) {
        this.preferSvc.delete(this.favoriteId).subscribe(
          () => {
            this.isFavorite = false;
            this.favoriteId = null;
          },
          (error) => {
            console.error(
              "Errore durante l'eliminazione dai preferiti 😥",
              error
            );
          }
        );
      } else {
        this.preferSvc
          .create({ id: null, userId: this.userId, film: this.cardFilm })
          .subscribe(
            (prefer) => {
              this.isFavorite = true;
              this.favoriteId = prefer.id;
            },
            (error) => {
              console.error("Errore durante l'aggiunta ai preferiti😥", error);
            }
          );
      }
    } else {
      console.log('Big fail! 😥');
    }
  }
}
