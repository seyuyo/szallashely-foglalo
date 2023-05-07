import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import firebase from "firebase/app";
import "firebase/auth";
import {AuthService} from "../../shared/services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {HotelService} from "../../shared/services/hotel.service";
import {Hotel} from "../../shared/models/Hotel";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  hotels: Hotel[] = [];
  city = 'Hévíz';
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router,
              private afAuth: AngularFireAuth, private hotelService: HotelService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl ('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getFirst3HotelsUnder10000InCity();
  }
  getFirst3HotelsUnder10000InCity(): void {
    this.hotelService
      .getFirst3HotelsUnder100000InCity(this.city)
      .subscribe((hotels) => {
        this.hotels = hotels;
      });
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((res) => {
        alert('Sikeres bejelentkezés!');
        console.log('Sikeres bejelentkezés!');
        this.router.navigate(['/home']).then(r => console.log('Sikeres navigáció'));
      }).catch((err) => {
        alert('Hiba a bejelentkezés során:' + err.message);
      console.log('Hiba a bejelentkezés során:', err.message);
      });
  }

  ngOnDestroy(): void {
  }
}
