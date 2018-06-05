import React from 'react';

interface Props {
  map?: google.maps.Map,
  options: google.maps.MarkerOptions,
}

export default class Marker extends React.Component<Props>{
  componentDidMount() {
    this.setMarker();
  }

  setMarker = () => {
    const { map, options } = this.props;
    const marker = new google.maps.Marker(options);
    marker.setMap(map!);
  };

  render() {
    return null;
  }
}
