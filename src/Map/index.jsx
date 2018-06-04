import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  loadScriptGoogleMaps,
  isOptionsDoesntHaveLatLng
} from "./utils/common";
import { getGeocodeByAddress } from "./services/Geocoding";

const DEFAULT_ZOOM_CITY = 10;

export default class Map extends PureComponent {
  static propTypes = {
    city: PropTypes.string.isRequired,
    options: PropTypes.object,
    children: PropTypes.array
  };

  static defaultProps = {
    options: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      node: null,
      isInitializedMap: false
    };
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

    if (isOptionsDoesntHaveLatLng(options)) {
      const { city } = this.props;
      const location = await getGeocodeByAddress(city);
      options = {
        ...options,
        zoom: DEFAULT_ZOOM_CITY,
        disableDefaultUI: true,
        zoomControl: false,
        center: location
      };
    }

    const { node } = this.state;
    this.map = new google.maps.Map(node, options);
    this.setState({
      isInitializedMap: true
    });
  };

  getChildren = () => {
    return React.Children.map(this.props.children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        ref: child.ref,
        map: this.map
      });
    });
  };

  render() {
    return (
      <div
        ref={node => this.setState({ node })}
        style={{
          width: "100vw",
          height: "90vh"
        }}
      >
        {this.state.isInitializedMap ? this.getChildren() : null}
      </div>
    );
  }
}
