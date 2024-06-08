import { Component } from '@angular/core';
import { FilmpreferService } from '../../../filmprefer.service';
import { iFilmPrefer } from '../../../interfaces/film-prefer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss',
})
export class PreferitiComponent {
  filmsPrefer: iFilmPrefer[] = [];

  constructor(private preferSvc: FilmpreferService, private router: Router) {}

  ngOnInit() {
    this.preferSvc.getAll().subscribe((prefer) => {
      this.filmsPrefer = prefer;
    });

    this.preferSvc.film$.subscribe((prefer) => {
      if (prefer) this.filmsPrefer = prefer;
    });
  }

  removePrefer(userId: number) {
    this.preferSvc.delete(userId).subscribe({
      next: () => {
        this.filmsPrefer = this.filmsPrefer.filter(
          (prefer) => prefer.userId !== userId
        );
        if (this.filmsPrefer.length === 0) {
          this.router.navigate(['profilo']);
        }
      },
      error: (error) => {
        console.error('Failed to remove favorite film:', error);
      },
    });
  }
}
