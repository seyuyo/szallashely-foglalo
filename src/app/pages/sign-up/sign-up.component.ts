import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import{Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { User } from "../../shared/models/User";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signupForm!: FormGroup;
  firebaseErr!: string;


  constructor(private authService: AuthService, private router : Router,
              private afAuth: AngularFireAuth, private firestore: AngularFirestore, private userService: UserService) {
    this.firebaseErr = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
       'lastName': new FormControl('', Validators.required),
       'firstName': new FormControl('', Validators.required),
       'phoneNumber': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl ('', [Validators.required])
    });
  }

  signup() {
    const { lastName, firstName, phoneNumber, email } = this.signupForm.value;
    this.authService.signup(this.signupForm.value)
      .then((userCredential) => {
        console.log('Sikeres regisztráció!');
        const user: User = {
          // Az "id" mezőt eltávolítjuk, mivel az Firestore automatikusan generál egy azonosítót
          lastname: lastName,
          firstname: firstName,
          phone: phoneNumber,
          email: email
        };
        // Hozzáadja a felhasználói adatokat az "User" gyűjteményhez a Firestore adatbázisban
        this.userService.create(user)
          .then((docRef) => {
            alert('Felhasználói adatok hozzáadva! Most átirányítjuk a kezdőlapra.');
            console.log('Felhasználói adatok hozzáadva:', docRef.id);
            this.router.navigate(['/home']).then(r => console.log('Sikeres navigáció'));
          })
          .catch((err) => {
            alert('Hiba a felhasználói adatok hozzáadása során:' + err)
            console.error('Hiba a felhasználói adatok hozzáadása során:', err);
          });
      })
      .catch((err) => {
        alert('Hiba a regisztráció során:' + err.message)
        console.log('Hiba a regisztráció során:', err.message);
      });
  }

}
