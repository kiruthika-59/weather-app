export async function fetchWeather(city: string) {
    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoResponse.json();
    if (!geoData.results) {
        throw new Error("City not found");
    }
    const latitude =geoData.results[0].latitude;
    const longitude =geoData.results[0].longitude;
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=7&timezone=auto`
    );
    const airResponse = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=us_aqi,pm10,pm2_5`
    );
    const weatherData =await weatherResponse.json();
    const airData =await airResponse.json();
    return {...weatherData,air_quality:airData.current};
}