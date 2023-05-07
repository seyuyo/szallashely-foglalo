import { Injectable } from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { User } from "../models/User";
import {doc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionUser = 'Users';

  constructor(private firestore: AngularFirestore) { }

  create (user: User): Promise<any> {
    return this.firestore.collection(this.collectionUser).add(user);
  }

  // Visszaadja az adott azonosítójú felhasználói adatokat Firestore-ból
  getUserByEmail(email: string): Observable<User> {
    return this.firestore.collection('Users', ref => ref.where('email', '==', email)).snapshotChanges()
      .pipe(
        map((snapshots: any[]) => {
          if (snapshots.length === 0) {
            throw new Error('User not found');
          }
          const docSnapshot = snapshots[0];
          const doc = docSnapshot.payload.doc.data();
          return {
            email: doc.email,
            firstname: doc.firstname,
            id: docSnapshot.payload.doc.id,
            lastname: doc.lastname,
            phone: doc.phone,
          } as User;
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        }),
      );
  }

  // Visszaadja az összes felhasználói adatot Firestore-ból
  getAllUsers(): Observable<any>{
    return this.firestore.collection('Users').snapshotChanges();
  }

  deleteUser(userId: string): Observable<void> {
    return from(this.firestore.collection('Users').doc(userId).delete())
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        }),
      );
  }

  editUser(userId: string, user: Partial<User>): Observable<void> {
    return from(this.firestore.collection('Users').doc(userId).update(user))
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        }),
      );
  }

  updateUser(userId: string, data: any): Promise<void> {
    return this.firestore.collection('Users').doc(userId).update(data);
  }
}
