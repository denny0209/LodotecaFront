import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Servicio para gestionar la autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //login
  username: string;
  password: string;

  constructor(
    //login>
    private authService: AuthService,
    //login

    private router: Router) { }


  // Lógica para el login
  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          // Almacena el rol del usuario en localStorage o en un servicio
          localStorage.setItem('userRole', response.role); // 'admin' o 'guest'
          this.router.navigate(['/dashboard']); // Redirige al dashboard o página principal
        } else {
          alert('Credenciales incorrectas');
        }
      }
    );
  }


  enterAsGuest(): void {
    // Lógica para entrar como invitado
    console.log('Entrando como invitado...');
    this.router.navigate(['/home']); // Redirige a la página principal o home
  }
}
