// SafeTrip Backend Integration Service
// This service manages all backend communications and provides fallbacks

import { halalRoutesApi } from './halalRoutesApi';
import { apiClient } from './api';

export interface BackendStatus {
  halalRoutesApi: 'connected' | 'error' | 'disabled';
  safetyApi: 'connected' | 'error' | 'disabled';
  googleMaps: 'connected' | 'error' | 'demo';
  aiChat: 'connected' | 'error' | 'mock';
}

export interface ServiceHealth {
  status: BackendStatus;
  lastChecked: string;
  errors: string[];
  capabilities: {
    realTimeData: boolean;
    aiChatbot: boolean;
    safetyZones: boolean;
    halalPlaces: boolean;
    routePlanning: boolean;
  };
}

class SafeTripBackendService {
  private healthStatus: ServiceHealth;

  constructor() {
    this.healthStatus = {
      status: {
        halalRoutesApi: 'disabled',
        safetyApi: 'disabled',
        googleMaps: 'demo',
        aiChat: 'mock'
      },
      lastChecked: new Date().toISOString(),
      errors: [],
      capabilities: {
        realTimeData: false,
        aiChatbot: true, // Always available via mock
        safetyZones: true, // Always available via mock
        halalPlaces: true, // Always available via mock
        routePlanning: false
      }
    };

    this.initializeServices();
  }

  private async initializeServices() {
    await this.performHealthCheck();
  }

  async performHealthCheck(): Promise<ServiceHealth> {
    const errors: string[] = [];
    const status: BackendStatus = { ...this.healthStatus.status };

    // Check HalalRoutes API
    try {
      if (process.env.NEXT_PUBLIC_ENABLE_BACKEND_API === 'true') {
        const testLocation = { lat: 43.6532, lng: -79.3832 };
        await halalRoutesApi.searchPlaces({ location: testLocation, radius: 1000 });
        status.halalRoutesApi = 'connected';
      } else {
        status.halalRoutesApi = 'disabled';
      }
    } catch (error) {
      status.halalRoutesApi = 'error';
      errors.push(`HalalRoutes API: ${error instanceof Error ? error.message : 'Connection failed'}`);
    }

    // Check Google Maps API
    const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!mapsApiKey || mapsApiKey === 'demo-key') {
      status.googleMaps = 'demo';
      errors.push('Google Maps: Using demo mode - limited functionality');
    } else {
      try {
        // Simple check if the API key format is valid
        if (mapsApiKey.startsWith('AIza') && mapsApiKey.length > 30) {
          status.googleMaps = 'connected';
        } else {
          status.googleMaps = 'error';
          errors.push('Google Maps: Invalid API key format');
        }
      } catch (error) {
        status.googleMaps = 'error';
        errors.push(`Google Maps: ${error instanceof Error ? error.message : 'Configuration error'}`);
      }
    }

    // Check Safety API (part of main backend)
    try {
      if (process.env.NEXT_PUBLIC_ENABLE_BACKEND_API === 'true') {
        await apiClient.getSafetyZones('toronto');
        status.safetyApi = 'connected';
      } else {
        status.safetyApi = 'disabled';
      }
    } catch (error) {
      status.safetyApi = 'error';
      errors.push(`Safety API: ${error instanceof Error ? error.message : 'Service unavailable'}`);
    }

    // AI Chat is always available via fallback
    status.aiChat = process.env.NEXT_PUBLIC_ENABLE_BACKEND_API === 'true' ? 'connected' : 'mock';

    // Update capabilities based on status
    const capabilities = {
      realTimeData: status.halalRoutesApi === 'connected' && status.safetyApi === 'connected',
      aiChatbot: true, // Always available
      safetyZones: true, // Always available via mock
      halalPlaces: true, // Always available via mock
      routePlanning: status.halalRoutesApi === 'connected'
    };

    this.healthStatus = {
      status,
      lastChecked: new Date().toISOString(),
      errors,
      capabilities
    };

