<script lang="ts">
    import { Sun, Cloud, CloudRain } from "lucide-svelte";
    import { getWeatherType } from "$lib/utils/weather";
    let { daily } = $props();
</script>

{#if daily?.time}
    <div class="weekly-section">
        <h3 class="section-title">Upcoming Forecast</h3>
        <div class="weekly-wrapper">
            {#each daily.time as day, index}
                <div class="day-card">
                    <p class="day-name">
                        {new Date(day).toLocaleDateString("en-US", {
                            weekday: "short",
                        })}
                    </p>

                    <div class="date">
                        {new Date(day).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                        })}
                    </div>

                    <div class="icon">
                        {#if getWeatherType(daily.weather_code[index]) === "sunny"}
                            <Sun size={34} />
                        {/if}

                        {#if getWeatherType(daily.weather_code[index]) === "cloudy"}
                            <Cloud size={34} />
                        {/if}

                        {#if getWeatherType(daily.weather_code[index]) === "rainy"}
                            <CloudRain size={34} />
                        {/if}
                    </div>

                    <div class="temp-group">
                        <h3>{daily.temperature_2m_max[index]}°</h3>
                        <span>{daily.temperature_2m_min[index]}°</span>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .weekly-section {
        margin-top: 40px;
    }

    .section-title {
        margin-bottom: 18px;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: white;
    }

    .weekly-wrapper {
        display: flex;
        gap: 18px;
        overflow-x: auto;
        padding: 8px 4px 14px;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
    }

    .weekly-wrapper::-webkit-scrollbar {
        height: 6px;
    }

    .weekly-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }

    .weekly-wrapper::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.35);
        border-radius: 20px;
    }

    .weekly-wrapper::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.55);
    }

    .day-card {
        min-width: 130px;
        padding: 22px 18px;
        border-radius: 26px;
        text-align: center;
        color: white;
        flex-shrink: 0;
        scroll-snap-align: start;
        background: rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(18px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: 0.3s ease;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

    .day-card:hover {
        transform: translateY(-6px);
        background: rgba(255, 255, 255, 0.2);
    }

    .day-name {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        opacity: 0.9;
    }

    .date {
        font-size: 13px;
        opacity: 0.65;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 4px 0;
    }

    .temp-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .temp-group h3 {
        margin: 0;
        font-size: 30px;
        font-weight: 700;
    }

    .temp-group span {
        font-size: 15px;
        opacity: 0.7;
    }

    @media (max-width: 600px) {
        .day-card {
            min-width: 110px;
            padding: 18px 16px;
        }

        .temp-group h3 {
            font-size: 24px;
        }

        .section-title {
            font-size: 20px;
        }
    }
</style>
