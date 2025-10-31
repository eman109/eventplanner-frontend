import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  // ADD THIS
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';
  message = '';

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.signup(this.email, this.password).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Signup successful!';
      },
      error: (err) => {
        this.message = err.error?.error || 'Signup failed';
      }
    });
  }
}
