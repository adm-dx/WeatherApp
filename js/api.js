// All endpoints are HTTPS, keyless and CORS-enabled, so the app works on GitHub Pages.
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const REVERSE_GEOCODING_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

async function getJSON(url, params) {
    const query = new URLSearchParams(params);
    const response = await fetch(`${url}?${query}`);
    if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
    }
    return response.json();
}

export async function fetchWeather(latitude, longitude) {
    const data = await getJSON(FORECAST_URL, {
        latitude,
        longitude,
        current: "temperature_2m,weather_code,is_day"
    });
    return {
        temperature: data.current.temperature_2m,
        code: data.current.weather_code,
        isDay: data.current.is_day === 1
    };
}

export async function searchCity(name) {
    const data = await getJSON(GEOCODING_URL, { name, count: 1, language: "en" });
    const city = data.results?.[0];
    if (!city) {
        throw new Error(`City "${name}" not found`);
    }
    return {
        latitude: city.latitude,
        longitude: city.longitude,
        name: city.name,
        country: city.country_code
    };
}

export async function reverseGeocode(latitude, longitude) {
    try {
        const data = await getJSON(REVERSE_GEOCODING_URL, {
            latitude,
            longitude,
            localityLanguage: "en"
        });
        const name = data.city || data.locality;
        if (name) {
            return { name, country: data.countryCode };
        }
    } catch {
        // Fall through to coordinates
    }
    return { name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`, country: "" };
}
