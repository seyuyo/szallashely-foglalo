/**
 * Routing: Az alkalmazás routingját a src/app/app-routing.module.ts fájlban definiáljuk:
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {HotelsComponent} from "./pages/hotels/hotels.component";
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ReserveComponent} from "./pages/reserve/reserve.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";

// *1.
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'reserve', component: ReserveComponent},
  { path: 'edit-profile', component: EditProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/**
 * Ez a routing modul az alkalmazás főbb útvonalait tartalmazza.
 * *1: A const routes mezőben az egyes útvonalakat definiáljuk, és megadjuk a hozzájuk tartozó komponenseket.
 * Az AppRoutingModule modult az imports mezőben kell importálni az AppModule-ban.*/
