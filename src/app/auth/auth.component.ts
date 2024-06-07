import { Component } from '@angular/core';
import { iUser } from '../interfaces/user';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  constructor(private authSvc: AuthService) {}
}
