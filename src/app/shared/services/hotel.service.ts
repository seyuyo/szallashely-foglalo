import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Hotel } from "../models/Hotel";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private selectedHotel!: Hotel;

  setSelectedHotel(hotel: Hotel): void {
    this.selectedHotel = hotel;
  }

  getSelectedHotel(): Hotel {
    return this.selectedHotel;
  }

  collectionHotel = 'Hotels';
  constructor(private firestore: AngularFirestore) { }

  create (hotel: Hotel): Promise<any> {
    return this.firestore.collection(this.collectionHotel).add(hotel);
  }

  // Visszaadja az adott azonosítójú szálloda adatait Firestore-ból

  getAllHotels(): Observable<any> {
    return this.firestore.collection('Hotels').valueChanges();
  }

  deleteHotel(hotelId: string): Promise<void> {
    return this.firestore.collection('Hotels').doc(hotelId).delete();
  }

  getFirst3HotelsUnder100000InCity(city: string): Observable<Hotel[]> {
    return this.firestore
      .collection<Hotel>('Hotels', (ref) =>
        ref
          .where('hotelCity', '==', city)
          .where('pricePerNight', '<', 50000)
          .limit(3)
      )
      .valueChanges();
  }
}
