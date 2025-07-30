// City configurations for Toronto and Tokyo
export const SUPPORTED_CITIES = {
  toronto: {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    center: { lat: 43.6532, lng: -79.3832 },
    bounds: {
      north: 43.8554,
      south: 43.5810,
      east: -79.1168,
      west: -79.6390,
    },
    timezone: 'America/Toronto',
    currency: 'CAD',
    defaultRadius: 10000, // 10km
    neighborhoods: [
      { name: 'Downtown', center: { lat: 43.6532, lng: -79.3832 }, safetyLevel: 'medium' },
      { name: 'Kensington Market', center: { lat: 43.6549, lng: -79.4009 }, safetyLevel: 'high' },
      { name: 'Little Italy', center: { lat: 43.6562, lng: -79.4183 }, safetyLevel: 'high' },
      { name: 'Chinatown', center: { lat: 43.6531, lng: -79.3973 }, safetyLevel: 'medium' },
      { name: 'Distillery District', center: { lat: 43.6503, lng: -79.3592 }, safetyLevel: 'high' },
      { name: 'Yorkville', center: { lat: 43.6722, lng: -79.3904 }, safetyLevel: 'high' },
    ],
    emergencyNumbers: {
      police: '911',
      medical: '911',
      fire: '911',
    },
    publicTransit: {
      name: 'TTC',
      website: 'https://ttc.ca',
      fareInfo: 'Adult fare: $3.35 CAD',
    },
  },
  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    center: { lat: 35.6762, lng: 139.6503 },
    bounds: {
      north: 35.8986,
      south: 35.4961,
      east: 139.9291,
      west: 139.2394,
    },
    timezone: 'Asia/Tokyo',
    currency: 'JPY',
    defaultRadius: 15000, // 15km
    neighborhoods: [
      { name: 'Shibuya', center: { lat: 35.6598, lng: 139.7006 }, safetyLevel: 'high' },
      { name: 'Shinjuku', center: { lat: 35.6896, lng: 139.6917 }, safetyLevel: 'medium' },
      { name: 'Asakusa', center: { lat: 35.7148, lng: 139.7967 }, safetyLevel: 'high' },
      { name: 'Ginza', center: { lat: 35.6762, lng: 139.7652 }, safetyLevel: 'high' },
      { name: 'Harajuku', center: { lat: 35.6702, lng: 139.7026 }, safetyLevel: 'high' },
      { name: 'Akihabara', center: { lat: 35.6983, lng: 139.7731 }, safetyLevel: 'high' },
    ],
    emergencyNumbers: {
      police: '110',
      medical: '119',
      fire: '119',
    },
    publicTransit: {
      name: 'JR/Tokyo Metro',
      website: 'https://www.tokyometro.jp/en/',
      fareInfo: 'Starting from ¥170 JPY',
    },
  },
} as const

export type CityId = keyof typeof SUPPORTED_CITIES
export type City = typeof SUPPORTED_CITIES[CityId]

// Map styles for different themes
export const MAP_STYLES = {
  default: [],
  dark: [
    { elementType: 'geometry', stylers: [{ color: '#212121' }] },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{ color: '#757575' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{ color: '#2c2c2c' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#000000' }],
    },
  ],
} as const

// Safety zone configurations
export const SAFETY_ZONES = {
  high: {
    color: '#10B981', // green
    opacity: 0.3,
    description: 'Very safe area with low crime rates and good lighting',
  },
  medium: {
    color: '#F59E0B', // yellow
    opacity: 0.3,
    description: 'Generally safe with normal precautions recommended',
  },
  low: {
    color: '#EF4444', // red
    opacity: 0.3,
    description: 'Exercise caution, especially at night',
  },
} as const

// Place type configurations
export const PLACE_TYPES = {
  mosque: {
    icon: '🕌',
    color: '#10B981',
    googleTypes: ['mosque', 'place_of_worship'],
    filters: ['halal_friendly'],
  },
  halal_restaurant: {
    icon: '🍽️',
    color: '#059669',
    googleTypes: ['restaurant', 'meal_takeaway'],
    filters: ['halal'],
  },
  family_friendly: {
    icon: '👨‍👩‍👧‍👦',
    color: '#3B82F6',
    googleTypes: ['park', 'amusement_park', 'zoo', 'aquarium'],
    filters: ['family'],
  },
  budget_friendly: {
    icon: '💰',
    color: '#8B5CF6',
    googleTypes: ['restaurant', 'tourist_attraction'],
    filters: ['budget'],
  },
  avoid_nightlife: {
    icon: '🚫',
    color: '#EF4444',
    googleTypes: ['night_club', 'bar'],
    filters: ['avoid'],
  },
} as const

export type PlaceType = keyof typeof PLACE_TYPES
