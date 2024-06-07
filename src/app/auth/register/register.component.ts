import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { iUser } from '../../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  newUser: Partial<iUser> = {};

  constructor(private authSvc: AuthService) {}

  register() {
    this.authSvc.register(this.newUser).subscribe();
    console.log(this.newUser);
  }
}
