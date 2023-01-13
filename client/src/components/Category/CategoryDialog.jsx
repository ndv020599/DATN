import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddNewCategory, EditCategory } from "../../Service/bookServices";
// import { ADD_user, UPDATE_user, GET_COMMUNE_LIST, GET_DISTRICT_LIST, GET_PROVINCE_LIST, CLEAR_RES } from "../../redux/actions/usersAction"

export default function CategoryDialogUpdate(props) {
  const { handleClose, open, item, updateTableData } = props;
  const handleEditSubmit = (id, data) => {
    console.log(data);
    if (id) {
      EditCategory(id, data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          updateTableData();
        }
      });
    } else {
      AddNewCategory(data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          updateTableData();
        }
      });
    }
  };
  const [category, setCategory] = useState({
    genre_id: "",
    name: "",
    description: "",
  });
  useEffect(() => {
    if (Object.keys(item).length !== 0) {
      setCategory({
        ...category,
        genre_id: item.genre_id,
        name: item.name,
        description: item.description,
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
          <h4 className="">{item?.genre_id ? "Cập nhật" : "Thêm mới"}</h4>
        </DialogTitle>

        <ValidatorForm>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Tên thể loại
                    </span>
                  }
                  onChange={(event) =>
                    setCategory({ ...category, name: event.target.value })
                  }
                  type="text"
                  name="code"
                  value={category.name}
                  validators={["required"]}
                  errorMessages={["Trường này không hợp lệ"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Mô tả
                    </span>
                  }
                  onChange={(event) =>
                    setCategory({
                      ...category,
                      description: event.target.value,
                    })
                  }
                  type="text"
                  name="class"
                  value={category.description}
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
                style={{ marginRight: 5 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "15px" }}
                color="primary"
                type="submit"
                onClick={() => handleEditSubmit(category.genre_id, category)}
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
