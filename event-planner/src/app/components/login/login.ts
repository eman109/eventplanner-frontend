import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  message = '';
  isLoading = false;

  constructor(private auth: Auth,
    private router: Router

  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.message = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.message = 'Login successful! Redirecting...';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.message = err.error?.error || 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}