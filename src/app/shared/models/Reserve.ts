import {Hotel} from "./Hotel";
import {Room} from "./Room";

export interface Reserve {
  id?: any;
  hotelName: string;
  city: string;
  checkIn: string;
  checkOut: string;
  roomId: number;
  fullPrice: number;
  hotel: Hotel;
  room: Room;
}
