This is a travel assistant intended to help travellers discover new places more comfortably and safely.

# SafeTrip.AI 🌍🛡️

**Your AI-powered personalized travel assistant for safe and values-based exploration**

SafeTrip.AI helps first-time and values-conscious travelers (Muslim tourists, solo women, accessibility-conscious users) explore unfamiliar cities safely and comfortably using Google Maps Platform, real-time data, and intelligent AI assistance.

## 🚀 Project Status

This is a frontend-only implementation of the SafeTrip.AI concept. Backend functionality for authentication, user data management, and API integrations will be implemented separately.

## ✨ Features

### 🎯 Smart Values-Based Filtering
- **Religious Preferences**: Find halal restaurants, mosques, prayer rooms
- **Safety-First**: Avoid bars, red-light zones, high-crime areas
- **Cultural Alignment**: Discover quiet, family-friendly neighborhoods
- **Accessibility**: Wheelchair accessible locations and limited mobility support

### 🛡️ AI-Powered Safety Intelligence
- **Real-time Safety Zones**: Visual safety mapping with risk assessment
- **Neighborhood Insights**: AI-generated area summaries ("Great for solo travelers. Quiet. 2 halal cafés.")
- **Dynamic Risk Assessment**: Based on time of day, crowd data, and crime statistics
- **Personalized Alerts**: Safety notifications tailored to your profile

### 🤖 Intelligent AI Assistant
- **24/7 Chat Support**: Ask "Is Kensington Market safe at night?" for instant, contextual responses
- **Cultural Context**: Understanding of religious and cultural needs
- **Local Recommendations**: Personalized suggestions based on your values and budget
- **Multi-language Support**: English, French, Japanese, Arabic, Spanish

### 📱 Modern User Experience
- **Intuitive Onboarding**: Smart questionnaire to understand your preferences
- **Interactive Maps**: Google Maps integration with safety overlay
- **Personalized Dashboard**: Track your favorites, search history, and recommendations
- **Mobile-First Design**: Responsive, fast, and accessible

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

### AI & Maps
- **Google Maps Platform** - Maps and Places API
- **Google Places API** - Restaurant and location data

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
   Create a `.env.local` file in the root directory:
   ```env
   # Google Maps (Required)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

   # Environment
   NODE_ENV="development"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 API Setup Guide

### Google Maps Platform
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the key to your domain for security

### OpenAI API
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new secret key
5. Add billing information for usage

## 🎨 Features Demonstration

### User Onboarding
- **Smart Questionnaire**: Religion, dietary needs, travel style, budget
- **Preference Learning**: AI adapts to user behavior over time
- **Quick Setup**: Skip option for immediate access

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
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components and animations
│   ├── Navbar.tsx               # Navigation
│   ├── Hero.tsx                 # Landing page hero
│   ├── Features.tsx             # Feature showcase
│   └── MapSection.tsx           # Interactive map component
├── lib/                         # Utilities and configuration
│   ├── constants.ts             # App constants and city data
│   └── utils.ts                 # Helper functions
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
