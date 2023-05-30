import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../user-model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new UntypedFormControl();

  user: UserLogin = {
    email: '',
    password: ''
  };

  constructor(
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void { }

  signIn() {
    this._auth.signIn(this.user.email, this.user.password)
      .then(data => {
        this._router.navigate(['/bible-app/genesis/1'])
      })
      .catch(error => {
        console.log(error.code);
      });
  }

  register() {
    this._router.navigate(['/register'])
  }

}
