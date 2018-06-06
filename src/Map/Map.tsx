import React from "react";
import {
  loadScriptGoogleMaps,
  isOptionsDoesntHaveLatLng
} from "./utils/common";
import { getGeocodeByAddress } from "./services/Geocoding";

interface Props {
  city: string;
  options?: google.maps.MapOptions;
  children?: React.ReactNode;
}

interface State {
  map: null | google.maps.Map;
  isInitializedMap: boolean;
}

export default class Map extends React.Component<Props, State> {
  private containerDiv: React.RefObject<HTMLDivElement>;

  public static defaultProps: Partial<Props> = {
    options: {
      zoom: 10,
      disableDefaultUI: true,
      zoomControl: false
    }
  };

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

    if (isOptionsDoesntHaveLatLng(options!)) {
      const { city } = this.props;
      const location = await getGeocodeByAddress(city);
      options = {
        ...options,
        center: location
      };
    }

    this.setState({
      map: new google.maps.Map(this.containerDiv.current, options),
      isInitializedMap: true
    });
  };

  render() {
    return (
      <div
        ref={this.containerDiv}
        style={{
          width: "100vw",
          height: "90vh"
        }}
      >
        {this.state.isInitializedMap
          ? React.Children.map(this.props.children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement<State>(child as React.ReactElement<any>, { map: this.state.map });
              }
            })
          : null}
      </div>
    );
  }
}
