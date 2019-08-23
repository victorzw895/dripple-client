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
      <Button onClick={toggleDrawer("left", true)}>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M4.713 17.644c.473-.294 1.15-.61 2.021-.889.924.589 2.704 1.245 5.266 1.245s4.342-.656 5.266-1.245c.871.278 1.549.595 2.022.889-1.574 1.742-4.921 2.356-7.288 2.356s-5.713-.614-7.287-2.356zm14.208-4.54c-.225.64-.534 1.241-.92 1.786 2.533.839 3.999 2.111 3.999 3.11 0 1.631-3.896 4-10 4s-10-2.369-10-4c0-.999 1.466-2.271 3.999-3.11-.386-.545-.694-1.146-.919-1.786-3.07 1.086-5.08 2.873-5.08 4.896 0 3.313 5.373 6 12 6 6.629 0 12-2.687 12-6 0-2.023-2.01-3.809-5.079-4.896zm-1.587-2.388c0 2.919-2.386 5.284-5.334 5.284-2.947 0-5.333-2.365-5.333-5.284 0-2.917 2.087-5.918 5.333-10.716 3.247 4.798 5.334 7.799 5.334 10.716zm-7.334-3.643c0 1.586 2.667 1.159 2.667-1.447 0-.889-.374-1.729-.685-2.213-.656.964-1.982 2.572-1.982 3.66z" />
        </svg> */}
        <div className="side-bar-button" />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}
