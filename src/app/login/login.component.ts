import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.loginUser(this.email, this.senha)
      .then((response) => {
        console.log('Login bem-sucedido:', response);
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error);
      });
  }

  goToRegister() {
  }
}
