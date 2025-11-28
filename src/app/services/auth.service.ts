import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/signup`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; message: string }>(`${this.api}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/events']);  // CHANGE THIS TO YOUR DASHBOARD ROUTE
        }
      })
    );
  }

  // Helper methods
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}