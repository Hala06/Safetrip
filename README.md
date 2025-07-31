This is a travel assistant intended to help travellers discover new places more comfortably and safely.

# SafeTrip.AI 🌍🛡️

**Your AI-powered personalized travel assistant for safe and values-based exploration with real-time backend integration**

SafeTrip.AI helps first-time and values-conscious travelers (Muslim tourists, solo women, accessibility-conscious users) explore unfamiliar cities safely and comfortably using Google Maps Platform, real-time data, and intelligent AI assistance.

## 🚀 Project Status

This frontend application now includes full backend integration capabilities, connecting with the HalalRoutes API and other backend services for real-time travel safety and recommendation features.

## ✨ New Backend Integration Features

### 🔗 Real-Time API Connectivity
- **Backend API Integration**: Seamless connection to HalalRoutes backend services
- **Real-Time Safety Data**: Live safety zone updates and crime statistics
- **Dynamic Place Information**: Fresh data from multiple sources
- **AI Chat Integration**: Connected to backend AI services for contextual responses

### 🗺 Enhanced Interactive Maps
- **Real-Time SafeZone Overlays**: Live safety mapping with color-coded risk levels
- **Dynamic Safety Updates**: Real-time crime data and safety trend analysis  
- **Interactive Place Markers**: Detailed information cards with live data
- **Location-Based Filtering**: Smart filtering based on current location and preferences

### 🤖 AI-Powered Assistant
- **24/7 AI Chat Support**: Connected to backend AI for contextual travel advice
- **Location-Aware Responses**: AI understands your current location and safety context
- **Cultural & Religious Guidance**: Specialized knowledge for Muslim travelers and cultural needs
- **Real-Time Safety Alerts**: Proactive notifications based on current conditions

### 📍 Smart Area Analysis
- **Live Area Summaries**: Real-time analysis of neighborhoods and districts
- **Safety Score Calculation**: Dynamic safety ratings based on multiple data sources
- **Local Insights**: Community-driven recommendations and warnings
- **Amenities Detection**: Automated discovery of halal restaurants, mosques, and accessible venues

## ✨ Features

### 🎯 Smart Values-Based Filtering
- **Religious Preferences**: Find halal restaurants, mosques, prayer rooms with real-time availability
- **Safety-First**: Avoid bars, red-light zones, high-crime areas with live safety data
- **Cultural Alignment**: Discover quiet, family-friendly neighborhoods with community insights
- **Accessibility**: Wheelchair accessible locations with verified accessibility information
- **Budget Intelligence**: Real-time pricing and budget-friendly recommendations

### 🛡️ AI-Powered Safety Intelligence
- **Real-time Safety Zones**: Visual safety mapping with live risk assessment and crime data
- **Neighborhood Insights**: AI-generated area summaries with real-time updates
- **Dynamic Risk Assessment**: Based on time of day, crowd data, live crime statistics, and weather
- **Personalized Alerts**: Safety notifications tailored to your profile and current location
- **Community Safety Reports**: User-generated safety updates and warnings

### 🤖 Intelligent AI Assistant
- **24/7 Chat Support**: Ask "Is Kensington Market safe at night?" for instant, contextual responses
- **Cultural Context**: Understanding of religious and cultural needs with local knowledge
- **Local Recommendations**: Personalized suggestions based on your values, budget, and real-time data
- **Multi-language Support**: English, French, Japanese, Arabic, Spanish
- **Proactive Guidance**: AI monitors your location and provides contextual safety advice

### 📱 Modern User Experience with Backend Integration
- **Intuitive Onboarding**: Smart questionnaire synced with backend user preferences
- **Interactive Maps**: Google Maps integration with real-time safety overlay and live data
- **Personalized Dashboard**: Track favorites, search history, and recommendations synced across devices
- **Mobile-First Design**: Responsive, fast, and accessible with offline safety data caching
- **Real-Time Updates**: Live notifications and data updates from backend services

## 🏙️ Supported Cities

### Currently Available:
- **🇨🇦 Toronto, Canada**
  - Complete safety mapping
  - 50+ neighborhoods analyzed
  - Halal restaurant database
  - Mosque and prayer room locations

- **🇯🇵 Tokyo, Japan** *(Coming Soon)*
  - Multi-cultural dining options
  - Prayer facilities mapping
  - Cultural district recommendations

### Coming Soon:
- London, UK
- New York, USA
- Dubai, UAE
- Paris, France

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling system
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components
- **React Google Maps API** - Interactive mapping with safety overlays

### Backend Integration
- **REST API Client** - Robust API communication layer
- **HalalRoutes API** - Integration with halal restaurant and mosque databases
- **Real-Time Data Sync** - Live safety and place information updates
- **Error Handling & Fallbacks** - Graceful degradation when backend is unavailable

### AI & Maps
- **Google Maps Platform** - Maps, Places, and Geocoding APIs
- **Google Places API** - Restaurant and location data with real-time updates
- **AI Chat Integration** - Backend AI service for contextual travel assistance
- **Safety Data APIs** - Real-time crime statistics and safety monitoring

