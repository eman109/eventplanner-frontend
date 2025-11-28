import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  token = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Login successful!';
        this.token = res.token || '';

        // ✅ Store token if backend returns one
        if (this.token) {
          localStorage.setItem('token', this.token);
        }

        // ✅ Redirect to dashboard (or events page)
        this.router.navigate(['/dashboard']);
        // If you prefer events page, use: this.router.navigate(['/events']);
      },
      error: (err: HttpErrorResponse) => {
        this.message = err.error?.error || 'Login failed';
        this.token = '';
      }
    });
  }
}
