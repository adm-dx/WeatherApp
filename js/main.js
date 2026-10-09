import { fetchWeather, reverseGeocode, searchCity } from "./api.js";
import { getPosition } from "./geo.js";
import { hideNotification, render, setLoading, showNotification, toggleUnit } from "./ui.js";

const DEFAULT_CITY = "London";

const searchForm = document.querySelector(".search");
const searchInput = searchForm.querySelector("input");
const tempButton = document.querySelector(".temperature-value");

async function showWeatherAt(latitude, longitude, place) {
    const [weather, resolvedPlace] = await Promise.all([
        fetchWeather(latitude, longitude),
        place ?? reverseGeocode(latitude, longitude)
    ]);
    render({ weather, place: resolvedPlace });
}

async function showWeatherForCity(name) {
    const city = await searchCity(name);
    await showWeatherAt(city.latitude, city.longitude, city);
}

async function run(task, { keepNotification = false } = {}) {
    setLoading(true);
    try {
        await task();
        if (!keepNotification) hideNotification();
    } catch (error) {
        showNotification(error.message);
    } finally {
        setLoading(false);
    }
}

async function init() {
    setLoading(true);
    try {
        const coords = await getPosition();
        await run(() => showWeatherAt(coords.latitude, coords.longitude));
    } catch (error) {
        showNotification(`${error.message}. Showing weather for ${DEFAULT_CITY} — search for your city above.`);
        await run(() => showWeatherForCity(DEFAULT_CITY), { keepNotification: true });
    }
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = searchInput.value.trim();
    if (!name) return;
    run(() => showWeatherForCity(name));
});

tempButton.addEventListener("click", toggleUnit);

init();
