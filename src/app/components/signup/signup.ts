import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './signup.html',
})
export class Signup {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private auth: Auth,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.signup(this.name,this.email, this.password).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Signup successful!';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error?.error || 'Signup failed';
      }
    });
  }
}