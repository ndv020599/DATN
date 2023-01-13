import React, { useEffect, useState } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import Profile from "../Profile/Profile";
import HomePage from "../HomePage/HomePage";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { rootRoutes } from "../../rootRoute";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import avataImg from "../Home/089649792d00f55eac11.jpg";
import { Menu, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // fontFamily: "Roboto",
  },
  appBar: {
    backgroundColor: "#fff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#222a44",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Home() {
  let history = useHistory();
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [render, setRender] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios({
        method: "get",
        url: "http://localhost:4000/users/profile",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }).then((res) => {
        if (res.data.code === 200) {
          setRole(res.data.data.role);
          setName(res.data.data.name);
          setLogin(true);
        }
      });
      // history.push("/dashboard");
    } else {
      setLogin(false);
      history.push("/");
    }
  }, [render]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const openIcon = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const styleLink = {
    textDecoration: "none",
    color: "initial",
    display: "flex",
    alignItems: "center",
  };
  return (
    <>
      {login && (
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar className={clsx(classes.toolBar)}>
                {open ? (
                  <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={handleDrawerClose}
                    edge="start"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    style={{
                      color: "black",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    Hi, {name}
                  </Typography>
                  <IconButton color="primary" aria-label="log out" edge="end">
                    <Avatar alt="" src={avataImg} onClick={handleClick} />
                    <Menu
                      style={{ marginTop: 45 }}
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openIcon}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to="/dashboard/home" style={styleLink}>
                          <HomeIcon style={{ marginRight: 10 }} />
                          Trang chủ
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="/dashboard/profile" style={styleLink}>
                          <PersonIcon style={{ marginRight: 10 }} />
                          Hồ sơ
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ExitToAppIcon style={{ marginRight: 10 }} />
                        Đăng xuất
                      </MenuItem>
                    </Menu>
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://tlus.edu.vn/wp-content/uploads/2017/04/QC-Dai-hoc-Thuy-Loi.png"
                  alt="đại học thủy lợi"
                ></img>
              </div>
              <Divider />
              <List className="navbar">
                {rootRoutes
                  .filter((root) => root.role.includes(role))
                  .map((item, index) => (
                    <li key={index}>
                      <ListItemIcon className="navbar-item-button">
                        <NavLink
                          to={`/dashboard/${item.path}`}
                          className="navbar-item-link"
                        >
                          <i className="navbar-item-icon">{<item.icon />}</i>
                          <span
                            className="navbar-item-text"
                            style={{
                              fontFamily:
                                "Roboto, Helvetica, Arial, sans-serif",
                            }}
                          >
                            {item.name}
                          </span>
                        </NavLink>
                      </ListItemIcon>
                    </li>
                  ))}
              </List>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <Switch>
                {rootRoutes
                  .filter((root) => root.role.includes(role))
                  .map((item, index) => (
                    <Route key={index} exact path={`/dashboard/${item.path}`}>
                      {<item.component />}
                    </Route>
                  ))}
              </Switch>
            </main>
          </div>
        </Router>
      )}
    </>
  );
}
