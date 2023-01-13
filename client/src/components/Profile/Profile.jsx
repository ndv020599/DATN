import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import WebIcon from "@material-ui/icons/WebOutlined";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dividers from "./Dividers";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    fontWeight: "fontWeightBold",
  },
  // button: {
  //   margin: theme.spacing(1),
  //   padding: "43px",
  //   fontSize: "72px",
  //   "&:hover": {
  //     background: "#3f51b5",
  //     color: "white",
  //   },
  // },
  head: {
    fontSize: "50px",
    variant: "h2",
  },
}));

export default function Profile() {
  const classes = useStyles();
  <ToastContainer
    autoClose={2000}
    draggable={false}
    limit={3}
    theme="colored"
  ></ToastContainer>;
  function WebIcons(props) {
    return (
      <WebIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </WebIcon>
    );
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Box className={classes.paper}>
            <Dividers></Dividers>
          </Box>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRowTwo() {
    return (
      <React.Fragment>
        <Grid item xs={8}>
          <Box className={classes.paper}>
            <Box>
              <Typography variant="h4" color="primary" component="p">
                <img
                  src="https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Typography>
            </Box>
          </Box>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12}>
          <Box fontWeight="fontWeightLight" m={1}>
            <Typography className={classes.head} color="primary" component="p">
              HỒ SƠ CỦA TÔI
            </Typography>{" "}
          </Box>
        </Grid>
        <Grid container item xs={6} sm={6} spacing={1}>
          <FormRow />
        </Grid>
        <Grid container item direction="row" xs={6} sm={6} spacing={2}>
          <FormRowTwo />
        </Grid>
      </Grid>
    </div>
  );
}
