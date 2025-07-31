// HalalRoutes backend API integration
// This connects the SafeTrip frontend to the MelonCaully/halalRoutes backend

export interface HalalPlace {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    country?: string;
  };
  type: 'restaurant' | 'mosque' | 'halal_store' | 'accommodation' | 'tourist_attraction';
  halalCertification?: {
    certified: boolean;
    certifyingBody?: string;
    expiryDate?: string;
  };
  ratings: {
    overall: number;
    halal: number;
    service: number;
    cleanliness: number;
    accessibility: number;
  };
  priceRange: 'budget' | 'moderate' | 'expensive';
  facilities: {
    prayerRoom: boolean;
    wheelchairAccessible: boolean;
    familyFriendly: boolean;
    wifi: boolean;
    parking: boolean;
  };
  openingHours?: {
    [key: string]: string; // 'monday': '9:00-22:00'
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  images?: string[];
  description?: string;
  reviews?: {
    count: number;
    recent: Array<{
      rating: number;
      comment: string;
      author: string;
      date: string;
    }>;
  };
}

export interface SafetyData {
  areaId: string;
  location: { lat: number; lng: number };
  radius: number;
  safetyScore: number; // 0-10
  riskLevel: 'low' | 'medium' | 'high';
  factors: {
    crime: {
      level: 'low' | 'medium' | 'high';
      types: string[];
      recentIncidents: number;
    };
    lighting: 'poor' | 'adequate' | 'good';
    crowdLevel: 'low' | 'medium' | 'high';
    policePresence: boolean;
    transportAccess: 'poor' | 'good' | 'excellent';
  };
  recommendations: string[];
  lastUpdated: string;
}

export interface TravelRoute {
  id: string;
  name: string;
  description: string;
  waypoints: Array<{
    location: { lat: number; lng: number };
    name: string;
    type: string;
    estimatedTime: number; // minutes
  }>;
  totalDistance: number; // km
  totalTime: number; // minutes
  difficulty: 'easy' | 'moderate' | 'challenging';
  safetyRating: number;
  halalFriendly: boolean;
  tags: string[];
}

export interface AIChat {
  message: string;
  context?: {
    location?: { lat: number; lng: number };
    city?: string;
    userPreferences?: {
      halal: boolean;
      budget: 'low' | 'medium' | 'high';
      accessibility: boolean;
      travelStyle: 'solo' | 'family' | 'group';
    };
  };
}

export interface ChatResponse {
  response: string;
  suggestions: string[];
  relatedPlaces?: HalalPlace[];
  safetyAlerts?: string[];
  actionItems?: Array<{
    type: 'navigate' | 'save_place' | 'book' | 'contact';
    label: string;
    data: any;
  }>;
}

