export type WeatherData = {

    current: {
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        wind_speed_10m: number;
        weather_code: number;
    };

    hourly: {
        time: string[];
        temperature_2m: number[];
        weather_code: number[];
    };
    
    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
    };

    air_quality?: {
        us_aqi: number;
        pm10: number;
        pm2_5: number;
    };
}