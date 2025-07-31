// API client for backend communication
import { halalRoutesApi, HalalPlace, SafetyData, ChatResponse } from './halalRoutesApi';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SafetyZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  safetyLevel: 'high' | 'medium' | 'low';
  lastUpdated: string;
  description: string;
  crimeStats?: {
    totalIncidents: number;
    lastMonth: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

export interface Place {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  type: string;
  isHalal?: boolean;
  safetyRating: number;
  budgetLevel: 'low' | 'medium' | 'high';
  accessibility: {
    wheelchairAccessible: boolean;
    hasElevator: boolean;
    hasAccessibleParking: boolean;
  };
  ratings: {
    overall: number;
    safety: number;
    cleanliness: number;
    accessibility: number;
  };
  images?: string[];
  description?: string;
  openingHours?: string[];
}

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: string;
  location?: { lat: number; lng: number };
  context?: {
    city: string;
    safetyLevel: string;
    timeOfDay: string;
  };
}

export interface UserPreferences {
  religiousNeeds: string[];
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  budgetRange: { min: number; max: number };
  safetyPriority: 'low' | 'medium' | 'high';
  transportPreferences: string[];
}

class ApiClient {
  private baseUrl: string;
  private enableBackend: boolean;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
    this.enableBackend = process.env.NEXT_PUBLIC_ENABLE_BACKEND_API === 'true';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Return mock data if backend is disabled
    if (!this.enableBackend) {
      return this.getMockResponse<T>(endpoint);
    }