class HalalRoutesApiClient {
  private baseUrl: string;
  private apiKey: string;
  private enableBackend: boolean;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_HALAL_ROUTES_API || 'https://api.halalroutes.com';
    this.apiKey = process.env.NEXT_PUBLIC_HALAL_ROUTES_API_KEY || '';
    this.enableBackend = process.env.NEXT_PUBLIC_ENABLE_BACKEND_API === 'true';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.enableBackend) {
      return this.getMockData<T>(endpoint);
    }

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey ? `Bearer ${this.apiKey}` : '',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('HalalRoutes API error:', error);
      // Fallback to mock data
      return this.getMockData<T>(endpoint);
    }
  }

  private getMockData<T>(endpoint: string): T {
    // Return mock data based on endpoint
    if (endpoint.includes('/places')) {
      return this.getMockPlaces() as T;
    }
    
    if (endpoint.includes('/safety')) {
      return this.getMockSafetyData() as T;
    }

    if (endpoint.includes('/routes')) {
      return this.getMockRoutes() as T;
    }

    if (endpoint.includes('/chat')) {
      return this.getMockChatResponse() as T;
    }

    return {} as T;
  }

  private getMockPlaces(): HalalPlace[] {
    return [
      {
        id: 'halal-1',
        name: 'Al-Madina Halal Restaurant',
        location: {
          lat: 43.6549,
          lng: -79.4009,
          address: '1234 Dundas St W, Toronto, ON',
          city: 'Toronto',
          country: 'Canada'
        },
        type: 'restaurant',
        halalCertification: {
          certified: true,
          certifyingBody: 'ISNA Canada',
          expiryDate: '2025-12-31'
        },
        ratings: {
          overall: 4.5,
          halal: 5.0,
          service: 4.2,
          cleanliness: 4.3,
          accessibility: 4.0
        },
        priceRange: 'moderate',
        facilities: {
          prayerRoom: true,
          wheelchairAccessible: true,
          familyFriendly: true,
          wifi: true,
          parking: true
        },
        openingHours: {
          'monday': '11:00-22:00',
          'tuesday': '11:00-22:00',
          'wednesday': '11:00-22:00',
          'thursday': '11:00-22:00',
          'friday': '11:00-23:00',
          'saturday': '11:00-23:00',
          'sunday': '12:00-21:00'
        },
        contact: {
          phone: '+1-416-555-0123',
          email: 'info@almadinahalal.com',
          website: 'https://almadinahalal.com'
        },
        description: 'Authentic Middle Eastern cuisine with full halal certification and prayer facilities.',
        reviews: {
          count: 234,
          recent: [
            {
              rating: 5,
              comment: 'Excellent halal food and great service!',
              author: 'Ahmed K.',
              date: '2024-01-15'
            }
          ]
        }
      },
      {
        id: 'mosque-1',
        name: 'Toronto Islamic Centre',
        location: {
          lat: 43.6562,
          lng: -79.4183,
          address: '5678 College St, Toronto, ON',
          city: 'Toronto',
          country: 'Canada'
        },
        type: 'mosque',
        ratings: {
          overall: 4.8,
          halal: 5.0,
          service: 4.7,
          cleanliness: 4.9,
          accessibility: 4.5
        },
        priceRange: 'budget',
        facilities: {
          prayerRoom: true,
          wheelchairAccessible: true,
          familyFriendly: true,
          wifi: true,
          parking: true
        },
        openingHours: {
          'monday': '05:00-23:00',
          'tuesday': '05:00-23:00',
          'wednesday': '05:00-23:00',
          'thursday': '05:00-23:00',
          'friday': '05:00-23:30',
          'saturday': '05:00-23:00',
          'sunday': '05:00-23:00'
        },
        description: 'Main community mosque with prayer facilities, community programs, and Islamic education.',
        reviews: {
          count: 156,
          recent: [
            {
              rating: 5,
              comment: 'Beautiful mosque with excellent facilities',
              author: 'Fatima S.',
              date: '2024-01-10'
            }
          ]
        }
      }
    ];
  }

  private getMockSafetyData(): SafetyData[] {
    return [
      {
        areaId: 'toronto-downtown',
        location: { lat: 43.6532, lng: -79.3832 },
        radius: 500,
        safetyScore: 8.2,
        riskLevel: 'low',
        factors: {
          crime: {
            level: 'low',
            types: ['petty theft', 'pickpocketing'],
            recentIncidents: 3
          },
          lighting: 'good',
          crowdLevel: 'high',
          policePresence: true,
          transportAccess: 'excellent'
        },
        recommendations: [
          'Well-lit area with good foot traffic',
          'Excellent public transportation access',
          'Police station nearby at Bay & College'
        ],
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  private getMockRoutes(): TravelRoute[] {
    return [
      {
        id: 'toronto-halal-tour',
        name: 'Toronto Halal Food & Culture Tour',
        description: 'A curated route through Toronto\'s best halal restaurants and Islamic cultural sites',
        waypoints: [
          {
            location: { lat: 43.6549, lng: -79.4009 },
            name: 'Kensington Market - Halal Food Court',
            type: 'restaurant',
            estimatedTime: 60
          },
          {
            location: { lat: 43.6562, lng: -79.4183 },
            name: 'Toronto Islamic Centre',
            type: 'mosque',
            estimatedTime: 30
          },
          {
            location: { lat: 43.6532, lng: -79.3832 },
            name: 'Halal Guys Downtown',
            type: 'restaurant',
            estimatedTime: 45
          }
        ],
        totalDistance: 5.2,
        totalTime: 135,
        difficulty: 'easy',
        safetyRating: 9.1,
        halalFriendly: true,
        tags: ['halal', 'cultural', 'food', 'family-friendly']
      }
    ];
  }

  private getMockChatResponse(): ChatResponse {
    return {
      response: "I'd be happy to help you find halal options in Toronto! Based on your location, I can recommend several excellent halal restaurants nearby. Would you like me to show you the closest options or do you have a specific cuisine preference?",
      suggestions: [
        "Show me nearby halal restaurants",
        "Find the nearest mosque",
        "What are the safest routes to walk?",
        "Recommend family-friendly halal places"
      ],
      relatedPlaces: this.getMockPlaces().slice(0, 2),
      safetyAlerts: [
        "Current area has high safety rating (8.2/10)",
        "Well-lit streets with good foot traffic"
      ],
      actionItems: [
        {
          type: 'navigate',
          label: 'Get directions to Al-Madina Restaurant',
          data: { placeId: 'halal-1' }
        }
      ]
    };
  }

  // API Methods
  async searchPlaces(params: {
    location: { lat: number; lng: number };
    radius?: number;
    type?: string;
    halalOnly?: boolean;
    priceRange?: string;
    facilities?: string[];
  }): Promise<HalalPlace[]> {
    const queryParams = new URLSearchParams({
      lat: params.location.lat.toString(),
      lng: params.location.lng.toString(),
      radius: (params.radius || 5000).toString(),
      ...(params.type && { type: params.type }),
      ...(params.halalOnly && { halal: 'true' }),
      ...(params.priceRange && { price: params.priceRange }),
    });

    return this.request<HalalPlace[]>(`/places/search?${queryParams}`);
  }

  async getPlaceDetails(placeId: string): Promise<HalalPlace> {
    return this.request<HalalPlace>(`/places/${placeId}`);
  }

  async getSafetyData(location: { lat: number; lng: number }, radius: number = 1000): Promise<SafetyData[]> {
    return this.request<SafetyData[]>(`/safety/area?lat=${location.lat}&lng=${location.lng}&radius=${radius}`);
  }

  async getRoutes(params: {
    start: { lat: number; lng: number };
    end?: { lat: number; lng: number };
    type?: 'halal' | 'cultural' | 'safe' | 'budget';
    maxDistance?: number;
  }): Promise<TravelRoute[]> {
    const queryParams = new URLSearchParams({
      startLat: params.start.lat.toString(),
      startLng: params.start.lng.toString(),
      ...(params.end && { 
        endLat: params.end.lat.toString(),
        endLng: params.end.lng.toString()
      }),
      ...(params.type && { type: params.type }),
      ...(params.maxDistance && { maxDistance: params.maxDistance.toString() }),
    });

    return this.request<TravelRoute[]>(`/routes/search?${queryParams}`);
  }

  async chatWithAI(message: string, context?: AIChat['context']): Promise<ChatResponse> {
    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  async reportSafetyIncident(incident: {
    location: { lat: number; lng: number };
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }): Promise<{ success: boolean; id: string }> {
    return this.request<{ success: boolean; id: string }>('/safety/report', {
      method: 'POST',
      body: JSON.stringify(incident),
    });
  }

  async getUserRecommendations(userId: string, preferences: {
    location: { lat: number; lng: number };
    travelStyle: string;
    budget: string;
    interests: string[];
  }): Promise<{
    places: HalalPlace[];
    routes: TravelRoute[];
    safetyTips: string[];
  }> {
    return this.request(`/users/${userId}/recommendations`, {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  }
}

// Export singleton instance
export const halalRoutesApi = new HalalRoutesApiClient();
export default halalRoutesApi;