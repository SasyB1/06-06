import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isCollapsed = true;

  constructor(private authSvc: AuthService) {}

  logout() {
    this.authSvc.logout();
  }

  ngOnInit() {
    this.authSvc.logged$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }
}
