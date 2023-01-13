import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";

import Button from "@material-ui/core/Button";
import { AllListBook } from "../../Service/bookServices";
import BookRequestDialog from "./BookRequestDialog";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookRequest() {
  const [listBook, setListBook] = useState([]);
  const [shouldDialog, setShouldDialog] = useState(false);
  const [bookId, setBookId] = useState({});
  const updateTableData = () => {
    AllListBook({ key: "" }).then((res) => setListBook(res.data.data));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    updateTableData();
  }, []);
  const handleClose = () => {
    setShouldDialog(false);
  };

  return (
    <Fragment>
      <ToastContainer
        autoClose={2000}
        draggable={false}
        limit={3}
        theme="colored"
      ></ToastContainer>

      <MaterialTable
        title="Danh sách mượn"
        columns={[
          { title: "Tên Sách", field: "title" },
          { title: "Thể loại", field: "genre_name" },
          { title: "Tác Giả", field: "author" },
          { title: "Nhà Xuất Bản", field: "publisher" },
          { title: "Số lượng", field: "quantity" },
          {
            title: "Hành động",
            render: (rowData) => (
              <Button
                disabled={false}
                variant="container"
                style={{
                  backgroundColor: "rgba(255, 158, 67, 0.9)",
                  color: "#fff",
                }}
                onClick={() => {
                  setShouldDialog(true);
                  setBookId(rowData);
                }}
              >
                Mượn
              </Button>
            ),
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
        <BookRequestDialog
          open={shouldDialog}
          item={bookId}
          handleClose={handleClose}
        />
      )}
    </Fragment>
  );
}
