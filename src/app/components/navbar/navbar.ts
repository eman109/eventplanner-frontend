import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
})
export class Navbar {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();   
    this.router.navigate(['/login']);
  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }

  myEvents(){
    this.router.navigate(['/events']);
  }
}
