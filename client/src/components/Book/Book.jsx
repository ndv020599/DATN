import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { AllListBook, DeleteBook } from "../../Service/bookServices";
import axios from "axios";
// import UserDialog from "./UserDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookDialogUpdate from "../Book/BookDialog";
import ConfirmDialog from "../../commons/ConfirmDialog";

export default function Book() {
  const [listBook, setListBook] = useState([]);
  const [shouldDialog, setShouldDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [shouldDialogDelete, setShouldDialogDelete] = useState(false);
  const [bookId, setBookId] = useState({});
  const [render, setRender] = useState(false);
  const updateTableData = () => {
    AllListBook({ key: "" }).then((res) => setListBook(res.data.data));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    updateTableData();
  }, [render]);
  const onSelectYes = async () => {
    await DeleteBook(deleteId).then((res) => {
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
    setShouldDialogDelete(false);
    setShouldDialog(false);
    setBookId({});
    setRender(!render);
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
        title="Danh sách Sách"
        columns={[
          { title: "Mã Sách", field: "book_code" },
          { title: "Tên Sách", field: "title" },
          { title: "Thể loại", field: "genre_name" },
          { title: "Tác Giả", field: "author" },
          { title: "Nhà Xuất Bản", field: "publisher" },
          { title: "Số lượng", field: "quantity" },
        ]}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            iconProps: { style: { color: "green" } },
            onClick: (event, rowData) => {
              setShouldDialog(true);
              setBookId(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete",
            iconProps: { style: { color: "red" } },
            onClick: async (event, rowData) => {
              setShouldDialogDelete(true);
              setDeleteId(rowData.book_code);
            },
          },
        ]}
        data={listBook}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "green",
            color: "#fff",
          },
        }}
      />
      {shouldDialog && (
        <BookDialogUpdate
          updateTableData={updateTableData}
          open={shouldDialog}
          item={bookId}
          handleClose={handleClose}
          viewDetail={false}
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
