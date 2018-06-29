import React from "react";
import { loadScriptGoogleMaps } from "./utils/common";

interface Props {
  height: string;
  APIKey: string;
  options: google.maps.MapOptions;
  children?(map: google.maps.Map): React.ReactNode;
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
    let { options, APIKey } = this.props;

    await loadScriptGoogleMaps(APIKey);

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
          ? this.props.children
            ? this.props.children(this.state.map!)
            : null
          : null}
      </div>
    );
  }
}
