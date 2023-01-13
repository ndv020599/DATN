import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AddNewBookRequest } from "../../Service/bookServices";
import axios from "axios";

export default function BookRequestDialog(props) {
  const { handleClose, open, item } = props;
  const [returnDate, setReturnDate] = useState(new Date());

  const [userId, setUserId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "http://localhost:4000/users/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUserId(res.data.data.user_id);
    });
  }, []);
  const handleFormatTime = (time) => {
    let [date, month, year] = time
      ? time.toLocaleDateString("vi-VN").split("/")
      : new Date()
          .toLocaleDateString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
          })
          .split("/");
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let dateFormat = `${date}-${month}-${year}`;
    return dateFormat;
  };

  const handleEditSubmit = () => {
    // if (!item.book_id && userId) {

    AddNewBookRequest({
      book_id: item.book_id,
      user_id: userId,
      return_date: handleFormatTime(returnDate),
      borrow_date: handleFormatTime(),
      // borrow_date: `${new Date()
      //   .toLocaleDateString()
      //   .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
      //   .replace(/\//g, "-")}`,
      genre_id: item.genre_id,
      book_code: item.book_code,
      status: 0,
    })
      .then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((res) => toast.warning(res.data.message));
    handleClose();
    // }
  };

  return (
    <div>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          style={{ cursor: "move", paddingBottom: "0px" }}
          id="draggable-dialog-title"
        >
          <h4 className="">{"Thêm mới"}</h4>
        </DialogTitle>

        <ValidatorForm>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={6} xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Ngày mượn"
                    inputFormat="dd/MM/yyyy"
                    value={new Date()}
                    // onChange={{{handleChange}}}
                    disabled
                    renderInput={(params) => {
                      return <TextField {...params} />;
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item sm={6} xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Ngày trả"
                    inputFormat="dd/MM/yyyy"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e)}
                    minDate={new Date()}
                    renderInput={(params) => {
                      return <TextField {...params} />;
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-12">
              <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "15px" }}
                color="primary"
                type="submit"
                onClick={() => handleEditSubmit()}
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
