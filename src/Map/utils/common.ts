declare global {
  interface Window {
    google: object;
  }
}

function getGoogleMapsUrl(key: string) {
  return `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=drawing`;
}

export function loadScriptGoogleMaps(key: string) {
  function appendScript(): HTMLElement {
    const script = document.createElement("script");
    script.setAttribute("src", getGoogleMapsUrl(key));
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
