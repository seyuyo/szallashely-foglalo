import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from '@angular/router';
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: boolean;


  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.loggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signup(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);

  }

}
