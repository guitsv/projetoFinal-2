import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  addItem(collection: string, item: any): Promise<any> {
    return this.firestore.collection(collection).add(item);
  }

  getItems(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }

  updateItem(collection: string, id: string, item: any): Promise<void> {
    return this.firestore.collection(collection).doc(id).update(item);
  }
  
  deleteItem(collection: string, id: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }
}
