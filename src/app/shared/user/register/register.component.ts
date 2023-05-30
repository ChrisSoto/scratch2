import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UntypedFormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../user-model';
import { UserService } from '../user.service';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new UntypedFormControl();

  user: UserLogin = {
    email: '',
    password: ''
  };

  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private _router: Router) { }

  ngOnInit(): void { }

  register() {
    this._auth.createUser(this.user.email, this.user.password)
      .then(data => {
        this._user.create({
          email: data.user.email,
          uid: data.user.uid
        })
          .then(res => {
            this._router.navigate(['/login'])
          })
      }).catch(error => {
        console.log(error.code);
      });
  }

  login() {
    this._router.navigate(['/login'])
  }
}
