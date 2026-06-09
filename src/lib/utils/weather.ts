export function getWeatherType(code: number) {

    if (code === 0) {
        return "sunny";
    }

    if ([1, 2, 3].includes(code)) {
        return "cloudy";
    }

    return "rainy";
}

export function getWeatherLabel(code: number) {

    if (code === 0) {
        return "Clear Sky";
    }

    if ([1, 2, 3].includes(code)) {
        return "Cloudy";
    }

    return "Rainy";
}