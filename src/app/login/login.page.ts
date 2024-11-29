import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  async login() {
    this.authService
      .loginUser(this.email, this.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
          const userData = userDoc?.data();
          console.log('Dados do usuário:', userData);

          await this.showAlert('Sucesso', 'Login realizado com sucesso!');
          this.router.navigate(['/home']);
        }
      })
      .catch(async (error) => {
        console.error('Erro ao fazer login: ', error);
        await this.showAlert('Erro', 'Email ou senha inválidos.');
      });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToRegister() {
    this.router.navigate(['/cadastro']);
  }
}
