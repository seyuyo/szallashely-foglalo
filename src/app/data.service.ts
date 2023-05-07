/**
 * Szolgáltatások: Az alkalmazás szolgáltatásait a src/app mappában található data.service.ts fájlban definiáljuk:
 * */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos')
  }

  getUsers() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  }
}

/**
 * Ez a szolgáltatás a HttpClient segítségével kommunikál a külső API-val,
 * amely adatokat szolgáltat az alkalmazás számára.*/

