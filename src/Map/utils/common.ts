const GOOGLE_MAPS_KEY = "AIzaSyDbTuK4yijUzrJjTh852cEQuN5LN35FeYo";
const URL_GOOGLE_MAPS_SCRIPT = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&`;

declare global {
  interface Window {
    google: object;
  }
}

export function loadScriptGoogleMaps() {
  function appendScript(): HTMLElement {
    const script = document.createElement("script");
    script.setAttribute("src", URL_GOOGLE_MAPS_SCRIPT);
    document.head.appendChild(script);
    return script;
  }

  function isGoogleMapsLoaded() {
    return typeof window.google === "object";
  }

  return new Promise((resolve, reject) => {
    if (isGoogleMapsLoaded()) {
      return resolve(true);
    }

    appendScript().onload = function() {
      resolve(true);
    };

    setTimeout(function() {
      reject(`Google Maps: Script doesn't loaded`);
    }, 10000);
  });
}
