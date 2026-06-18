<script lang="ts">
    import { onMount } from "svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
    import HourForecast from "$lib/components/HourForecast.svelte";
    import WeeklyForecast from "$lib/components/WeeklyForecast.svelte";
    import { fetchWeather } from "$lib/api/weather";
    import { getWeatherType, getWeatherLabel } from "$lib/utils/weather";
    import type { WeatherData } from "$lib/types/weather";
    import { Sun, Cloud, CloudRain, Wind, Droplets, MapPin } from "lucide-svelte";

    let city = $state("");
    let selectedCity = $state("");
    let weather = $state<WeatherData | null>(null);
    let error = $state("");
    let loading = $state(false);
    let currentTime = $state("");
    let history = $state<string[]>([]);

    async function getWeather() {
        if (!city.trim()) {
            return;
        }
        loading = true;
        error = "";
        try {
            const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            weather = await fetchWeather(formattedCity);
            selectedCity = formattedCity;
            localStorage.setItem("lastCity", formattedCity);
            history = [formattedCity, ...history.filter((c) => c.toLowerCase() !== formattedCity.toLowerCase())].slice(0,5);
            localStorage.setItem("history", JSON.stringify(history));
        } catch (err: any) {
            error = err.message;
            weather = null;
        }
        
        loading = false;
    }
    

    let weatherType = $derived(weather ? getWeatherType(weather.current.weather_code) : "sunny");
    
    onMount(() => {
        const savedCity = localStorage.getItem("lastCity");
        if (savedCity) {
            city = savedCity;
            getWeather();
        }

        const savedHistory = localStorage.getItem("history");
        if (savedHistory) {
            history = JSON.parse(savedHistory);
        }

        currentTime = new Date().toLocaleString();
        setInterval(() => {
            currentTime = new Date().toLocaleString();
        }, 1000);

        setInterval(() => {
            if (city) {
                getWeather();
            }
        }, 300000);
    });
</script>

