import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  EditProfileService,
  AddNewUserService,
} from "../../Service/UserService";

export default function UserDialogUpdate(props) {
  const { handleClose, open, item, updateTableData } = props;

  const [user, setUser] = useState({
    user_id: "",
    name: "",
    user_code: "",
    email: "",
    address: "",
    phone: "",
    user_class: "",
    password: "",
    role: "",
    user_faculty: "",
  });

  const handleEditSubmit = (id, data) => {
    if (id) {
      EditProfileService(id, data).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          updateTableData();
        }
      });
    } else {
      AddNewUserService(data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          updateTableData();
        }
      });
    }
  };
  useEffect(() => {
    if (Object.keys(item).length !== 0) {
      setUser({
        ...user,
        user_id: item.user_id,
        name: item.name,
        user_code: item.user_code,
        user_class: item.user_class,
        email: item.email,
        address: item.address,
        phone: item.phone,
        role: item.role,
        password: item.password,
        user_faculty: item.user_faculty,
      });
    }
  }, [item]);

  return (
    <div>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          style={{ cursor: "move", paddingBottom: "0px" }}
          id="draggable-dialog-title"
        >
          <h4 className="">{item?.user_id ? "Cập nhật" : "Thêm mới"}</h4>
        </DialogTitle>

        <ValidatorForm>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Mã độc giả
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, user_code: event.target.value })
                  }
                  type="text"
                  value={user.user_code}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Khoa
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, user_faculty: event.target.value })
                  }
                  type="text"
                  value={user.user_faculty}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Đơn vị
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, user_class: event.target.value })
                  }
                  type="text"
                  value={user.user_class}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Họ Tên
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                  type="text"
                  value={user.name}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Số Điện Thoại
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, phone: event.target.value })
                  }
                  type="number"
                  value={user.phone}
                  validators={[
                    "required",
                    // "matchRegexp:(84|0[3|5|7|8|9])+([0-9]{8})\b",
                  ]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Email
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                  type="email"
                  value={user.email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "Trường này không hợp lệ",
                    "Đây không phải là email",
                  ]}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Địa chỉ
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, address: event.target.value })
                  }
                  type="text"
                  value={user.address}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  value={user.role}
                  select
                  fullWidth
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Vai trò
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, role: event.target.value })
                  }
                >
                  <MenuItem value={0}>Sinh viên</MenuItem>
                  <MenuItem value={3}>Cán bộ, Giáo viên</MenuItem>
                </TextValidator>
              </Grid>

              {/* {Object.keys(item).length === 0 && ( */}
              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Mật khẩu
                    </span>
                  }
                  onChange={(event) =>
                    setUser({ ...user, password: event.target.value })
                  }
                  type="text"
                  name="address"
                  value={user.password}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>
              {/* )} */}
            </Grid>
          </DialogContent>

          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-12">
              <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                onClick={handleClose}
                style={{ marginRight: 5 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "15px" }}
                color="primary"
                type="submit"
                onClick={() => handleEditSubmit(user.user_id, user)}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
