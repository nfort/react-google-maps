import React from "react";

interface Props {
  map?: google.maps.Map;
  options: google.maps.PolygonOptions;
  instance(polygon: google.maps.Polygon): void;
}

interface State {
  polygon: null | google.maps.Polygon;
}

export default class Polygon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      polygon: null
    };
  }

  setPolygon = () => {
    const { map, options, instance } = this.props;
    const polygon = new google.maps.Polygon(options);
    polygon.setMap(map!);
    this.setState({ polygon });
    instance(polygon);
  };

  componentDidMount() {
    this.setPolygon();
  }

  shouldComponentUpdate(nextProps: Props) {
    const { instance } = this.props;
    const { polygon } = this.state;

    if (polygon) {
      polygon.setOptions(nextProps.options);
      instance(polygon);
    }

    return true;
  }

  render() {
    return null;
  }
}
