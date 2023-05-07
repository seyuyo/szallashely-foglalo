import { Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {RoomService} from "../../shared/services/room.service";
import {Router} from "@angular/router";
import {Room} from "../../shared/models/Room";
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  rooms$!: Observable<any[]>;

  imageList =
    ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.rooms$ = this.roomService.getAllRooms();
  }

  onSelectRoom(room: Room) {
    this.roomService.setSelectedRoom(room);
    this.router.navigate(['/reserve']);
  }

}
