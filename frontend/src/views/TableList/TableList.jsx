import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tablejsx from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { BACKEND_HOST } from "../../host_config";
import { TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      node_number: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getdata = this.getdata.bind(this);
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
      // this.sortAscending();
    });
  }
  loadData(response) {
    const data = JSON.stringify(response.data);

    this.setState({
      data: this.state.data.concat(response.data)
      //ownerkey :response.data[0].ownerkey
    });
  }
  calanger(data) {
    var temp =
      this.state.data[data].humidity +
      this.state.data[data].temperature +
      this.state.data[data].wind +
      this.state.data[data].rainfall;
    if (temp >800) {
      return "High";
    } else {
      return "Low";
    }
  }
  sortAscending = () => {
    const { data } = this.state;
    data.sort((a, b) => a - b);
    this.setState({ data: data });
    console.log(this.state.data);
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  getdata = e => {
    e.preventDefault();
    const data = {
      node_number: this.state.node_number,
    };
    console.log(data);
  };
  render() {
    const { classes } = this.props;
    let dataentr = [];

    for (var i = 0; i < this.state.data.length; i++) {
      dataentr.push(
        <TableRow key={this.state.data[i].nodeID}>
          <TableCell align="right">{this.state.data[i].nodeId}</TableCell>
          <TableCell align="right">{this.state.data[i].latitude}</TableCell>
          <TableCell align="right">{this.state.data[i].longitude}</TableCell>
          <TableCell align="right">{this.state.data[i].wind}</TableCell>
          <TableCell align="right">{this.state.data[i].temperature}</TableCell>
          <TableCell align="right">{this.state.data[i].rainfall}</TableCell>
          <TableCell align="right">{this.state.data[i].humidity}</TableCell>
          <TableCell align="right">{this.state.data[i].clusterid}</TableCell>
          <TableCell align="right">{this.calanger(i)}</TableCell>
        </TableRow>
      );
    }

    return (
      <GridContainer>
       <TextField
          id="node_number"
          label="Node Number"
          placeholder="Node Number"
          className={classes.textField}
          value={this.state.node_number}
          onChange={this.handleChange("node_number")}
          margin="normal"
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.getdata}
        >
        Get Data
      </Button>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="success">
              <h4 className={classes.cardTitleWhite}>Node Details</h4>
              <p className={classes.cardCategoryWhite}>
                Here are all the Nodes on the field.
              </p>
            </CardHeader>
            <CardBody>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    {/* <TableCell align="right">City</TableCell>
                    <TableCell align="right">County</TableCell> */}
                    <TableCell align="right">Latitude</TableCell>
                    <TableCell align="right">Longitude</TableCell>
                    {/* <TableCell align="right">Postal Code</TableCell>
                    <TableCell align="right">Installed By</TableCell> */}
                    <TableCell align="right">Wind</TableCell>
                    <TableCell align="right">Temperature</TableCell>
                    <TableCell align="right">Rainfall</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                    <TableCell align="right">Cluser ID</TableCell>
                    <TableCell align="right">Danger Level</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))} */}
                  {dataentr}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(TableList);
