import React from "react";
import { storiesOf } from "@storybook/react";
import Map from "../src/Map/Map";
import Marker from "../src/Marker/Marker";
import Polygon from "../src/Polygon/Polygon";
import DrawingManager from "../src/DrawingManager/DrawingManager";

const GOOGLE_MAPS_KEY = "AIzaSyDbTuK4yijUzrJjTh852cEQuN5LN35FeYo";

const optionsMap = {
  center: { lat: 55.751244, lng: 37.618423 },
  zoom: 10,
  disableDefaultUI: true,
  zoomControl: false
};

// Implementation code where T is the returned data shape
function api<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json().then(data => data as T);
  });
}

function randomInteger(min: number, max: number) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

storiesOf("Map", module)
  .add("default", () => (
    <Map APIKey={GOOGLE_MAPS_KEY} height="600px" options={optionsMap} />
  ))
  .add("with Markers", () => (
    <Map APIKey={GOOGLE_MAPS_KEY} height="600px" options={optionsMap}>
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
          <Map APIKey={GOOGLE_MAPS_KEY} height="600px" options={optionsMap}>
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
          <Map APIKey={GOOGLE_MAPS_KEY} height="600px" options={optionsMap}>
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
  })
  .add("line metro", () => {
    interface Station {
      id: string;
      name: string;
      lat: number;
      lng: number;
      order: number;
    }

    interface Line {
      id: string;
      hex_color: string;
      name: string;
      stations: Station[];
    }

    interface MetroJson {
      id: string;
      name: string;
      lines: Line[];
    }

    class LineMetro extends React.Component<{}, { metro: null | MetroJson }> {
      constructor(props: any) {
        super(props);
        this.state = {
          metro: null
        };
      }

      componentDidMount(): void {
        api<MetroJson>("https://api.hh.ru/metro/1").then(res => {
          this.setState({ metro: res });
          res.lines.map(item =>
            item.stations.map(station => console.log(`[${station.name}],`))
          );
        });
      }

      static getIcon(color: string, line: string) {
        const colors = ["FF0000", "00FF00", "0000FF"];
        const _color = colors[randomInteger(0, 2)];

        return `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${line[0].toUpperCase()}|${_color}|FFFF00`;
      }

      render(): React.ReactNode {
        const { metro } = this.state;

        if (!metro) return null;

        return (
          <Map APIKey={GOOGLE_MAPS_KEY} height="600px" options={optionsMap}>
            {map => {
              const transitLayer = new google.maps.TransitLayer();
              transitLayer.setMap(map);

              return metro.lines.map(function(line) {
                return line.stations.map(function(station) {
                  return (
                    <Marker
                      map={map}
                      options={{
                        title: line.name,
                        icon: {
                          path: google.maps.SymbolPath.CIRCLE,
                          fillColor: "#00F",
                          fillOpacity: 0.6,
                          strokeColor: "#00A",
                          strokeOpacity: 0.9,
                          strokeWeight: 1,
                          scale: 7
                        },
                        position: { lat: station.lat, lng: station.lng }
                      }}
                    />
                  );
                });
              });
            }}
          </Map>
        );
      }
    }

    return <LineMetro />;
  });
