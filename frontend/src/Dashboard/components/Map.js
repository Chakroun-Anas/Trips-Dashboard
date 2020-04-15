/*global google*/
import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  FusionTablesLayer
} from "react-google-maps";
import "./Map.css";
const {
  MarkerWithLabel
} = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const config = require("../../config.json");

const destinations = [
  {
    countryName: "FRANCE",
    markerPosition: {
      lat: 47.431225,
      lng: 1.962765
    }
  },
  {
    countryName: "EGYPT",
    markerPosition: {
      lat: 27.103921,
      lng: 29.073204
    }
  },
  {
    countryName: "JAPAN",
    markerPosition: {
      lat: 36.122138,
      lng: 138.561406
    }
  },
  {
    countryName: "RUSSIA",
    markerPosition: {
      lat: 55.086109,
      lng: 38.826584
    }
  },
  {
    countryName: "TURKEY",
    markerPosition: {
      lat: 39.183919,
      lng: 35.281361
    }
  }
];

class MapContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 47.431225,
        lng: 1.962765
      },
      currentCountry: "FRANCE",
      draggable: true,
      mapLoaded: false,
      showSecondGuide: false,
      showAdjustingPolygonGuide: false
    };
  }

  render() {
    const { draggable, center, mapLoaded, currentCountry } = this.state;
    const { countriesTotalVisitors } = this.props;
    return (
      <div style={{ marginTop: 60 }}>
        {countriesTotalVisitors && (
          <GoogleMap
            center={center}
            defaultZoom={4}
            options={{
              styles: [
                {
                  featureType: "administrative.country",
                  stylers: [{ visibility: "off" }]
                }
              ],
              mapTypeId: google.maps.MapTypeId.HYBRID,
              draggable,
              scrollwheel: false
              // zoomControl: false
            }}
            onTilesLoaded={() => {
              if (!mapLoaded) {
                this.setState({
                  mapLoaded: true
                });
              }
            }}
          >
            <FusionTablesLayer
              url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
              options={{
                query: {
                  select: "geometry",
                  from: "1S4aLkBE5u_WS0WMVSchhBgMLdAARuPEjyW4rs20"
                },
                styles: [
                  {
                    polylineOptions: {
                      strokeColor: "#333333",
                      strokeWeight: 2
                    }
                  }
                ]
              }}
            />
            {destinations.map(destination => {
              return (
                <React.Fragment key={destination.countryName}>
                  <MarkerWithLabel
                    icon={{
                      url:
                        currentCountry === destination.countryName
                          ? "https://image.ibb.co/ebS9yA/green-circle.png"
                          : "https://image.ibb.co/bPARvq/red-circle.png",
                      scaledSize: new google.maps.Size(40, 40)
                    }}
                    position={destination.markerPosition}
                    labelAnchor={new google.maps.Point(12, 28)}
                    labelStyle={{
                      color: "white",
                      fontSize: "15px",
                      fontFamily: "Cougette"
                    }}
                    onClick={() => {
                      this.setState(
                        {
                          currentCountry: destination.countryName
                        },
                        () => {
                          this.props.changeCountry(destination.countryName);
                        }
                      );
                    }}
                  >
                    <span>
                      {countriesTotalVisitors[destination.countryName]}
                    </span>
                  </MarkerWithLabel>
                  <MarkerWithLabel
                    icon={{
                      url: ""
                    }}
                    position={destination.markerPosition}
                    labelAnchor={new google.maps.Point(20, -5)}
                    labelStyle={{
                      color: "white",
                      fontSize: "15px",
                      fontFamily: "Cougette"
                    }}
                  >
                    <span>{destination.countryName}</span>
                  </MarkerWithLabel>
                </React.Fragment>
              );
            })}
          </GoogleMap>
        )}
      </div>
    );
  }
}

const Map = withScriptjs(withGoogleMap(MapContent));

export default props => (
  <Map
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
      config.googleMapApiKey
    }`}
    loadingElement={<div style={{ height: "100%" }} />}
    containerElement={
      <div
        style={{
          position: "fixed",
          top: "88px",
          left: 0,
          right: 0,
          bottom: "50px"
        }}
      />
    }
    mapElement={<div style={{ height: "100%" }} />}
    {...props}
  />
);