    return this.healthStatus;
  }

  getHealthStatus(): ServiceHealth {
    return { ...this.healthStatus };
  }

  getServiceCapabilities() {
    return this.healthStatus.capabilities;
  }

  isFeatureAvailable(feature: keyof ServiceHealth['capabilities']): boolean {
    return this.healthStatus.capabilities[feature];
  }

  getRecommendedActions(): Array<{ action: string; priority: 'high' | 'medium' | 'low'; description: string }> {
    const actions = [];

    if (this.healthStatus.status.googleMaps === 'demo' || this.healthStatus.status.googleMaps === 'error') {
      actions.push({
        action: 'configure_google_maps',
        priority: 'high' as const,
        description: 'Set up Google Maps API key for full map functionality'
      });
    }

    if (this.healthStatus.status.halalRoutesApi === 'error') {
      actions.push({
        action: 'check_halal_routes_api',
        priority: 'medium' as const,
        description: 'Verify HalalRoutes API connection and credentials'
      });
    }

    if (!this.healthStatus.capabilities.realTimeData) {
      actions.push({
        action: 'enable_backend_api',
        priority: 'medium' as const,
        description: 'Enable backend API integration for real-time data'
      });
    }

    return actions;
  }

  // Service-specific methods
  async searchHalalPlaces(location: { lat: number; lng: number }, options: {
    radius?: number;
    type?: string;
    priceRange?: string;
  } = {}) {
    if (this.healthStatus.status.halalRoutesApi === 'connected') {
      return await halalRoutesApi.searchPlaces({
        location,
        radius: options.radius || 5000,
        type: options.type,
        priceRange: options.priceRange
      });
    }
    
    // Fallback to mock data
    console.warn('Using mock data for halal places - HalalRoutes API not available');
    const response = await apiClient.getPlaces('toronto', {
      type: options.type,
      isHalal: true,
      budgetLevel: options.priceRange
    });
    
    return response.data || [];
  }

  async getSafetyInformation(location: { lat: number; lng: number }, radius: number = 1000) {
    if (this.healthStatus.capabilities.realTimeData) {
      return await halalRoutesApi.getSafetyData(location, radius);
    }
    
    // Fallback to mock data
    console.warn('Using mock safety data - real-time safety API not available');
    const response = await apiClient.getSafetyZones('toronto');
    return response.data || [];
  }

  async chatWithAI(message: string, context?: any) {
    if (this.healthStatus.status.aiChat === 'connected') {
      return await halalRoutesApi.chatWithAI(message, context);
    }
    
    // Fallback to mock response
    console.warn('Using mock AI chat - backend AI service not available');
    const response = await apiClient.getChatResponse(message, context);
    return {
      response: response.data?.response || "I'm currently in demo mode. How can I help you explore safely?",
      suggestions: [
        "Find halal restaurants nearby",
        "Show me safe areas to visit",
        "What are the prayer times?",
        "Recommend budget-friendly places"
      ],
      relatedPlaces: [],
      safetyAlerts: [],
      actionItems: []
    };
  }

  // Development and testing utilities
  simulateBackendConnection() {
    this.healthStatus.status.halalRoutesApi = 'connected';
    this.healthStatus.status.safetyApi = 'connected';
    this.healthStatus.status.aiChat = 'connected';
    this.healthStatus.capabilities.realTimeData = true;
    this.healthStatus.capabilities.routePlanning = true;
    console.log('Backend connection simulated for development');
  }

  resetToMockMode() {
    this.healthStatus.status.halalRoutesApi = 'disabled';
    this.healthStatus.status.safetyApi = 'disabled';
    this.healthStatus.status.aiChat = 'mock';
    this.healthStatus.capabilities.realTimeData = false;
    this.healthStatus.capabilities.routePlanning = false;
    console.log('Reset to mock mode for offline development');
  }
}

// Export singleton instance
export const safeTripBackend = new SafeTripBackendService();
export default safeTripBackend;