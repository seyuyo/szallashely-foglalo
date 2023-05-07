import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Reserve } from "../../shared/models/Reserve";
import {RoomService} from "../../shared/services/room.service";
import {HotelService} from "../../shared/services/hotel.service";
import {ReservationService} from "../../shared/services/reservation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit, OnDestroy{

  reserve!: Reserve;
  reservations: Reserve[] = [];
  private reservationsSub!: Subscription;

  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private router: Router,
  ){}

  ngOnInit(): void {
    const selectedHotel = this.hotelService.getSelectedHotel();
    const selectedRoom = this.roomService.getSelectedRoom();
    const city = 'Budapest';

    //komplex lekérdezéshez
    const startDate = '2023-01-01.';
    const endDate = '2023-09-31';


    if (selectedHotel && selectedRoom) {
      this.reserve = {
        hotel: selectedHotel,
        room: selectedRoom,
        hotelName: selectedHotel.hotelName,
        city: selectedHotel.hotelCity,
        checkIn: new Date().toLocaleDateString(), // Ideiglenesen állítsd be a mai dátumra, majd később módosítsd a tényleges check-in dátumra
        checkOut: new Date().toLocaleDateString(), // Ideiglenesen állítsd be a mai dátumra, majd később módosítsd a tényleges check-out dátumra
        roomId: selectedRoom.roomNumber,
        fullPrice: parseInt(selectedRoom.roomPrice) // Ideiglenesen használd a szoba árát, majd később módosítsd a teljes árra
      };
    }

    this.reservationService.getReservationsBetweenDates(startDate, endDate).subscribe(reservations => {
      this.reservations = reservations;
      console.log('Reservations: ', this.reservations);
    });

    this.reservationsSub = this.reservationService.getReservationsBetweenDates(startDate, endDate).subscribe(reservations => {
      this.reservations = reservations;
      console.log('Reservations: ', this.reservations);
    });

  }

  onConfirm(): void {
    if (this.reserve) {
      this.reservationService.createReservation(this.reserve)
        .then(() => {
          alert('Foglalás sikeresen mentve');
          console.log('Foglalás sikeresen mentve');
          this.router.navigate(['/profile']).then(r => console.log(r));
        })
        .catch((error) => {
          alert('Hiba a foglalás mentése során' + error);
          console.error('Hiba a foglalás mentése során:', error);
        });
    }
  }

  ngOnDestroy(): void {
    this.reservationsSub.unsubscribe();
  }
}
