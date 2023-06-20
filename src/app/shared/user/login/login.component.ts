import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../user-model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private auth = inject(AuthService);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  form = new UntypedFormControl();

  user: UserLogin = {
    email: '',
    password: ''
  };

  ngOnInit(): void { }

  login() {
    this.auth.signIn(this.user.email, this.user.password)
      .then(data => {
        this.router.navigate(['/'])
      })
      .catch(error => {
        this.snack.open(error, '', { duration: 5000 })
      });
  }

  register() {
    this.router.navigate(['/register'])
      .then(() => {
        this.snack.open('Logged In!', '', { duration: 3000 })
      })
  }

}
