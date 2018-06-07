import React from "react";

interface Props {
  map?: google.maps.Map;
  options: google.maps.PolygonOptions;
  instance(polygon: google.maps.Polygon): void;
}

export default class Polygon extends React.Component<Props> {
  setPolygon = () => {
    const { map, options, instance } = this.props;
    const polygon = new google.maps.Polygon(options);
    polygon.setMap(map!);
    instance(polygon);
  };

  componentDidMount() {
    this.setPolygon();
  }

  render() {
    return null;
  }
}
