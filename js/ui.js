import { describeWeather } from "./weatherCodes.js";

const container = document.querySelector(".container");
const iconElement = document.querySelector(".weather-icon img");
const tempButton = document.querySelector(".temperature-value");
const descElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");

const UNIT_KEY = "weatherapp:unit";

let unit = loadUnit();
let celsius = null;

function loadUnit() {
    try {
        return localStorage.getItem(UNIT_KEY) === "fahrenheit" ? "fahrenheit" : "celsius";
    } catch {
        return "celsius";
    }
}

function saveUnit() {
    try {
        localStorage.setItem(UNIT_KEY, unit);
    } catch {
        // Storage unavailable (private mode etc.) — preference just isn't persisted
    }
}

function renderTemperature() {
    if (celsius === null) return;
    const value = unit === "celsius" ? celsius : celsius * 9 / 5 + 32;
    const symbol = unit === "celsius" ? "C" : "F";
    tempButton.replaceChildren(`${Math.round(value)}°`, Object.assign(document.createElement("span"), { textContent: symbol }));
}

export function toggleUnit() {
    if (celsius === null) return;
    unit = unit === "celsius" ? "fahrenheit" : "celsius";
    saveUnit();
    renderTemperature();
}

export function render({ weather, place }) {
    const { icon, description } = describeWeather(weather.code, weather.isDay);
    iconElement.src = `icons/${icon}.png`;
    iconElement.alt = description;
    celsius = weather.temperature;
    renderTemperature();
    descElement.textContent = description;
    locationElement.textContent = place.country ? `${place.name}, ${place.country}` : place.name;
}

export function setLoading(isLoading) {
    container.classList.toggle("is-loading", isLoading);
    container.setAttribute("aria-busy", String(isLoading));
}

export function showNotification(message) {
    notificationElement.textContent = message;
    notificationElement.hidden = false;
}

export function hideNotification() {
    notificationElement.hidden = true;
}
