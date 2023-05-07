import {Room} from "./Room";
import {Review} from "./Review";

export interface Hotel {
  hotelName: string;
  hotelCity: string;
  hotelAddress: string;
  hotelPhoneNumber: string;
  hotelEmail: string;
  hotelBio: string;
  pricePerNight: number;
}
