import {Component, OnInit} from '@angular/core';

import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ReservationService} from "../../shared/services/reservation.service";
import {Observable} from "rxjs";
import {Reserve} from "../../shared/models/Reserve";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


  user!: User;
  reservations$!: Observable<Reserve[]>;
  reservations: Reserve[] = [];


  constructor(private userService: UserService, private afAuth: AngularFireAuth,
              private reservationService: ReservationService, private firestore: AngularFirestore,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        const userEmail = user.email!;

        this.userService.getUserByEmail(userEmail).subscribe(
          (userData: User) => {
            if (userData) {
              this.user = userData;
            } else {
              console.error('User data is null or undefined');
            }
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );

        this.firestore.collection('Users').doc(userId).get().toPromise().then((doc:any) => {
          if (doc?.exists) {
            this.user = {
              id: doc.id,
              lastname: doc.data().lastname || '',
              firstname: doc.data().firstname || '',
              email: doc.data().email || '',
              phone: doc.data().phone || '',
              ...(doc.data() as Partial<User>)
            };
          }
        }).catch((error) => {
          console.error('Error getting user:', error);
        });

      } else {
        console.error('User is not logged in');
      }
    });

    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservations = reservations;
    });

  }

  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id).then(() => {
      this.reservations = this.reservations.filter(reserve => reserve.id !== id);
    });
    alert('A foglalás sikeresen törölve!');
  }

  editUser(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: {
        lastname: this.user.lastname,
        firstname: this.user.firstname,
        email: this.user.email,
        phone: this.user.phone
      }
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        this.user.lastname = result.lastname;
        this.user.firstname = result.firstname;
        this.user.email = result.email;
        this.user.phone = result.phone;

        // Mentse az új adatokat a Firestore adatbázisba.
        try {
          await this.userService.updateUser(this.user.id!, {
            lastname: this.user.lastname,
            firstname: this.user.firstname,
            email: this.user.email,
            phone: this.user.phone
          });
        } catch (error) {
          console.error('Error updating user: ', error);
        }
      }
    });
  }


  deleteUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;

        this.userService.deleteUser(userId).subscribe(
          () => {
            alert('A felhasználó sikeresen törlődött!');
            console.log('A felhasználó sikeresen törlődött!');
          },
          (error) => {
            alert('Hiba a törlés során!' + error);
            console.error('Hiba a törlés során:', error);
          }
        );
      } else {
        alert('A felhasználó nincs bejelentkezve!');
        console.error('A felhasználó nincs bejelentkezve!');
      }
    });
  }


  bgColor = 'pink';
  textColor = 'orange';
  isHovered = false;

  onMouseEnter(): void {
    this.isHovered = true;
  }

  onMouseLeave(): void {
    this.isHovered = false;
  }

  onMouseMove(event: MouseEvent): void {
    const x = event.clientX;
    const y = event.clientY;
    const red = x % 255;
    const green = y % 255;
    const blue = (x + y) % 255;
    this.bgColor = `rgb(${red}, ${green}, ${blue})`;
    this.textColor = `rgb(${255 - red}, ${255 - green}, ${255 - blue})`;
  }


}
