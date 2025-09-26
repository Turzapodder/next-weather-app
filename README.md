# Weather App 🌤️

A modern, responsive weather application built with Next.js, TypeScript, and Tailwind CSS. Get real-time weather information, forecasts, and detailed weather statistics for any city worldwide.

## Features

- **Real-time Weather Data**: Current weather conditions for any city
- **5-Day Forecast**: Detailed daily weather predictions
- **Hourly Forecast**: Hour-by-hour weather breakdown
- **Unit Conversion**: Switch between Metric (°C, m/s, mm) and Imperial (°F, mph, in) units
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **City Search**: Intelligent city search with autocomplete
- **Weather Statistics**: Detailed stats including feels-like temperature, humidity, wind speed, and precipitation
- **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with RTK Query
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)
- **Fonts**: DM Sans & Bricolage Grotesque

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenWeatherMap API key:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   NEXT_PUBLIC_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## API Configuration

This application uses the OpenWeatherMap API to fetch weather data. You'll need to:

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
2. Generate an API key
3. Add the API key to your `.env.local` file

The API provides:
- Current weather data
- 5-day weather forecast
- Geocoding for city search
- Weather icons and descriptions

## Responsive Design

The application is fully responsive and optimized for:

- **Mobile**: < 640px (grid layouts, touch-friendly interface)
- **Tablet**: 640px - 1024px (balanced layout)
- **Desktop**: > 1024px (full-featured layout with sidebar)

Key responsive features:
- Adaptive grid layouts
- Flexible typography scaling
- Touch-optimized controls
- Horizontal scrolling for forecast items on mobile

## UI Components

- **SearchBar**: Intelligent city search with autocomplete dropdown
- **CurrentWeather**: Hero section with current conditions
- **WeatherStats**: Grid of key weather metrics
- **Forecast**: Daily weather forecast cards
- **HourlyForecast**: Detailed hourly breakdown
- **UnitSelector**: Toggle between metric and imperial units
- **LoadingSkeleton**: Smooth loading states

## State Management

The app uses Redux Toolkit for state management:

- **Weather Data**: Cached API responses with RTK Query
- **Unit System**: Global unit preference (metric/imperial)
- **UI State**: Loading states, error handling

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Vercel


## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons


---

Made with ❤️ by [Turjha Podder](https://github.com/turzapodder)
