import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  // Exemplo de método para adicionar um novo documento a uma coleção
  addItem(collection: string, item: any): Promise<any> {
    return this.firestore.collection(collection).add(item);
  }

  // Exemplo de método para buscar todos os documentos de uma coleção
  getItems(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  // Exemplo de método para atualizar um documento existente
  updateItem(collection: string, id: string, item: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(item);
  }

  // Exemplo de método para excluir um documento
  deleteItem(collection: string, id: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }
}
