export interface Review {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;
  review: number;
  reviewer: string;
  reviewerEmail: string;
  comment: string;
  date: Date;
}
