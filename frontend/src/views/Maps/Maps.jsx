import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

// function Maps({ ...props }) {

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "aa"
    };
  }
  render() {
    const { classes } = this.props;

    const CustomSkinMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{ lat: 37.496904, lng: -122.3330573 }}
          defaultOptions={{
            scrollwheel: false,
            zoomControl: true,
            styles: [
              {
                featureType: "water",
                stylers: [
                  { saturation: 43 },
                  { lightness: -11 },
                  { hue: "#0088ff" }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                  { hue: "#ff0000" },
                  { saturation: -100 },
                  { lightness: 99 }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#808080" }, { lightness: 54 }]
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{ color: "#ece2d9" }]
              },
              {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#ccdca1" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#767676" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }]
              },
              { featureType: "poi", stylers: [{ visibility: "off" }] },
              {
                featureType: "landscape.natural",
                elementType: "geometry.fill",
                stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
              },
              { featureType: "poi.park", stylers: [{ visibility: "on" }] },
              {
                featureType: "poi.sports_complex",
                stylers: [{ visibility: "on" }]
              },
              { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
              {
                featureType: "poi.business",
                stylers: [{ visibility: "simplified" }]
              }
            ]
          }}
        >
          <Marker
            position={{ lat: 37.336789521171994, lng: -121.89335409468015 }}
          />

          <Marker position={{ lat: 37.14546191953482, lng: -121.41603810703123 }} />
          <Marker position={{ lat: 37.52906647204312, lng: -122.36065669390734 }} />

          <Marker position={{ lat: 36.9749416, lng: -122.0285259 }} />
          <Marker position={{ lat: 36.9749416, lng: -122.0285259 }} />
        </GoogleMap>
      ))
    );
    return (
      <CustomSkinMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqVpCP6H8Hg5k7HI-NiClJjcKDnLRk26k"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        props={this.state.data}
      />
      // <GoogleMapReact
      //   bootstrapURLKeys={{
      //     key:
      //       "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqVpCP6H8Hg5k7HI-NiClJjcKDnLRk26k"
      //   }}
      //   defaultCenter={{ lat: 37.496904, lng: -122.3330573 }}
      //   defaultZoom={this.props.zoom}
      // >
      //   <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      // </GoogleMapReact>
    );
  }
  // render() {
  //   const { data } = this.props;

  //   const marketState = withStateHandlers(
  //     {
  //       isOpen: false
  //     },
  //     {
  //       onMarkerClick: ({ isOpen }) => () => ({ isOpen: !isOpen })
  //     }
  //   );

  //   // This is the key!
  //   const MarkerPoint = compose(marketState)(props => (
  //     <Marker
  //       key={props.marker.input_session}
  //       position={{ lat: props.marker.lat, lng: props.marker.lng }}
  //       onClick={() => props.onMarkerClick()}
  //     >
  //       {props.isOpen && (
  //         <InfoWindow
  //           position={{ lat: props.marker.lat, lng: props.marker.lng }}
  //           onCloseClick={() => props.onMarkerClick()}
  //         >
  //           <h6>Data:{props.marker.input_session}</h6>
  //         </InfoWindow>
  //       )}
  //     </Marker>
  //   ));

  //   const MapWithMarkers = compose(
  //     withScriptjs,
  //     withGoogleMap
  //   )(props => (
  //     <GoogleMap
  //       key={props.data.name}
  //       defaultZoom={18}
  //       defaultCenter={{
  //         lat: props.data.values[0].lat,
  //         lng: props.data.values[0].lng
  //       }}
  //     >
  //       {props.data.values.map(marker => {
  //         return <MarkerPoint marker={marker} />;
  //       })}
  //     </GoogleMap>
  //   ));

  //   return (
  //     <div>
  //       <MapWithMarkers
  //         data={this.props.data}
  //         googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqVpCP6H8Hg5k7HI-NiClJjcKDnLRk26k"
  //         loadingElement={<div style={{ height: `100%` }} />}
  //         containerElement={<div style={{ height: `400px` }} />}
  //         mapElement={<div style={{ height: `100%` }} />}
  //       />
  //     </div>
  //   );
  // }
}

export default Maps;
