import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(username: string, password: string): Observable<any> {
    // Simulación de login (esto debe ser reemplazado por una llamada HTTP real)
    if (username === 'admin' && password === 'admin') {
      return of({ success: true, role: 'admin' });
    } else if (username === 'guest' && password === 'guest') {
      return of({ success: true, role: 'guest' });
    } else {
      return of({ success: false });
    }
  }

  logout(): void {
    localStorage.removeItem('userRole');
  }
}