<div class={`app ${weatherType}`}>
    <div class="dashboard">
        <aside class="sidebar">
            <div class="brand">
                <h1>Weatherly</h1>
                <p>{currentTime}</p>
            </div>

            <SearchBar bind:city {getWeather} />
           
            {#if history.length > 0}
                <div class="history-section">
                    <h3>Recent Searches</h3>
                    <div class="history">
                        {#each history as item}
                            <button
                                class="history-btn"
                                onclick={() => {
                                    city = item;
                                    getWeather();
                                }}>
                                {item}
                            </button>
                        {/each}
                    </div>
                </div>
            {/if}
        </aside>

        <main class="main-content">
            {#if loading}
                <div class="spinner"></div>
            {/if}

            {#if error}
                <p class="error">
                    {error}
                </p>
            {/if}

            {#if weather}
                <section class="hero-section">
                    <div class="hero-left">
                        {#if weatherType === "sunny"}
                            <Sun size={120} />
                        {/if}

                        {#if weatherType === "cloudy"}
                            <Cloud size={120} />
                        {/if}

                        {#if weatherType === "rainy"}
                            <CloudRain size={120} />
                        {/if}

                        <div>
                            <div class="city-row">
                                <MapPin size={18} />
                                <h2>{selectedCity}</h2>
                            </div>

                            <p class="condition">
                                {getWeatherLabel(weather.current.weather_code)}
                            </p>
                        </div>
                    </div>

                    <div class="hero-temp">
                        {weather.current.temperature_2m}°C
                    </div>
                </section>

                <section class="stats-grid">
                    <div class="info-box">
                        <Wind size={24} />
                        <span> Wind Speed </span>
                        <strong>
                            {weather.current.wind_speed_10m}
                            km/h
                        </strong>
                    </div>

                    <div class="info-box">
                        <Droplets size={24} />
                        <span> Humidity </span>
                        <strong>
                            {weather.current.relative_humidity_2m}%
                        </strong>
                    </div>

                    <div class="info-box">
                        <span> Feels Like </span>
                        <strong>
                            {weather.current.apparent_temperature}°C
                        </strong>
                    </div>

                    <div class="info-box">
                        <span> Status </span>
                        <strong>
                            {getWeatherLabel(weather.current.weather_code)}
                        </strong>
                    </div>
                </section>

                <div class="hourly-section">
                    {#if weather?.hourly}
                        <HourForecast hourly={weather.hourly} />
                    {/if}
                </div>

                <div class="weekly-section">
                    {#if weather?.daily}
                        <WeeklyForecast daily={weather.daily} />
                    {/if}
                </div>
            {/if}
        </main>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;

        font-family: "Inter", sans-serif;
    }

    .app {
        min-height: 100vh;
        padding: 20px;
        transition: 0.5s ease;
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }

    .dashboard {
        display: grid;
        grid-template-columns: 370px 1fr;
        gap: 24px;
        min-height: calc(100vh - 40px);
    }

    .weekly-section {
        margin-top: 36px;
    }

    .sidebar {
        background: rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(22px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 32px;
        padding: 29px;
        display: flex;
        flex-direction: column;
        gap: 22px;
        color: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .brand h1 {
        margin: 0;
        font-size: 40px;
    }

    .brand p {
        opacity: 0.8;
    }

    .main-content {
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(22px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 32px;
        padding: 28px;
        overflow-y: auto;
        color: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .hero-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    .hero-left {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .city-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .city-row h2 {
        margin: 0;
        font-size: 34px;
    }

    .condition {
        opacity: 0.8;
        margin-top: 8px;
    }

    .hero-temp {
        font-size: 90px;
        font-weight: 700;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 18px;
        margin-top: 28px;
    }

    .info-box {
        background: rgba(255, 255, 255, 0.16);
        padding: 24px;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        text-align: center;
        transition: 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(12px);
    }

    .info-box:hover,
    .history-btn:hover {
        background: rgba(255, 255, 255, 0.22);
        transform: translateY(-4px) scale(1.01);
        transition: 0.3s ease;
    }

    .hourly-section {
        margin-top: 36px;
    }

    .history {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 10px;
    }

    .history-btn {
        width: 100%;
        padding: 14px 18px;
        border: none;
        border-radius: 18px;
        cursor: pointer;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.14);
        color: white;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        text-align: left;
        transition: 0.3s ease;
        font-size: 15px;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        margin: 40px auto;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .sunny {
        background: linear-gradient(135deg, #ffb347, #ffcc33, #ff9966);
        background-size: 400% 400%;
        animation: gradientMove 12s ease infinite;
    }

    .cloudy {
        background: linear-gradient(135deg, #1c2e61, #d7dde8, #9ea7b8);
        background-size: 400% 400%;
        animation: gradientMove 12s ease infinite;
    }

    .rainy {
        background: linear-gradient(135deg, #141e30, #243b55, #4b79a1);
        background-size: 400% 400%;
        animation: gradientMove 12s ease infinite;
    }

    .error {
        background: rgba(255, 0, 0, 0.2);
        padding: 14px;
        border-radius: 14px;
    }

    @media (max-width: 900px) {
        .app {
            padding: 12px;
        }

        .dashboard {
            grid-template-columns: 1fr;
            gap: 16px;
            min-height: auto;
        }

        .sidebar {
            width: 90%;
            padding: 20px;
            border-radius: 24px;
        }

        .main-content {
            padding: 20px;
            border-radius: 24px;
            overflow-x: hidden;
            width: 90%;
        }

        .brand h1 {
            font-size: 30px;
        }

        .brand p {
            font-size: 14px;
        }

        .hero-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }

        .hero-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
        }

        .hero-temp {
            font-size: 64px;
            line-height: 1;
        }

        .city-row h2 {
            font-size: 28px;
        }

        .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }

        .info-box {
            padding: 18px;
            border-radius: 20px;
        }

        .history {
            flex-direction: column;
            gap: 10px;
        }

        .history-btn {
            width: 100%;
            font-size: 14px;
            padding: 12px 14px;
        }
    }

    @media (max-width: 600px) {
        .app {
            padding: 10px;
        }

        .sidebar,
        .main-content {
            padding: 16px;
            border-radius: 20px;
        }

        .brand h1 {
            font-size: 26px;
        }

        .hero-temp {
            font-size: 52px;
        }

        .city-row h2 {
            font-size: 24px;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }

        .info-box {
            width: 90%;
        }
    }
</style>
