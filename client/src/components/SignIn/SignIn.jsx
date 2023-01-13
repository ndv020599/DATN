import React, { useEffect, useRef, useState } from "react";

import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { SignInService } from "../../Service/SigninService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignIn(props) {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios({
        method: "get",
        url: "http://localhost:4000/users/profile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data.code === 200) {
          history.push("/dashboard/home");
        }
      });
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    SignInService({ email, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 404) {
          toast.error(res.data.message);
        } else if (res.data.code === 200) {
          localStorage.setItem("token", res.data.data.token);
          history.push("/dashboard/home");
        }
      })
      .catch(function (err) {
        toast.error("Có lỗi xảy ra");
      });
  };
  return (
    <>
      <div id="particle-canvas">
        <img
          src="https://vcdn1-vnexpress.vnecdn.net/2022/01/12/148434662-2961600134114291-582-5826-3299-1641953408.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=xI2TWT9NqOcCKRKrlrAVuQ"
          style={{ width: "100%", height: "100%" }}
          alt="Đại học Thủy Lợi"
        ></img>
      </div>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      />
      <Dialog open={true} className="sign-in-form">
        <DialogTitle>THƯ VIỆN ĐẠI HỌC THỦY LỢI</DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit()}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <img src="https://upload.wikimedia.org/wikipedia/vi/b/bc/Logo-Thuy_Loi.png" />
              </Grid>
              <Grid item xs={6} md={6}>
                <Grid item xs={12} md={12} style={{ marginBottom: 20 }}>
                  <TextValidator
                    label="Tài Khoản"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="username"
                    value={email}
                    size="small"
                    validators={["required"]}
                    errorMessages={["Bắt buộc phải nhập"]}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} mt={12}>
                  <TextValidator
                    label="Mật khẩu"
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="password"
                    size="small"
                    validators={["required"]}
                    errorMessages={["Bắt buộc phải nhập"]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" color="primary">
              Đăng nhập
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
}
