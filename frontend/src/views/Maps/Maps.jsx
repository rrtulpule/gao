import React, { Component } from "react";
import { withProps, withStateHandlers } from "recompose";
import { bindActionCreators, compose } from "redux";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { BACKEND_HOST } from "../../host_config";
import axios from "axios";
// const {
//   MarkerWithLabel
// } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

// function Maps({ ...props }) {

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        // {
        //   lat: 37.14546191953482,
        //   lng: -121.41603810703123
        // },
        // {
        //   lat: 37.52906647204312,
        //   lng: -122.36065669390734
        // }
      ]
    };
  }
  componentDidMount() {
    axios.get(BACKEND_HOST + "/getnode").then(response => {
      //console.log("Status Code : ",response.data);
      //   if(response.data === 400){

      //     window.location = "/login"
      // }
      console.log("in get");
      console.log(response);
      this.loadData(response);
      console.log(this.state.data);
    });
  }
  loadData(response) {
    this.setState({
      data: this.state.data.concat(response.data)
    });
  }
  render() {
    const { classes } = this.props;

    let dataentr = [];
    for (var i = 0; i < this.state.data.length; i++) {
      dataentr.push(
        <Marker
          position={{
            lat: this.state.data[i].latitude,
            lng: this.state.data[i].longitude
          }}
          label={this.state.data[i].clusterid}
        />
      );
    }
    //console.log("rrr");
    //console.log();
    const CustomSkinMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{
            //lat: this.state.data[0].lat,
            //lng: this.state.data[0].lng
            lat: 37.14546191953482,
            lng: -121.41603810703123
          }}
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
          {/* <Marker
            position={{ lat: this.state.data[0].lat, lng:  this.state.data[0].lng }}
          /> */}

          {/* <Marker
            position={{ lat: 37.1454, lng: -121.41603810703123 }}
            label="1"
            labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
          /> */}
          {/* <MarkerWithLabel
            position={{ lat: 37.1454, lng: -121.41603810703123 }}
            labelAnchor={new GoogleMap.maps.Point(0, 0)}
            labelStyle={{
              backgroundColor: "yellow",
              fontSize: "32px",
              padding: "16px"
            }}
          /> */}
          <Marker
            position={{ lat: 37.1454, lng: -121.41603810703123 }}
            label="Cluster 1"
            icon="https://img.icons8.com/ultraviolet/40/000000/map-pin.png"
                      />
                               <Marker
            position={{ lat: 37.080928, lng:   -121.906357 }}
            label="Cluster 2"
            icon="https://img.icons8.com/ultraviolet/40/000000/map-pin.png"
                      />
                               <Marker
            position={{ lat: 37.341776 , lng: -121.719589 }}
            label="Cluster 3"
            icon="https://img.icons8.com/ultraviolet/40/000000/map-pin.png"
                      />

          {/* <Marker position={{ lat: 36.9749416, lng: -122.0285259 }} /> */}
          {/* <Marker position={{ lat: 36.9749416, lng: -122.0285259 }} /> */}
          {dataentr}
        </GoogleMap>
      ))
    );
    return (
      <CustomSkinMap
        googleMapURL=""
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        props={this.state.data}
      />
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
  //       position={{ lat: this.state.data[0].lat, lng: this.state.data[0].lng }}
  //       onClick={() => props.onMarkerClick()}
  //     >
  //       {props.isOpen && (
  //         <InfoWindow
  //           position={{
  //             lat: this.state.data[0].lat,
  //             lng: this.state.data[0].lng
  //           }}
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
  //       key={1}
  //       defaultZoom={18}
  //       defaultCenter={{
  //         lat: this.state.data[0].lat,
  //         lng: this.state.data[0].lng
  //       }}
  //     >
  //       {this.state.data.values.map(marker => {
  //         return <Marker key={1} marker={marker} />;
  //       })}
  //     </GoogleMap>
  //   ));

  //   return (
  //     <div>
  //       <MapWithMarkers
  //         data={this.state.data}
  //         googleMapURL=""
  //         loadingElement={<div style={{ height: `100%` }} />}
  //         containerElement={<div style={{ height: `400px` }} />}
  //         mapElement={<div style={{ height: `100%` }} />}
  //       />
  //     </div>
  //   );
  // }
}

export default Maps;
