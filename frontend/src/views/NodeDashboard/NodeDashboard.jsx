import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import avatar from "assets/img/faces/marc.jpg";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { BACKEND_HOST } from "../../host_config";
import ReactSpeedometer from "react-d3-speedometer";
import { Container, Row, Col } from "react-grid-system";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class NodeDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clusterid: "",
      name: "",
      checkbutton: true
    };

    this.signout = this.signout.bind(this);
    this.addnode = this.addnode.bind(this);
    this.onbuttonclickadd = this.onbuttonclickadd.bind(this);
    this.onbuttonclickdelete = this.onbuttonclickdelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signout = e => {
    //console.log("lll");
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ]
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addnode = e => {
    var headers = new Headers();

    //prevent page from refresh
    e.preventDefault();
    const data = {
      clusterid: this.state.clusterid,
      name: this.state.name
    };
    // this.setState({
    //     authFlag:true
    //   });
    console.log(data);
    axios.defaults.withCredentials = true;

    axios.post(BACKEND_HOST + "/addcluster", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };
  deletenode = e => {
    var headers = new Headers();

    //prevent page from refresh
    e.preventDefault();
    const data = {
      clusterid: this.state.clusterid
    };
    // this.setState({
    //     authFlag:true
    //   });
    console.log(data);
    axios.defaults.withCredentials = true;

    axios.post(BACKEND_HOST + "/deletecluster", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };
  onbuttonclickdelete = e => {
    this.setState({ checkbutton: false });
  };
  onbuttonclickadd = e => {
    this.setState({ checkbutton: true });
  };

  render() {
    // const { classes } = this.props;

    return (
      <div>
        <Container>
          <Row>
            <Col sm={4}>
              <h3>Wind</h3>
              <ReactSpeedometer
                value={500}
                needleColor="steelblue"
                needleTransitionDuration={8000}
                needleTransition="easeElastic"
              />
            </Col>
            <Col sm={4}>
              <h3>Temperature</h3>
              <ReactSpeedometer
                value={76}
                needleColor="steelblue"
                needleTransitionDuration={8000}
                needleTransition="easeElastic"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <h3>Humidity</h3>
              <ReactSpeedometer
                value={600}
                needleColor="steelblue"
                needleTransitionDuration={8000}
                needleTransition="easeElastic"
              />
            </Col>
            <Col sm={4}>
              <h3>Rainfall</h3>
              <ReactSpeedometer
                value={888}
                needleColor="steelblue"
                needleTransitionDuration={8000}
                needleTransition="easeElastic"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withStyles(styles)(NodeDashboard);
