export function getPosition(timeout = 10000) {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("Browser doesn't support geolocation"));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(new Error(error.message || "Unable to get location")),
            { timeout, maximumAge: 10 * 60 * 1000 }
        );
    });
}
