// TypeScript type definitions for Family Hub

// ============== Itinerary Types ==============
export interface ItineraryEvent {
  time: string;
  endTime?: string;
  title: string;
  icon: EventIcon;
  category: EventCategory;
  description?: string;
  important?: boolean;
  tips?: string[];
  adultNotes?: string[];
  kidFocus?: string;
  reservationCode?: string;
  mapUrl?: string;
  warning?: string;
  backup?: BackupPlan;
  mapUrls?: { name: string; url: string }[];
}

export interface BackupPlan {
  condition: string;
  plan: string;
}

export type EventIcon =
  | 'plane' | 'train' | 'bus' | 'car' | 'taxi' | 'ship' | 'walk'
  | 'hotel' | 'food' | 'ticket' | 'museum' | 'park' | 'shopping'
  | 'bath' | 'camera' | 'fireworks' | 'shrine' | 'star' | 'warning'
  | 'luggage' | 'clock' | 'phone' | 'gift';

export type EventCategory =
  | 'transport' | 'attraction' | 'food' | 'hotel' | 'shopping' | 'task' | 'free';

export interface ItineraryDay {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  label: string;
  title: string;
  emoji: string;
  location: string;
  hotel: string;
  phase: string;
  meetup?: string;
  events: ItineraryEvent[];
}

export interface ItineraryData {
  tripStart: string;
  tripEnd: string;
  days: ItineraryDay[];
}

// ============== Hotel Types ==============
export interface HotelAddress {
  ja: string;
  en: string;
}

export interface HotelReservation {
  date: string;
  orderId: string | null;
  chargeDate: string | null;
  note: string | null;
}

export interface Hotel {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  emoji: string;
  subtitle: string;
  days: number[];
  dates: string[];
  address: HotelAddress;
  phone: string | null;
  mapUrl: string;
  roomType: string;
  roomDetail: string;
  checkIn: string;
  checkOut: string;
  reservations: HotelReservation[];
  tips: string[];
}

// ============== Ticket Types ==============
export type TicketStatus = 'confirmed' | 'pending' | 'action-required';
export type TicketCategory = 'transport' | 'attraction';

export interface Ticket {
  id: string;
  name: string;
  category: TicketCategory;
  status: TicketStatus;
  emoji: string;
  useDays: number[];
  dates: string[];
  details: Record<string, string | null>;
  pickupInstructions: string[];
  ticketImage: string | null;
  important: boolean;
  warning: string | null;
  mapUrl?: string;
}

// ============== Packing Types ==============
export interface PackingItem {
  id: string;
  text: string;
  critical?: boolean;
}

export interface PackingCategory {
  id: string;
  name: string;
  emoji: string;
  items: PackingItem[];
}

export interface PackingData {
  categories: PackingCategory[];
}

// ============== Member Types ==============
export interface Member {
  id: string;
  name: string;
  emoji: string;
  age?: number;
  height?: number | null;
  role?: string;
  note?: string;
}

// ============== Emergency Types ==============
export interface EmergencyContact {
  name: string;
  number: string;
  emoji: string;
  emergencyNumber?: string;
  note?: string;
}

export interface InsuranceInfo {
  name: string;
  type: string;
  coverage: string;
  note: string;
  emoji: string;
}

export interface EmergencyData {
  police: EmergencyContact;
  ambulance: EmergencyContact;
  embassy: EmergencyContact;
  insurance: InsuranceInfo[];
  hotels: { name: string; phone: string | null; emoji: string }[];
}

// ============== Weather Types ==============
export interface WeatherData {
  location: string;
  temperature: number;
  weatherCode: number;
  description: string;
  icon: string;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  daily: DailyForecast[];
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  description: string;
  icon: string;
  precipitationProbability: number;
}

// ============== App State Types ==============
export interface PackingState {
  checkedItems: Record<string, boolean>;
  toggleItem: (itemId: string) => void;
  resetAll: () => void;
  getProgress: (categoryId: string, items: PackingItem[]) => { checked: number; total: number };
  getTotalProgress: (categories: PackingCategory[]) => { checked: number; total: number };
}
