import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Obtén el rol del usuario desde el localStorage
    const role = localStorage.getItem('userRole');
    this.isAdmin = role === 'admin';
  }

  // Métodos para ir a las secciones solo si el usuario tiene permisos
  goToAuthors() {
    if (this.isAdmin) {
      this.router.navigate(['/dashboard/authors']);
    } else {
      alert('Acceso restringido');
    }
  }

  goToCategories() {
    if (this.isAdmin) {
      this.router.navigate(['/dashboard/categories']);
    } else {
      alert('Acceso restringido');
    }
  }

  goToClients() {
    if (this.isAdmin) {
      this.router.navigate(['/dashboard/clientes']);
    } else {
      alert('Acceso restringido');
    }
  }
}