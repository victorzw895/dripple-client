import React, { Component } from "react";
import SideNavMaterialUI from "../SideNavMaterialUI";
import axios from "axios";
import { Link } from "react-router-dom";

// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// core components
import GridItem from "../Material/Grid/GridItem.jsx";
import GridContainer from "../Material/Grid/GridContainer.jsx";
import CustomInput from "../Material/CustomInput/CustomInput.jsx";
import Button from "../Material/CustomButtons/Button.jsx";
import Card from "../Material/Card/Card.jsx";
import CardHeader from "../Material/Card/CardHeader.jsx";
import CardAvatar from "../Material/Card/CardAvatar.jsx";
import CardBody from "../Material/Card/CardBody.jsx";
import CardFooter from "../Material/Card/CardFooter.jsx";

const SERVER_URL = "http://www.localhost:3000/api/users/";
const user_id = localStorage.getItem("current_user_id");

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    console.log("HERE");
    axios.get(SERVER_URL + `/${user_id}.json`).then(result => {
      this.setState({ data: result.data });
      console.log(result.data);
    });
  }

  render() {
    const { classes } = this.props;
    const {
      name,
      profile_photo,
      about,
      age,
      birthday,
      hobbies
    } = this.state.data;

    return (
      <GridContainer style={{ height: "100vh", width: "100vw" }}>
        <SideNavMaterialUI />
        <GridItem xs={12} sm={12} md={8} style={{ margin: "0 auto" }}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>My Profile</h4>
              <p className={classes.cardCategoryWhite} />
            </CardHeader>
            <CardBody>
              <CardAvatar
                profile
                style={{
                  marginTop: "50px",
                  maxWidth: "200px",
                  maxHeight: "200px"
                }}
              >
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={profile_photo} alt="..." />
                </a>
              </CardAvatar>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={`Name: ${name}`}
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={`Age: ${age}`}
                    id="age"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={`Birthday: ${birthday &&
                      birthday.split("-").join("/")}`}
                    id="birthday"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel
                    style={{
                      color: "#AAAAAA",
                      fontSize: "1.5em",
                      marginTop: "20px"
                    }}
                  >
                    About me
                  </InputLabel>
                  <CustomInput
                    style={{ marginTop: "0px" }}
                    labelText={about}
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 0,
                      disabled: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel
                    style={{
                      color: "#AAAAAA",
                      fontSize: "1.5em",
                      marginTop: "20px"
                    }}
                  >
                    My Hobbies
                  </InputLabel>
                  <CustomInput
                    labelText={hobbies}
                    id="hobbies"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 0,
                      disabled: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">
                <Link
                  to={{
                    pathname: `/profile/${user_id}/edit`
                  }}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Edit Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

class ProfilePhoto extends Component {
  render() {
    return <img src={this.props.avatar} />;
  }
}

class RecentDripples extends Component {
  render() {
    return (
      <div>
        <p>Recent Dripples coming soon</p>
      </div>
    );
  }
}

class InfoSection extends Component {
  render() {
    const { name, about, age, birthday, hobbies } = this.props.info;

    return (
      <div>
        <h1>{name}</h1>
        <div className="general-info">
          <h3>General Information</h3>
          <p>Age: {age} </p>
          <p>Birthday: {birthday}</p>
          <p>About: {about}</p>
          <p>Hobbies: {hobbies}</p>
        </div>
      </div>
    );
  }
}

class Actions extends Component {
  render() {
    return (
      <div className="actions">
        <h3>Actions</h3>
        <div className="edit">
          <Link
            to={{
              pathname: `/profile/${user_id}/edit`
            }}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
