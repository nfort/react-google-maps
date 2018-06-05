import React from "react";
import { storiesOf } from "@storybook/react";
import Map from "../src/Map/Map";
import Marker from "../src/Marker/Marker";
import Polygon from "../src/Polygon/Polygon";

storiesOf("Map", module)
  .add("default", () => <Map city="Moscow" />)
  .add("with Markers", () => (
    <Map city="Moscow">
      <Marker
        options={{
          title: "Red Square",
          position: { lat: 55.754093, lng: 37.620407 }
        }}
      />
      <Marker
        options={{
          title: "Paveletskaya railway station",
          position: { lat: 55.7298476, lng: 37.6388022 }
        }}
      />
      <Marker
        options={{
          title: "Belorussky railway station",
          position: { lat: 55.776389, lng: 37.580278 }
        }}
      />
      <Marker
        options={{
          title: "Kiyevsky railway station",
          position: { lat: 55.7561392, lng: 37.6563434 }
        }}
      />
      <Marker
        options={{
          title: "Leningradsky railway station",
          position: { lat: 55.776405, lng: 37.655211 }
        }}
      />
    </Map>
  ))
  .add("with Polygon", () => {
    class TestPolygon extends React.Component {
      paths = [
        { lat: 55.776405, lng: 37.655211 },
        { lat: 55.776389, lng: 37.580278 },
        { lat: 55.7298476, lng: 37.6388022 },
        { lat: 55.7561392, lng: 37.6563434 }
      ];

      cbGetInstance = (polygon: google.maps.Polygon) => {
        polygon
          .getMap()
          .addListener('click', (e) => {
            polygon.setPath([ ...polygon.getPath().getArray(), e.latLng.toJSON()])
        })
      };

      render() {
        return (
          <Map city="Moscow">
            <Polygon
              options={{
                paths: this.paths,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: "#FF0000",
                fillOpacity: 0.35
              }}
              instance={this.cbGetInstance}
            />
          </Map>
        );
      }
    }
    return <TestPolygon/>;
  });
