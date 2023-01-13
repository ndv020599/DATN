import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import Divider from "@material-ui/core/Divider";
import { UserProfileService } from "../../Service/UserService";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@material-ui/core";
import {
  EditProfileService,
  EditChangePasswordService,
} from "../../Service/UserService";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InsetDividers() {
  const classes = useStyles();
  const [profileUser, setProFileUser] = useState([]);
  const [checkEdit, setCheckEdit] = useState(true);
  const [checkPass, setCheckPass] = useState(false);
  const [pass, setPass] = useState({});
  //   axios({
  //     method: "get",
  //     url: "http://localhost:4000/users/profile",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => console.log(res));
  const handleEditProfile = () => {
    setCheckEdit(false);
  };
  const handleCancel = () => {
    setCheckEdit(true);
    setCheckPass(false);
  };
  const handleEditSubmit = (id, data) => {
    EditProfileService(id, data).then((res) => {
      if (res.data.code === 200) {
        setCheckEdit(true);
        toast.success(res.data.message);
      }
    });
  };
  const handleChangePass = () => {
    EditChangePasswordService(pass).then((res) => {
      if (res.data.code === 200) {
        setCheckEdit(true);
        setCheckPass(false);
        toast.success(res.data.message);
        setPass({});
      } else {
        toast.error(res.data.message);
      }
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    UserProfileService()
      .then((res) => {
        if (res.data.code === 200) {
          setProFileUser(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      ></ToastContainer>

      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="MÃ ĐỘC GIẢ" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 10 }}
            value={profileUser.user_code}
            onChange={(e) =>
              setProFileUser({ ...profileUser, user_code: e.target.value })
            }
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="KHOA" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 10 }}
            value={profileUser.user_faculty}
            onChange={(e) =>
              setProFileUser({ ...profileUser, user_faculty: e.target.value })
            }
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ĐƠN VỊ" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 10 }}
            value={profileUser.user_class}
            onChange={(e) =>
              setProFileUser({ ...profileUser, user_class: e.target.value })
            }
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="HỌ TÊN" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 10 }}
            value={profileUser.name}
            onChange={(e) =>
              setProFileUser({ ...profileUser, name: e.target.value })
            }
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SỐ ĐIỆN THOẠI" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 0, marginLeft: 0 }}
            value={profileUser.phone}
            onChange={(e) =>
              setProFileUser({ ...profileUser, phone: e.target.value })
            }
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="EMAIL" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 10 }}
            value={profileUser.email}
            onChange={(e) =>
              setProFileUser({ ...profileUser, email: e.target.value })
            }
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ĐỊA CHỈ" />
          <TextField
            disabled={checkEdit}
            style={{ paddingLeft: 10 }}
            value={profileUser.address}
            onChange={(e) =>
              setProFileUser({ ...profileUser, address: e.target.value })
            }
          ></TextField>
        </ListItem>
        {checkPass && (
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="MẬT KHẨU CŨ" />
              <TextField
                disabled={!checkPass}
                style={{ paddingLeft: 10 }}
                value={pass.oldPassword ? pass.oldPassword : ""}
                onChange={(e) =>
                  setPass({ ...pass, oldPassword: e.target.value })
                }
              ></TextField>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="MẬT KHẨU MỚI" />
              <TextField
                disabled={!checkPass}
                style={{ paddingLeft: 10 }}
                value={pass.newPassword ? pass.newPassword : ""}
                onChange={(e) =>
                  setPass({ ...pass, newPassword: e.target.value })
                }
              ></TextField>
            </ListItem>
          </>
        )}
      </List>
      <Button
        style={{
          backgroundColor: "#1976d2",
          marginRight: 5,
          marginBottom: 5,

          color: "#fff",
        }}
        variant="contained"
        onClick={() => handleEditProfile()}
      >
        Sửa thông tin
      </Button>
      {!checkEdit && (
        <>
          <Button
            style={{
              backgroundColor: "#007b8f",
              color: "#fff",
              marginBottom: 5,
            }}
            variant="contained"
            onClick={() => handleEditSubmit(profileUser.user_id, profileUser)}
          >
            Lưu thông tin
          </Button>
        </>
      )}
      <Button
        style={{
          backgroundColor: "#1976d2",
          color: "#fff",
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
        }}
        variant="contained"
        onClick={() => setCheckPass(true)}
      >
        Đổi mật khẩu
      </Button>
      {checkPass && (
        <Button
          style={{
            backgroundColor: "#007b8f",
            color: "#fff",
            marginRight: 5,
            marginBottom: 5,
          }}
          variant="contained"
          onClick={() => handleChangePass()}
        >
          Lưu mật khẩu
        </Button>
      )}
      {(checkPass || !checkEdit) && (
        <Button
          style={{
            backgroundColor: "#ff9e43",
            color: "#fff",
            marginBottom: 5,
          }}
          variant="contained"
          onClick={() => handleCancel()}
        >
          Hủy
        </Button>
      )}
    </>
  );
}
