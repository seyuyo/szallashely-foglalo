import {Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {ReservationService} from '../../shared/services/reservation.service';
import {Observable} from "rxjs";

import {HotelService} from "../../shared/services/hotel.service";
import {Hotel} from "../../shared/models/Hotel";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {

  hotels$!: Observable<any[]>;
  showHotelList = false;
  reservationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      city: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      roomId: ['', Validators.required],
      fullPrice: ['', Validators.required],
      adult: [false]
    });
    this.hotels$ = this.hotelService.getAllHotels();
  }

  onSubmit() {}
  onReserve(hotel: Hotel) {
    this.hotelService.setSelectedHotel(hotel);
    this.router.navigate(['/rooms']).then(r => console.log(r));
  }
}
