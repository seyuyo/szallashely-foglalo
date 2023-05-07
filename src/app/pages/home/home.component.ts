/**
 * Komponensek: Az alkalmazás komponensei a src/app mappában találhatók.
 * Itt van például a home.component.ts fájl tartalma:
 * */

/**
 * Lifecycle Hook-ok használata: A lifecycle hook-okat a komponensekben használjuk,
 * hogy az adott fázisban végrehajtsunk bizonyos műveleteket.
 *
 * Például, ha a home.component-ben el szeretnénk végezni valamilyen műveletet,
 * amikor a komponens létrejön, akkor a következőképpen kell megadnunk az OnInit hook-ot:
 * */

import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) {
  }

  ngOnInit() {

  }

  logout() {
    this.afAuth.signOut();
  }
}

/**
 * Ez a komponens az alkalmazás kezdőoldalát reprezentálja.
 * A selector mezőben megadjuk, hogy milyen néven hivatkozunk a komponensre a HTML-ben.
 * A templateUrl mezőben az HTML kódot, a styleUrls mezőben pedig a CSS kódot adjuk meg.
 * Az ngOnInit függvényben betöltjük az alkalmazás adatait a data.service szolgáltatással.
 * */

/**
 * Ez a kód az OnInit hook-ját használja, amely akkor hajtódik végre, amikor a HomeComponent létrejön.
 * Ebben a hook-ban betöltjük az adatokat a dataService-sel, és eltároljuk azokat az items mezőben.
 * */