### Development & Deployment
- **ESLint** - Code quality
- **TypeScript** - Type checking
- **Git** - Version control
- **Vercel** - Production deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Maps API key
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/safetrip-ai.git
   cd safetrip-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory (copy from `.env.example`):
   ```env
   # Backend API Configuration (Required for full functionality)
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_HALAL_ROUTES_API=https://api.halalroutes.com

   # Google Maps (Required for map functionality)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

   # Authentication (Optional for demo)
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL=http://localhost:3000

   # Feature Flags
   NEXT_PUBLIC_ENABLE_REAL_TIME_SAFETY=true
   NEXT_PUBLIC_ENABLE_AI_CHAT=true
   NEXT_PUBLIC_ENABLE_BACKEND_API=true
   ```

   **Note**: The application will work in demo mode without backend APIs, but for full functionality, you need to connect to the backend services.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 API Setup Guide

### Backend Integration Setup

#### HalalRoutes Backend Connection
1. Clone the HalalRoutes backend repository: `@MelonCaully/halalRoutes`
2. Follow the backend setup instructions in that repository
3. Start the backend server (typically on `http://localhost:8000`)
4. Update your `.env.local` with the correct backend URL:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   NEXT_PUBLIC_HALAL_ROUTES_API=https://api.halalroutes.com
   ```

#### Demo Mode vs Full Integration
- **Demo Mode**: Works without backend - uses mock data for demonstration
- **Full Integration**: Requires backend connection for real-time data and AI features
- Toggle via `NEXT_PUBLIC_ENABLE_BACKEND_API=true/false` in your environment

### Google Maps Platform
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the key to your domain for security

### OpenAI API (Optional - for enhanced AI features)
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new secret key
5. Add billing information for usage
6. The backend handles AI integration - frontend connects via backend API

## 🎨 Features Demonstration

### Backend-Connected Features
- **Real-Time Safety Map**: Live crime data and safety zone updates
- **AI Travel Assistant**: Contextual advice powered by backend AI services
- **Smart Place Filtering**: Dynamic filtering based on live data
- **Area Analysis**: Real-time neighborhood insights and safety scores

### User Onboarding
- **Smart Questionnaire**: Religion, dietary needs, travel style, budget (synced with backend)
- **Preference Learning**: AI adapts to user behavior over time via backend analytics
- **Quick Setup**: Skip option for immediate access with demo data

### Search & Discovery
- **Intelligent Filtering**: Combine multiple criteria (halal + safe + budget)
- **Visual Results**: Rich cards with ratings, distance, safety scores
- **Real-time Data**: Live availability, opening hours, current safety status

### Safety Intelligence
- **Visual Safety Map**: Color-coded zones (green=safe, yellow=caution, red=avoid)
- **Contextual Alerts**: Time-based recommendations
- **Community Data**: User-generated safety reports and tips

### AI Chat Assistant
- **Natural Language**: Ask complex questions in your preferred language
- **Context Awareness**: Understands your location, preferences, and current plans
- **Proactive Suggestions**: Recommends based on weather, time, and events

## 🗂️ Project Structure

```
safetrip-ai/
├── app/                          # Next.js App Router
│   ├── demo/                     # Feature demonstration
│   ├── dashboard/                # Main user dashboard with backend integration
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components and animations
│   ├── AIChatBot.tsx            # AI assistant with backend integration
│   ├── SafetyMap.tsx            # Interactive map with real-time safety data
│   ├── SmartFilters.tsx         # Advanced filtering with backend API
│   ├── AreaSummary.tsx          # Live area analysis component
│   ├── Navbar.tsx               # Navigation
│   ├── Hero.tsx                 # Landing page hero
│   ├── Features.tsx             # Feature showcase
│   └── MapSection.tsx           # Basic map component
├── lib/                         # Utilities and configuration
│   ├── api.ts                   # Backend API client and interfaces
│   ├── constants.ts             # App constants and city data
│   ├── auth.ts                  # Authentication utilities
│   ├── prisma.ts                # Database client stub
│   ├── validations.ts           # Form validation schemas
│   └── utils.ts                 # Helper functions
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment configuration (ignored)
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔐 Security & Privacy

- **Data Protection**: All user data encrypted and stored securely
- **Privacy First**: Minimal data collection, user consent required
- **API Security**: Rate limiting, input validation, secure authentication
- **GDPR Compliant**: Data deletion, export, and consent management

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Maps Platform for location services
- OpenAI for AI capabilities
- The open-source community for amazing tools
- Beta testers and early users for feedback

## 📞 Support

- **Email**: support@safetrip.ai
- **Documentation**: [docs.safetrip.ai](https://docs.safetrip.ai)
- **Community**: [Discord](https://discord.gg/safetrip)
- **Issues**: [GitHub Issues](https://github.com/your-username/safetrip-ai/issues)

---

**Made with ❤️ for safe and inclusive travel**
