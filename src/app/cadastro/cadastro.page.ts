import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  email: string = '';
  password: string = '';
  phone: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    this.authService
      .registerUser(this.email, this.password, this.phone)
      .then(async () => {
        console.log('Usuário registrado com sucesso!');
        await this.showSuccessAlert();
      })
      .catch((error) => {
        console.error('Erro ao registrar usuário: ', error);
      });
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Cadastro realizado com sucesso!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
}
