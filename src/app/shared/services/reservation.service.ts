import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Reserve } from '../models/Reserve';
import firebase from "firebase/compat";
import firestore = firebase.firestore;
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private firestore: AngularFirestore) { }

  createReservation(reservation: Reserve): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('Reserves').doc(id).set({ ...reservation, id });
  }

  getReservations(): Observable<Reserve[]> {
    return this.firestore.collection<Reserve>('Reserves').valueChanges({ idField: 'id' });
  }

  getReservationById(id: string): Observable<Reserve | undefined> {
    return this.firestore.collection('Reserves').doc<Reserve>(id).valueChanges();
  }

  updateReservation(id: string, reservation: Reserve): Promise<void> {
    return this.firestore.collection('Reserves').doc(id).update(reservation);
  }

  deleteReservation(id: string): Promise<void> {
      return this.firestore.collection<Reserve>('Reserves').doc(id).delete();
  }

  /*
  * Komplex lekérdezés Az alábbi lekérdezés az adott időintervallumban lévő foglalásokat listázza,
  *   legfeljebb 10 foglalást jelenítve a legújabb foglalásoktól a legrégebbiig.
  * */
  getReservationsBetweenDates(startDate: string, endDate: string): Observable<Reserve[]> {
    return this.firestore.collection<Reserve>('Reservations', ref =>
      ref
        .where('checkIn', '>=', startDate)
        .where('checkIn', '<=', endDate)
        .orderBy('checkIn', 'desc')
        .limit(10)
    ).valueChanges({ idField: 'id' });
  }

}
