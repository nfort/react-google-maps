import React from "react";

interface Props {
  map: google.maps.Map;
  options: google.maps.drawing.DrawingManagerOptions;
  instance(drawingManager: google.maps.drawing.DrawingManager): void;
}

interface State {
  drawingManager: null | google.maps.drawing.DrawingManager;
}

export default class DrawingManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drawingManager: null
    };
  }

  setDrawingManager = () => {
    const { map, options, instance } = this.props;
    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map!);
    this.setState({ drawingManager });
    instance(drawingManager);
  };

  componentDidMount() {
    this.setDrawingManager();
  }

  shouldComponentUpdate(nextProps: Props) {
    const { instance } = this.props;
    const { drawingManager } = this.state;

    if (drawingManager) {
      drawingManager.setOptions(nextProps.options);
      instance(drawingManager);
    }

    return true;
  }

  componentWillUnmount() {
    const { drawingManager } = this.state;

    if (drawingManager) {
      drawingManager.setMap(null);
    }
  }

  render() {
    return null;
  }
}
