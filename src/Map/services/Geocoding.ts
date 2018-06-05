interface ResolveObj {
  lat: number,
  lng: number
}

export function getGeocodeByAddress(address: string): Promise<ResolveObj> {
  return new Promise<ResolveObj>(function(resolve, reject) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
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
