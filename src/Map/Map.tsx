import React from "react";
import { loadScriptGoogleMaps } from "./utils/common";

interface Props {
  height: string;
  options: google.maps.MapOptions;
  children?: React.ReactNode;
}

interface State {
  map: null | google.maps.Map;
  isInitializedMap: boolean;
}

export default class Map extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    height: "100%"
  };

  private containerDiv: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      map: null,
      isInitializedMap: false
    };
    this.containerDiv = React.createRef();
  }

  componentDidMount() {
    try {
      this.initializeMap();
    } catch (e) {
      console.log(e);
    }
  }

  initializeMap = async () => {
    let { options } = this.props;

    await loadScriptGoogleMaps();

    this.setState({
      map: new google.maps.Map(this.containerDiv.current, options),
      isInitializedMap: true
    });
  };

  render() {
    const { height } = this.props;
    return (
      <div
        ref={this.containerDiv}
        style={{
          width: "100%",
          height
        }}
      >
        {this.state.isInitializedMap
          ? React.Children.map(this.props.children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement<State>(
                  child as React.ReactElement<any>,
                  { map: this.state.map }
                );
              }
            })
          : null}
      </div>
    );
  }
}
