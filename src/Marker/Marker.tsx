import React from "react";

interface Props {
  map: google.maps.Map;
  options: google.maps.MarkerOptions;
}

interface State {
  marker: null | google.maps.Marker;
}

export default class Marker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      marker: null
    };
  }

  componentDidMount() {
    this.setMarker();
  }

  setMarker = () => {
    const { map, options } = this.props;
    const marker = new google.maps.Marker(options);
    marker.setMap(map!);
    this.setState({
      marker
    });
  };

  componentWillUnmount() {
    const { marker } = this.state;

    if (marker) {
      marker.setMap(null);
    }
  }

  render(): null {
    return null;
  }
}
