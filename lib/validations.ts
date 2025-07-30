// User preferences types for frontend-only app
export interface UserPreferences {
  id?: string;
  userId: string;
  religion?: 'muslim' | 'christian' | 'jewish' | 'hindu' | 'buddhist' | 'none' | 'other';
  dietaryRestrictions: ('halal' | 'kosher' | 'vegetarian' | 'vegan' | 'gluten-free' | 'none')[];
  budget: 'low' | 'medium' | 'high';
  travelStyle: 'solo' | 'couple' | 'family' | 'group';
  mobilityNeeds: ('wheelchair' | 'limited-mobility' | 'none')[];
  safetyLevel: 'low' | 'medium' | 'high';
  avoidAreas: ('bars' | 'nightlife' | 'red-light' | 'high-crime' | 'crowded' | 'none')[];
  preferredActivities: ('cultural' | 'religious' | 'food' | 'shopping' | 'nature' | 'museums' | 'family-friendly')[];
  maxWalkingDistance: number; // in km
  languagePreference: 'english' | 'french' | 'japanese' | 'arabic' | 'spanish';
}

// Signup form types
export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Login form types
export interface LoginForm {
  email: string;
  password: string;
}

// Place search types
export interface PlaceSearch {
  query: string;
  location: {
    lat: number;
    lng: number;
  };
  radius: number; // in meters
  type?: 'restaurant' | 'mosque' | 'attraction' | 'accommodation' | 'transport';
}

// Chat message types
export interface ChatMessage {
  message: string;
  context?: {
    currentLocation?: {
      lat: number;
      lng: number;
      city: string;
    };
    userPreferences?: UserPreferences;
  };
}

// Validation functions for frontend-only app
export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email address';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export function validateSignup(data: SignupForm): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }
  
  return errors;
}
