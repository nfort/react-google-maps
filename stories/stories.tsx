import React from "react";
import { storiesOf } from "@storybook/react";
import Map from "../src/Map/Map";
import Marker from "../src/Marker/Marker";
import Polygon from "../src/Polygon/Polygon";
import DrawingManager from "../src/DrawingManager/DrawingManager";

const optionsMap = {
  center: { lat: 55.751244, lng: 37.618423 },
  zoom: 10,
  disableDefaultUI: true,
  zoomControl: false
};

storiesOf("Map", module)
  .add("default", () => <Map height="600px" options={optionsMap} />)
  .add("with Markers", () => (
    <Map height="600px" options={optionsMap}>
      {map => (
        <React.Fragment>
          <Marker
            map={map}
            options={{
              title: "Red Square",
              position: { lat: 55.754093, lng: 37.620407 }
            }}
          />
          <Marker
            map={map}
            options={{
              title: "Paveletskaya railway station",
              position: { lat: 55.7298476, lng: 37.6388022 }
            }}
          />
          <Marker
            map={map}
            options={{
              title: "Belorussky railway station",
              position: { lat: 55.776389, lng: 37.580278 }
            }}
          />
          <Marker
            map={map}
            options={{
              title: "Kiyevsky railway station",
              position: { lat: 55.7561392, lng: 37.6563434 }
            }}
          />
          <Marker
            map={map}
            options={{
              title: "Leningradsky railway station",
              position: { lat: 55.776405, lng: 37.655211 }
            }}
          />
        </React.Fragment>
      )}
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
        polygon.getMap().addListener("click", e => {
          polygon.setPath([...polygon.getPath().getArray(), e.latLng.toJSON()]);
        });
      };

      render() {
        return (
          <Map height="600px" options={optionsMap}>
            {map => (
              <Polygon
                map={map}
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
            )}
          </Map>
        );
      }
    }
    return <TestPolygon />;
  })
  .add("drawingManager", () => {
    class TestDrawingManager extends React.Component {
      cbGetInstance = (drawingManager: google.maps.drawing.DrawingManager) => {
        console.log(DrawingManager);
      };

      render() {
        return (
          <Map height="600px" options={optionsMap}>
            {map => (
              <DrawingManager
                map={map}
                options={{
                  drawingMode: google.maps.drawing.OverlayType.POLYGON
                }}
                instance={this.cbGetInstance}
              />
            )}
          </Map>
        );
      }
    }

    return <TestDrawingManager />;
  });
