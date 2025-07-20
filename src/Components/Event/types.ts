// types.ts
export interface EventType {
  eventId: number;
  eventName: string;
  eventDate: string;
  category: string;
  description: string;
  ticketPrice: number;
  imageUrl: string;
  tag?: string;
  venueId: number;
}
