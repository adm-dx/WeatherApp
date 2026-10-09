// WMO weather interpretation codes (used by Open-Meteo) → icon id + description.
// Icon ids match the files in icons/ (OpenWeatherMap naming), suffixed with d/n.
const CODES = {
    0: ["01", "Clear sky"],
    1: ["02", "Mainly clear"],
    2: ["03", "Partly cloudy"],
    3: ["04", "Overcast"],
    45: ["50", "Fog"],
    48: ["50", "Depositing rime fog"],
    51: ["09", "Light drizzle"],
    53: ["09", "Moderate drizzle"],
    55: ["09", "Dense drizzle"],
    56: ["09", "Light freezing drizzle"],
    57: ["09", "Dense freezing drizzle"],
    61: ["10", "Slight rain"],
    63: ["10", "Moderate rain"],
    65: ["10", "Heavy rain"],
    66: ["10", "Light freezing rain"],
    67: ["10", "Heavy freezing rain"],
    71: ["13", "Slight snow fall"],
    73: ["13", "Moderate snow fall"],
    75: ["13", "Heavy snow fall"],
    77: ["13", "Snow grains"],
    80: ["09", "Slight rain showers"],
    81: ["09", "Moderate rain showers"],
    82: ["09", "Violent rain showers"],
    85: ["13", "Slight snow showers"],
    86: ["13", "Heavy snow showers"],
    95: ["11", "Thunderstorm"],
    96: ["11", "Thunderstorm with slight hail"],
    99: ["11", "Thunderstorm with heavy hail"]
};

export function describeWeather(code, isDay) {
    const entry = CODES[code];
    if (!entry) {
        return { icon: "unknown", description: "Unknown" };
    }
    const [icon, description] = entry;
    return { icon: `${icon}${isDay ? "d" : "n"}`, description };
}
