<script lang="ts">
    import { Sun, Cloud, CloudRain } from "lucide-svelte";
    import { getWeatherType } from "$lib/utils/weather";
    let { hourly } = $props();
</script>

<div class="hourly-section">
    <h3 class="section-title">Today's Forecast</h3>

    <div class="hourly-scroll">
        {#each hourly.time.slice(0, 24) as time, i}
            <div class="hour-card">
                <p class="time">
                    {new Date(time).toLocaleTimeString([], {
                        hour: "2-digit",minute: "2-digit",
                    })}
                </p>

                <div class="icon">
                    {#if getWeatherType(hourly.weather_code[i]) === "sunny"}
                        <Sun size={34} />
                    {/if}

                    {#if getWeatherType(hourly.weather_code[i]) === "cloudy"}
                        <Cloud size={34} />
                    {/if}

                    {#if getWeatherType(hourly.weather_code[i]) === "rainy"}
                        <CloudRain size={34} />
                    {/if}
                </div>

                <strong class="temp">
                    {hourly.temperature_2m[i]}°C
                </strong>
            </div>
        {/each}
    </div>
</div>

<style>
    .hourly-section {
        margin-top: 36px;
    }

    .section-title {
        margin-bottom: 18px;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: white;
    }

    .hourly-scroll {
        display: flex;
        gap: 18px;
        overflow-x: auto;
        padding: 8px 4px 14px;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
    }

    .hourly-scroll::-webkit-scrollbar {
        height: 6px;
    }

    .hourly-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .hourly-scroll::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.35);
        border-radius: 20px;
    }

    .hourly-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.55);
    }

    .hour-card {
        min-width: 115px;
        padding: 20px 18px;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        flex-shrink: 0;
        scroll-snap-align: start;
        background: rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(18px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: 0.3s ease;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        color: white;
    }

    .hour-card:hover {
        transform: translateY(-6px);
        background: rgba(255, 255, 255, 0.2);
    }

    .time {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        opacity: 0.8;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .temp {
        font-size: 24px;
        font-weight: 700;
    }

    @media (max-width: 600px) {
        .hour-card {
            min-width: 100px;
            padding: 16px;
        }

        .temp {
            font-size: 20px;
        }

        .section-title {
            font-size: 20px;
        }
    }
</style>
