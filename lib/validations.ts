import { z } from 'zod'

// User preferences schema
export const UserPreferencesSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  religion: z.enum(['muslim', 'christian', 'jewish', 'hindu', 'buddhist', 'none', 'other']).optional(),
  dietaryRestrictions: z.array(z.enum(['halal', 'kosher', 'vegetarian', 'vegan', 'gluten-free', 'none'])).default([]),
  budget: z.enum(['low', 'medium', 'high']).default('medium'),
  travelStyle: z.enum(['solo', 'couple', 'family', 'group']).default('solo'),
  mobilityNeeds: z.array(z.enum(['wheelchair', 'limited-mobility', 'none'])).default([]),
  safetyLevel: z.enum(['low', 'medium', 'high']).default('medium'),
  avoidAreas: z.array(z.enum(['bars', 'nightlife', 'red-light', 'high-crime', 'crowded', 'none'])).default([]),
  preferredActivities: z.array(z.enum(['cultural', 'religious', 'food', 'shopping', 'nature', 'museums', 'family-friendly'])).default([]),
  maxWalkingDistance: z.number().min(0.1).max(10).default(2), // in km
  languagePreference: z.enum(['english', 'french', 'japanese', 'arabic', 'spanish']).default('english'),
})

// Signup form schema
export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Login form schema
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Place search schema
export const PlaceSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  radius: z.number().min(100).max(50000).default(5000), // in meters
  type: z.enum(['restaurant', 'mosque', 'attraction', 'accommodation', 'transport']).optional(),
})

// Chat message schema
export const ChatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
  context: z.object({
    currentLocation: z.object({
      lat: z.number(),
      lng: z.number(),
      city: z.string(),
    }).optional(),
    userPreferences: UserPreferencesSchema.optional(),
  }).optional(),
})

export type UserPreferences = z.infer<typeof UserPreferencesSchema>
export type SignupData = z.infer<typeof SignupSchema>
export type LoginData = z.infer<typeof LoginSchema>
export type PlaceSearch = z.infer<typeof PlaceSearchSchema>
export type ChatMessage = z.infer<typeof ChatMessageSchema>
