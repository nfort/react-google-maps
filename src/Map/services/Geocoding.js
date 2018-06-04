export function getGeocodeByAddress(address) {
  return new Promise(function(resolve, reject) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address}, function(results, status) {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        return resolve({
          lat: location.lat(),
          lng: location.lng()
        });
      }
      return reject(status);
    });
  });
}
