import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  registerUser(email: string, password: string, phone: string): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          return this.firestore.collection('users').doc(user.uid).set({
            email: user.email,
            phone: phone,
            uid: user.uid,
          }).then(() => {
            return { success: true };
          });
        } else {
          throw new Error('Usuário não encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao registrar usuário: ', error);
        return Promise.reject(error);
      });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getUser() {
    return this.afAuth.authState;
  }
}