    try {
      const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API request failed:', error);
      // Fallback to mock data on error
      return this.getMockResponse<T>(endpoint);
    }
  }

  // Convert HalalRoutes API data to SafeTrip format
  private convertHalalPlaceToPlace(halalPlace: HalalPlace): Place {
    return {
      id: halalPlace.id,
      name: halalPlace.name,
      location: halalPlace.location,
      type: halalPlace.type,
      isHalal: halalPlace.halalCertification?.certified || halalPlace.type === 'mosque',
      safetyRating: halalPlace.ratings.overall * 2, // Convert 5-scale to 10-scale
      budgetLevel: halalPlace.priceRange === 'budget' ? 'low' : 
                   halalPlace.priceRange === 'expensive' ? 'high' : 'medium',
      accessibility: {
        wheelchairAccessible: halalPlace.facilities.wheelchairAccessible,
        hasElevator: false, // Not tracked in HalalRoutes API
        hasAccessibleParking: halalPlace.facilities.parking
      },
      ratings: {
        overall: halalPlace.ratings.overall,
        safety: halalPlace.ratings.overall, // Use overall as safety proxy
        cleanliness: halalPlace.ratings.cleanliness,
        accessibility: halalPlace.ratings.accessibility
      },
      images: halalPlace.images,
      description: halalPlace.description,
      openingHours: halalPlace.openingHours ? 
        Object.values(halalPlace.openingHours) : undefined
    };
  }

  private convertSafetyDataToZones(safetyData: SafetyData[]): SafetyZone[] {
    return safetyData.map(data => ({
      id: data.areaId,
      name: `${data.areaId} Safety Zone`,
      center: data.location,
      radius: data.radius,
      safetyLevel: data.riskLevel === 'low' ? 'high' : 
                   data.riskLevel === 'high' ? 'low' : 'medium',
      lastUpdated: data.lastUpdated,
      description: data.recommendations.join('. '),
      crimeStats: {
        totalIncidents: data.factors.crime.recentIncidents,
        lastMonth: data.factors.crime.recentIncidents,
        trend: 'stable' as const // Default since not tracked
      }
    }));
  }

  private getMockResponse<T>(endpoint: string): ApiResponse<T> {
    // Return mock data based on endpoint
    if (endpoint.includes('/safety-zones')) {
      return {
        success: true,
        data: this.getMockSafetyZones() as T
      };
    }
    
    if (endpoint.includes('/places')) {
      return {
        success: true,
        data: this.getMockPlaces() as T
      };
    }

    if (endpoint.includes('/chat')) {
      return {
        success: true,
        data: this.getMockChatResponse() as T
      };
    }

    return {
      success: true,
      data: {} as T
    };
  }

  private getMockSafetyZones(): SafetyZone[] {
    return [
      {
        id: '1',
        name: 'Downtown Core - Financial District',
        center: { lat: 43.6532, lng: -79.3832 },
        radius: 500,
        safetyLevel: 'high',
        lastUpdated: new Date().toISOString(),
        description: 'Well-lit business district with good security presence',
        crimeStats: {
          totalIncidents: 12,
          lastMonth: 3,
          trend: 'decreasing'
        }
      },
      {
        id: '2',
        name: 'Kensington Market',
        center: { lat: 43.6549, lng: -79.4009 },
        radius: 400,
        safetyLevel: 'high',
        lastUpdated: new Date().toISOString(),
        description: 'Vibrant cultural area, busy during day, well-patrolled',
        crimeStats: {
          totalIncidents: 8,
          lastMonth: 2,
          trend: 'stable'
        }
      },
      {
        id: '3',
        name: 'Entertainment District',
        center: { lat: 43.6443, lng: -79.3892 },
        radius: 600,
        safetyLevel: 'medium',
        lastUpdated: new Date().toISOString(),
        description: 'Active nightlife area, exercise caution late at night',
        crimeStats: {
          totalIncidents: 25,
          lastMonth: 8,
          trend: 'increasing'
        }
      }
    ];
  }

  private getMockPlaces(): Place[] {
    return [
      {
        id: '1',
        name: 'Al-Madina Halal Restaurant',
        location: { lat: 43.6549, lng: -79.4009 },
        type: 'restaurant',
        isHalal: true,
        safetyRating: 9.2,
        budgetLevel: 'medium',
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: false,
          hasAccessibleParking: true
        },
        ratings: {
          overall: 4.5,
          safety: 4.8,
          cleanliness: 4.3,
          accessibility: 4.0
        },
        description: 'Authentic Middle Eastern cuisine with halal certification',
        openingHours: ['11:00 AM - 10:00 PM']
      },
      {
        id: '2',
        name: 'Masjid Toronto',
        location: { lat: 43.6562, lng: -79.4183 },
        type: 'mosque',
        safetyRating: 9.8,
        budgetLevel: 'low',
        accessibility: {
          wheelchairAccessible: true,
          hasElevator: true,
          hasAccessibleParking: true
        },
        ratings: {
          overall: 4.9,
          safety: 5.0,
          cleanliness: 4.8,
          accessibility: 4.7
        },
        description: 'Main community mosque with prayer facilities and parking',
        openingHours: ['5:00 AM - 11:00 PM']
      }
    ];
  }

  private getMockChatResponse(): ChatMessage {
    return {
      id: Date.now().toString(),
      message: '',
      response: 'Hello! I\'m your SafeTrip AI assistant. I can help you find safe places to visit, halal restaurants, prayer times, and provide real-time safety information for your current location. How can I assist you today?',
      timestamp: new Date().toISOString(),
      context: {
        city: 'Toronto',
        safetyLevel: 'high',
        timeOfDay: new Date().getHours() < 18 ? 'day' : 'night'
      }
    };
  }

  // API Methods with HalalRoutes integration
  async getSafetyZones(city: string, bounds?: { north: number; south: number; east: number; west: number }): Promise<ApiResponse<SafetyZone[]>> {
    if (this.enableBackend) {
      try {
        // Get center point from bounds or use city default
        const center = bounds ? {
          lat: (bounds.north + bounds.south) / 2,
          lng: (bounds.east + bounds.west) / 2
        } : { lat: 43.6532, lng: -79.3832 }; // Toronto default

        const safetyData = await halalRoutesApi.getSafetyData(center, 5000);
        const safetyZones = this.convertSafetyDataToZones(safetyData);
        return { success: true, data: safetyZones };
      } catch (error) {
        console.error('Failed to get safety zones from HalalRoutes API:', error);
      }
    }
    
    return this.getMockResponse<SafetyZone[]>('/safety-zones');
  }

  async getPlaces(
    city: string,
    filters: {
      type?: string;
      isHalal?: boolean;
      safetyRating?: number;
      budgetLevel?: string;
      accessibility?: boolean;
    } = {}
  ): Promise<ApiResponse<Place[]>> {
    if (this.enableBackend) {
      try {
        // Get city center for search
        const center = { lat: 43.6532, lng: -79.3832 }; // Toronto default
        
        const halalPlaces = await halalRoutesApi.searchPlaces({
          location: center,
          radius: 10000,
          type: filters.type,
          halalOnly: filters.isHalal,
          priceRange: filters.budgetLevel === 'low' ? 'budget' : 
                     filters.budgetLevel === 'high' ? 'expensive' : 'moderate'
        });

        const places = halalPlaces.map(place => this.convertHalalPlaceToPlace(place));
        return { success: true, data: places };
      } catch (error) {
        console.error('Failed to get places from HalalRoutes API:', error);
      }
    }
    
    return this.getMockResponse<Place[]>('/places');
  }

  async getChatResponse(
    message: string,
    context?: {
      location?: { lat: number; lng: number };
      city?: string;
      userPreferences?: Partial<UserPreferences>;
    }
  ): Promise<ApiResponse<ChatMessage>> {
    if (this.enableBackend) {
      try {
        const chatContext = {
          location: context?.location,
          city: context?.city,
          userPreferences: {
            halal: context?.userPreferences?.religiousNeeds?.includes('halal') || false,
            budget: context?.userPreferences?.budgetRange ? 
              (context.userPreferences.budgetRange.max < 50 ? 'low' : 
               context.userPreferences.budgetRange.max > 150 ? 'high' : 'medium') : 'medium',
            accessibility: context?.userPreferences?.accessibilityNeeds?.length > 0 || false,
            travelStyle: 'solo' as const // Default for now
          }
        };

        const response = await halalRoutesApi.chatWithAI(message, chatContext);
        
        const chatMessage: ChatMessage = {
          id: Date.now().toString(),
          message,
          response: response.response,
          timestamp: new Date().toISOString(),
          location: context?.location,
          context: {
            city: context?.city || 'Unknown',
            safetyLevel: 'high', // Default for now
            timeOfDay: new Date().getHours() < 18 ? 'day' : 'night'
          }
        };

        return { success: true, data: chatMessage };
      } catch (error) {
        console.error('Failed to get chat response from HalalRoutes API:', error);
      }
    }
    
    return this.getMockResponse<ChatMessage>('/chat');
  }

  async getUserPreferences(userId: string): Promise<ApiResponse<UserPreferences>> {
    return this.request<UserPreferences>(`/users/${userId}/preferences`);
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<ApiResponse<UserPreferences>> {
    return this.request<UserPreferences>(`/users/${userId}/preferences`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async getAreaSummary(location: { lat: number; lng: number }, radius: number = 500): Promise<ApiResponse<{
    name: string;
    safetyScore: number;
    highlights: string[];
    warnings: string[];
    recommendedFor: string[];
    nearbyAmenities: {
      halal_restaurants: number;
      mosques: number;
      accessible_venues: number;
      budget_options: number;
    };
  }>> {
    if (this.enableBackend) {
      try {
        // Get safety data and places for the area
        const [safetyData, places] = await Promise.all([
          halalRoutesApi.getSafetyData(location, radius),
          halalRoutesApi.searchPlaces({ location, radius })
        ]);

        const safety = safetyData[0]; // Get first safety zone
        const halalRestaurants = places.filter(p => p.type === 'restaurant').length;
        const mosques = places.filter(p => p.type === 'mosque').length;
        const accessibleVenues = places.filter(p => p.facilities.wheelchairAccessible).length;
        const budgetOptions = places.filter(p => p.priceRange === 'budget').length;

        const areaSummary = {
          name: `Area near ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
          safetyScore: safety ? safety.safetyScore : 7.5,
          highlights: safety ? safety.recommendations : [
            'Well-lit streets with good visibility',
            'Active community presence during day',
            'Multiple dining options available'
          ],
          warnings: safety && safety.riskLevel !== 'low' ? [
            'Exercise normal precautions after dark',
            'Keep valuables secure in crowded areas'
          ] : [],
          recommendedFor: [
            'Solo travelers during day',
            'Families with children',
            'Budget-conscious visitors'
          ],
          nearbyAmenities: {
            halal_restaurants: halalRestaurants,
            mosques: mosques,
            accessible_venues: accessibleVenues,
            budget_options: budgetOptions
          }
        };

        return { success: true, data: areaSummary };
      } catch (error) {
        console.error('Failed to get area summary from HalalRoutes API:', error);
      }
    }

    // Fallback to mock data
    return this.request('/area-summary', {
      method: 'POST',
      body: JSON.stringify({ location, radius }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;