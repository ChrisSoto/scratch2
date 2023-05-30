import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  private auth = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  form = new UntypedFormControl();

  user: UserLogin = {
    email: '',
    password: ''
  };

  ngOnInit(): void { }

  register() {
    this.auth.createUser(this.user.email, this.user.password)
      .then(data => {
        this.userService.create({
          email: data.user.email,
          uid: data.user.uid
        })
          .then(res => {
            this.router.navigate(['/login'])
          })
      }).catch(error => {
        console.log(error.code);
      });
  }

  login() {
    this.router.navigate(['/login'])
  }
}
