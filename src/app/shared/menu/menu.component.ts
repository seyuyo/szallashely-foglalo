import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import firebase from "firebase/compat";
import User = firebase.User;
import {user} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public afAuth: AngularFireAuth, private router: Router){}
  ngOnInit() {
  }

  logout() {
    this.afAuth.signOut();
    alert('Sikeresen kijelentkeztél!');
    this.router.navigate(['/home']);
  }
}
