/**
 * Modulok: Az alkalmazás moduljait a app.module.ts fájlban definiáljuk, amely a következőképpen néz ki:
 * */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './shared/menu/menu.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutUsComponent} from './pages/aboutUs/aboutUs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HotelsComponent} from './pages/hotels/hotels.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from "@angular/material/list";
import {RoomsComponent} from './pages/rooms/rooms.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatNativeDateModule} from "@angular/material/core";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {FirebaseService} from "./shared/services/firebase.service";
import { ProfileComponent } from './pages/profile/profile.component';
import {MatTableModule} from "@angular/material/table";
import { ReserveComponent } from './pages/reserve/reserve.component';
import {CapitalizeFirstPipe} from './pipes/capitalize-first-pipe.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';


@NgModule({
  // *1.
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    MenuComponent,
    LoginComponent,
    SignUpComponent,
    HotelsComponent,
    RoomsComponent,
    ProfileComponent,
    ReserveComponent,
    CapitalizeFirstPipe,
    EditProfileComponent
  ],
  // *1.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,  // TODO legalább 10 material komponenst használni
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    AngularFireModule,
    MatCheckboxModule,
    MatCardModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatTableModule,
    MatDialogModule

  ],
  entryComponents: [
    EditProfileComponent
  ],
  // *2.
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

/**@description
 * Ez az alkalmazás fő modulja, amely az összes alkalmazásszintű direktívát és komponenst tartalmazza.
 *
 * *1: A declarations mezőben felsoroljuk az összes komponenst, amelyeket ebben a modulban használni fogunk,
 *     és az imports mezőben azokat a modulokat, amelyekre az alkalmazásunknak szüksége van.
 *
 * *2: A providers mezőben az összes alkalmazásszintű szolgáltatást tartalmazzuk.
 *
 * */
