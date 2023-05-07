import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Room } from "../models/Room";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {HotelService} from "./hotel.service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  collectionRoom = 'Rooms';
  constructor(private hotelService: HotelService, private firestore: AngularFirestore) { }

  private selectedRoom!: Room;


  setSelectedRoom(room: Room): void {
    this.selectedRoom = room;
  }

  getSelectedRoom(): Room {
    return this.selectedRoom;
  }

  create(room: Room): Promise<any> {
    return this.firestore.collection(this.collectionRoom).add(room);
  }

  getAllRooms(): Observable<any> {
    return this.firestore.collection('Rooms').valueChanges();
  }

  deleteRoom(roomId: string): Promise<void> {
    return this.firestore.collection('Rooms').doc(roomId).delete();
  }

  updateRoom(roomId: string, room: Room): Promise<void> {
    return this.firestore.collection('Rooms').doc(roomId).update(room);
  }


}
