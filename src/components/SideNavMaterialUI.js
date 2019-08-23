import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
const user_id = localStorage.getItem("current_user_id");

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  let links;
  if (localStorage.getItem("jwt") && localStorage.getItem("current_user_id")) {
    links = (
      <List>
        <ListItem
          button
          component={Link}
          to={`/profile/${user_id}`}
          key="Profile"
        >
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/logout" key="Log Out">
          <ListItemText primary="Log Out" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/dropspace" key="DropSpace">
          <ListItemText primary="DropSpace" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/search_dripples"
          key="Search Dripples"
        >
          <ListItemText primary="Search Dripples" />
        </ListItem>
        <ListItem button component={Link} to="/map" key="Map">
          <ListItemText primary="View Map" />
        </ListItem>
        <ListItem button component={Link} to="/chat" key="Conversation">
          <ListItemText primary="Chat" />
        </ListItem>
      </List>
    );
  } else {
    links = (
      <List>
        <ListItem button component={Link} to="/login" key="Log in">
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} to="/signup" key="Sign Up">
          <ListItemText primary="Sign Up" />
        </ListItem>
      </List>
    );
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      {links}
    </div>
  );

  return (
    <div className="side-nav-bar">
      <Button
        onClick={toggleDrawer("left", true)}
        style={{
          width: "70px",
          height: "70px",
          position: "fixed",
          top: "43%",
          left: "-45px",
          background: "rgb(154, 72, 177)",
          borderRadius: "90%"
        }}
      />
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
