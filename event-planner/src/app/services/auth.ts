import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


export interface User {
  id: string;
  name: string;
  email?: string;
  
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient,
    private router: Router
  ) {}

  private STORAGE_KEY = 'myapp_user';

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  getUserId(): string | null {
    const u = this.getCurrentUser();
    return u ? u.id : null;
  }

  getUserName(): string | null {
    const u = this.getCurrentUser();
    return u ? u.name : null;
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {
      email,
      password
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string; message: string }>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
}
