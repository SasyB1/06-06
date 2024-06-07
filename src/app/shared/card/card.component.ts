import { Component, Input } from '@angular/core';
import { iFilm } from '../../interfaces/film';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() cardFilm: iFilm | null = null;
}
