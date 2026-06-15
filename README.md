# Weather Application

## Project Overview
This Weather Application is a web-based tool that provides real-time weather information for any selected city. It fetches live data from a weather API and displays key meteorological details in a clean and responsive user interface.

---

## Features
- Search weather information by city name
- Display current temperature in Celsius
- Show humidity and wind speed
- Provide weather condition descriptions (e.g., clear, cloudy, rain)
- Responsive design for different screen sizes

---

## Technology Stack
- Frontend: Svelte / SvelteKit
- Language: JavaScript / TypeScript
- API Integration: OpenWeatherMap API
- Styling: CSS

---

## Project Structure

```text
src/
├── lib/
│   ├── api/
│   │   └── weather.ts
│   │
│   ├── assets/
│   │   ├── favicon.svg
│   │
│   ├── components/
│   │   ├── SearchBar.svelte
│   │   ├── WeatherCard.svelte
│   │   ├── HourForecast.svelte
│   │   ├── WeeklyForecast.svelte
│   │   └── ThemeToggle.svelte
│   │
│   ├── types/
│   │   └── weather.ts
│   │
│   └── utils/
│       └── weather.ts
│
├── routes/
│   ├── +page.svelte
│   └── +layout.svelte
│
└── app.css
```
---

# Screenshot

## Search Result

<img width="1875" height="980" alt="weather-home" src="https://github.com/user-attachments/assets/4e8d498a-8410-4e81-88be-4f194b22e53a" />

## Forecast 

<img width="1258" height="895" alt="forecast" src="https://github.com/user-attachments/assets/12ff665e-057f-4f85-b270-f67e0ffd1dd7" />

## Mobile View

<img width="1443" height="892" alt="weather-responsive" src="https://github.com/user-attachments/assets/ad808d88-ce82-4cfb-9277-52be66a1ef0e" />


