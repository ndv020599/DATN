import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { AllListCategory, DeleteCategory } from "../../Service/bookServices";
import axios from "axios";
// import UserDialog from "./UserDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryDialogUpdate from "./CategoryDialog";
import ConfirmDialog from "../../commons/ConfirmDialog";

export default function Category() {
  const [listCategory, setListCategory] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [shouldDialogDelete, setShouldDialogDelete] = useState(false);
  const [shouldDialog, setShouldDialog] = useState(false);
  const [categoryId, setCategoryId] = useState({});
  const updateTableData = () => {
    AllListCategory({ key: "" }).then((res) => setListCategory(res.data.data));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    updateTableData();
  }, []);
  const onSelectYes = async () => {
    await DeleteCategory(deleteId).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        updateTableData();
      } else {
        toast.error(res.data.message);
      }
    });
    setShouldDialogDelete(false);
  };
  const handleClose = () => {
    setShouldDialog(false);
    setShouldDialogDelete(false);
    setCategoryId({});
  };

  return (
    <Fragment>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      ></ToastContainer>
      <Box style={{ display: "inline-flex" }} alignItems="flex-end">
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}
          onClick={() => setShouldDialog(true)}
        >
          Thêm mới
        </Button>
      </Box>

      <MaterialTable
        title="Bảng Thể loại"
        columns={[
          { title: "Tên thể loại", field: "name" },
          { title: "Mô tả", field: "description" },
        ]}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            iconProps: { style: { color: "green" } },
            onClick: (event, rowData) => {
              setShouldDialog(true);
              setCategoryId(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete",
            iconProps: { style: { color: "red" } },
            onClick: (event, rowData) => {
              setShouldDialogDelete(true);
              setDeleteId(rowData.genre_id);
            },
          },
        ]}
        data={listCategory}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "green",
            color: "#fff",
          },
        }}
      />
      {shouldDialog && (
        <CategoryDialogUpdate
          updateTableData={updateTableData}
          open={shouldDialog}
          item={categoryId}
          handleClose={handleClose}
        />
      )}
      {shouldDialogDelete && (
        <ConfirmDialog
          open={shouldDialogDelete}
          onSelectYes={onSelectYes}
          onSelectNo={handleClose}
        />
      )}
    </Fragment>
  );
}
