/**
 * Adatátvitel a komponensek között: Az adatok átvitele a komponensek között az @Input és @Output
 * dekorátorok használatával történik.
 *
 * Például, ha az aboutUs.component.ts komponensnek adatokat kell kapnia a home.component.ts-től,
 * akkor az aboutUs.component.ts-ben a következőképpen kell megadnunk a @Input dekorátort:
 * */


import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-aboutUs',
  templateUrl: './aboutUs.component.html',
  styleUrls: ['./aboutUs.component.css']
})
export class AboutUsComponent {

  @Input() items: any['macskák'] | undefined;

}

/**
 * Ezután a home.component.html fájlban megadhatjuk az about komponens használatát,
 * és az @Input dekorátorral átadhatjuk az adatokat:
 * */
