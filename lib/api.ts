// API client for backend communication
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
  private halalRoutesUrl: string;
  private enableBackend: boolean;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
    this.halalRoutesUrl = process.env.NEXT_PUBLIC_HALAL_ROUTES_API || 'https://api.halalroutes.com';
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

  // API Methods
  async getSafetyZones(city: string, bounds?: { north: number; south: number; east: number; west: number }): Promise<ApiResponse<SafetyZone[]>> {
    const params = new URLSearchParams({ city });
    if (bounds) {
      params.append('bounds', JSON.stringify(bounds));
    }
    return this.request<SafetyZone[]>(`/safety-zones?${params}`);
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
    const params = new URLSearchParams({ city });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });
    return this.request<Place[]>(`/places?${params}`);
  }

  async getChatResponse(
    message: string,
    context?: {
      location?: { lat: number; lng: number };
      city?: string;
      userPreferences?: Partial<UserPreferences>;
    }
  ): Promise<ApiResponse<ChatMessage>> {
    return this.request<ChatMessage>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
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
    return this.request('/area-summary', {
      method: 'POST',
      body: JSON.stringify({ location, radius }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;