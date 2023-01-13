import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateRequestBook } from "../../Service/bookServices";

export default function LogDialog(props) {
  const { handleClose, open, rowData, updatePageData } = props;
  const [issue, setIssue] = useState("");
  const handleEditSubmit = () => {
    UpdateRequestBook({
      status: 2,
      request_id: rowData.request_id,
      issue: issue,
    }).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        handleClose();
        updatePageData();
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          style={{ cursor: "move", paddingBottom: "0px" }}
          id="draggable-dialog-title"
        >
          <h4 className="">{"Lý do từ chối"}</h4>
        </DialogTitle>

        <ValidatorForm>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Lý do
                    </span>
                  }
                  onChange={(event) => setIssue(event.target.value)}
                  type="text"
                  value={issue}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
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
