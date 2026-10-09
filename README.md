# WeatherApp

**Live demo: https://adm-dx.github.io/WeatherApp/**

Weather App with beautiful icons that shows your real-time weather by geolocation.

- Vanilla JS (ES modules), no build step, no API keys
- Weather data from [Open-Meteo](https://open-meteo.com/), city search via Open-Meteo Geocoding, city names via [BigDataCloud](https://www.bigdatacloud.com/) reverse geocoding
- If geolocation is unavailable or denied, a default city is shown and you can search for any city
- Click the temperature to switch between Celsius and Fahrenheit (the choice is remembered)

## Run locally

ES modules don't load from `file://`, so serve the folder over HTTP:

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

The site is served by GitHub Pages straight from the `master` branch root — just push.
