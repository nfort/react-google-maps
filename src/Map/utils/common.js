const GOOGLE_MAPS_KEY = 'AIzaSyDbTuK4yijUzrJjTh852cEQuN5LN35FeYo';
const URL_GOOGLE_MAPS_SCRIPT = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&`;

function isGoogleMapsLoaded() {
  return typeof window.google === 'object' && typeof window.google.maps === 'object';
}

function appendScript() {
  const script = document.createElement('script');
  script.setAttribute('src', URL_GOOGLE_MAPS_SCRIPT);
  document.head.appendChild(script);
  return script;
}

export function isOptionsDoesntHaveLatLng(options) {
  return !options.lat || !options.lng;
}

export function loadScriptGoogleMaps() {
  return new Promise((resolve) => {
    if (isGoogleMapsLoaded()) {
      return resolve(true);
    }

    appendScript().onload = function() {
      resolve(true);
    };
  });
}
