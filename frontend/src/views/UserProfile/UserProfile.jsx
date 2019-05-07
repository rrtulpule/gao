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
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { BACKEND_HOST } from "../../host_config"

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
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200,
  // },
};

//function UserProfile(props) {
class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      node_number: "",
      installed_by: "",
      longitude: "",
      latitude: "",
      city: "",
      county: "",
      clusterid: "",
      postalcode: "",
      checkbutton: 0
    };

    this.signout = this.signout.bind(this);
    this.addnode = this.addnode.bind(this);
    this.updatenode = this.updatenode.bind(this);
    this.deletenode = this.deletenode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onbuttonclickadd = this.onbuttonclickadd.bind(this);
    this.onbuttonclickdelete = this.onbuttonclickdelete.bind(this);
    this.onbuttonclickupdate = this.onbuttonclickupdate.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

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
  addnode = e => {
    var headers = new Headers();

    //prevent page from refresh
    e.preventDefault();
    const data = {
      node_number: this.state.node_number,
      installed_by: this.state.installed_by,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      city: this.state.city,
      county: this.state.county,
      clusterid: this.state.clusterid,
      postalcode: this.state.postalcode
    };
    // this.setState({
    //     authFlag:true
    //   });
    console.log(data);
    axios.defaults.withCredentials = true;

    axios.post(BACKEND_HOST + "/addnode", data).then(response => {
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
  updatenode = e => {
    var headers = new Headers();

    //prevent page from refresh
    e.preventDefault();
    const data = {
      node_number: this.state.node_number,
      installed_by: this.state.installed_by,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      city: this.state.city,
      county: this.state.county,
      clusterid: this.state.clusterid,
      postalcode: this.state.postalcode
    };
    // this.setState({
    //     authFlag:true
    //   });
    console.log(data);
    axios.defaults.withCredentials = true;

    axios.post(BACKEND_HOST + "/updatenode", data).then(response => {
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
      node_number: this.state.node_number,
      postalcode: this.state.postalcode
    };
    // this.setState({
    //     authFlag:true
    //   });
    console.log(data);
    axios.defaults.withCredentials = true;

    axios.post(BACKEND_HOST + "/deletenode", data).then(response => {
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
    this.setState({ checkbutton: 1 });
  };
  onbuttonclickadd = e => {
    this.setState({ checkbutton: 0 });
  };
  onbuttonclickupdate = e => {
    this.setState({ checkbutton: 2 });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="info" onClick={this.onbuttonclickadd}>
          Add Node
        </Button>
        <Button color="info" onClick={this.onbuttonclickdelete}>
          Delete Node
        </Button>
        <Button color="info" onClick={this.onbuttonclickupdate}>
          Update Node
        </Button>

        {this.state.checkbutton == 0 && (
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Add Node</h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete Data of the Node
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Location (California)"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      {/* <CustomInput
                      labelText="Node Number"
                      id="name"
                      value={this.state.node_number}
                      onChange={this.handleChange("node_number")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="name"
                        label="Node Number"
                        placeholder="Node Number"
                        className={classes.textField}
                        value={this.state.node_number}
                        onChange={this.handleChange("node_number")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Installed By"
                      id="installed"
                      onChange={this.handleChange("installed_by")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="installedby"
                        label="Installed By"
                        placeholder="Installed By"
                        className={classes.textField}
                        value={this.state.installed_by}
                        onChange={this.handleChange("installed_by")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Longitude"
                      id="longitude"
                      onChange={this.handleChange("longitude")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="longitude"
                        label="Longitude"
                        placeholder="Longitude"
                        className={classes.textField}
                        value={this.state.longitude}
                        onChange={this.handleChange("longitude")}
                        margin="normal"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Latitude"
                      id="latitude"
                      onChange={this.handleChange("latitude")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="Latitude"
                        label="Latitude"
                        placeholder="Latitude"
                        className={classes.textField}
                        value={this.state.latitude}
                        onChange={this.handleChange("latitude")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Longitude"
                      id="longitude"
                      onChange={this.handleChange("longitude")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="clusterid"
                        label="Cluster ID"
                        placeholder="Cluster ID"
                        className={classes.textField}
                        value={this.state.clusterid}
                        onChange={this.handleChange("clusterid")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="City"
                      id="city"
                      onChange={this.handleChange("city")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="city"
                        label="City"
                        placeholder="City"
                        className={classes.textField}
                        value={this.state.city}
                        onChange={this.handleChange("city")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="County"
                      onChange={this.handleChange("county")}
                      id="county"
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="county"
                        label="County"
                        placeholder="County"
                        className={classes.textField}
                        value={this.state.county}
                        onChange={this.handleChange("county")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      onChange={this.handleChange("postal_code")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="postalcode"
                        label="Postal Code"
                        placeholder="Postal Code"
                        className={classes.textField}
                        value={this.state.postalcode}
                        onChange={this.handleChange("postalcode")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.addnode}>
                    Add Node
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        )}

        {/* //Update */}

        {this.state.checkbutton == 2 && (
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Update Node</h4>
                  <p className={classes.cardCategoryWhite}>Update Data</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12}>
                      {/* <CustomInput
                      labelText="Node Number"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="node_number"
                        label="Node Number"
                        placeholder="Node Number"
                        className={classes.textField}
                        value={this.state.node_number}
                        onChange={this.handleChange("node_number")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Longitude"
                      id="longitude"
                      onChange={this.handleChange("longitude")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="longitude"
                        label="Longitude"
                        placeholder="Longitude"
                        className={classes.textField}
                        value={this.state.longitude}
                        onChange={this.handleChange("longitude")}
                        margin="normal"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Latitude"
                      id="latitude"
                      onChange={this.handleChange("latitude")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="Latitude"
                        label="Latitude"
                        placeholder="Latitude"
                        className={classes.textField}
                        value={this.state.latitude}
                        onChange={this.handleChange("latitude")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Longitude"
                      id="longitude"
                      onChange={this.handleChange("longitude")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="clusterid"
                        label="Cluster ID"
                        placeholder="Cluster ID"
                        className={classes.textField}
                        value={this.state.clusterid}
                        onChange={this.handleChange("clusterid")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="City"
                      id="city"
                      onChange={this.handleChange("city")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="city"
                        label="City"
                        placeholder="City"
                        className={classes.textField}
                        value={this.state.city}
                        onChange={this.handleChange("city")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="County"
                      onChange={this.handleChange("county")}
                      id="county"
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="county"
                        label="County"
                        placeholder="County"
                        className={classes.textField}
                        value={this.state.county}
                        onChange={this.handleChange("county")}
                        margin="normal"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      onChange={this.handleChange("postal_code")}
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="postalcode"
                        label="Postal Code"
                        placeholder="Postal Code"
                        className={classes.textField}
                        value={this.state.postalcode}
                        onChange={this.handleChange("postalcode")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.updatenode}>
                    Update Node
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        )}

        {this.state.checkbutton == 1 && (
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Delete Node</h4>
                  <p className={classes.cardCategoryWhite}>
                    Enter Details to Delete
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      {/* <CustomInput
                      labelText="Node Number"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    /> */}
                      <TextField
                        id="node_number"
                        label="Node Number"
                        placeholder="Node Number"
                        className={classes.textField}
                        value={this.state.node_number}
                        onChange={this.handleChange("node_number")}
                        margin="normal"
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      {/* <CustomInput
                        labelText="Postal Code"
                        id="postal-code"
                        formControlProps={{
                          fullWidth: true
                        }}
                      /> */}
                      <TextField
                        id="postalcode"
                        label="Postal Code"
                        placeholder="Postal Code"
                        className={classes.textField}
                        value={this.state.postalcode}
                        onChange={this.handleChange("postalcode")}
                        margin="normal"
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={this.deletenode}>
                    Delete Node
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
