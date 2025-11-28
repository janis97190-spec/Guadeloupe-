export interface Villa {
  id: string;
  name: string;
  location: string; // e.g., "Saint-François, Grande-Terre"
  price: number; // Price per night
  rating: number;
  reviews: number;
  bedrooms: number;
  guests: number;
  image: string;
  description: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BookingForm {
  name: string;
  email: string;
  dates: string;
  guests: number;
}
