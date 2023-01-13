import React, { Fragment, useEffect, useState, useCallback } from "react";
import MaterialTable from "material-table";

import Button from "@material-ui/core/Button";
import {
  AllListRequestOfUser,
  DeleteRequestBook,
  UpdateRequestBook,
} from "../../Service/bookServices";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "../../commons/ConfirmDialog";
import ConfirmReturnRequestDialog from "../../commons/ConfirmReturnRequestDialog";

export default function BookRequestOfUser() {
  const [listBook, setListBook] = useState([]);
  const [shouldDialog, setShouldDialog] = useState(false);
  const [shouldDialogReturn, setShouldDialogReturn] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [render, setRender] = useState(false);
  // const nowDay = `${new Date().getUTCFullYear()}-${
  //   new Date().getUTCMonth() + 1
  // }-${new Date().getUTCDay() + 18}`;
  const nowDay = `${new Date()
    .toLocaleDateString()
    .toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    .replace(/\//g, "-")}`;

  const handleReturnBook = (rowData) => {
    setShouldDialogReturn(true);
    setRequestId(rowData);
  };
  const selectYes = (rowData) => {
    UpdateRequestBook({
      status: 3,
      book_id: requestId.book_id,
      request_id: requestId.request_id,
    }).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        handleClose();
        setRender(!render);
      }
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios({
      method: "get",
      url: "http://localhost:4000/users/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      AllListRequestOfUser({
        status: null,
        user_id: res.data.data.user_id,
      }).then((res) => setListBook(res.data.data));
    });
  }, [render]);
  const handleClose = () => {
    setShouldDialog(false);
    setShouldDialogReturn(false);
  };
  const deleteRequest = (id) => {
    setShouldDialog(true);
    setRequestId(id);
  };
  const onSelectYes = (id) => {
    DeleteRequestBook(requestId).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        setRender(!render);
      }
    });
    handleClose();
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
          { title: "Tên Sách", field: "book_name" },
          { title: "Mã Sách", field: "book_code_distinct" },
          { title: "Thể loại", field: "genre_name" },
          { title: "Tác Giả", field: "book_author" },
          { title: "Nhà Xuất Bản", field: "book_publisher" },
          {
            title: "Ngày mượn",
            field: "borrow_date",
          },
          { title: "Ngày trả", field: "return_date" },
          {
            title: "Hành động",
            render: (rowData) => {
              if (rowData.status === 0) {
                return (
                  <Button
                    disabled={false}
                    variant="container"
                    style={{
                      backgroundColor: "orange",
                      color: "#fff",
                    }}
                    onClick={() => deleteRequest(rowData.request_id)}
                  >
                    Hủy
                  </Button>
                );
              } else if (rowData.status === 1) {
                return (
                  <Button
                    disabled={false}
                    variant="container"
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                    }}
                    onClick={() => handleReturnBook(rowData)}
                  >
                    Trả
                  </Button>
                );
              } else if (
                rowData.status === 2 ||
                rowData.status === 4 ||
                rowData.status === 5
              ) {
                return (
                  <Button
                    disabled={false}
                    variant="container"
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                    }}
                    onClick={() => deleteRequest(rowData.request_id)}
                  >
                    Xóa
                  </Button>
                );
              }
            },
          },
          {
            title: "Trạng thái",
            render: (rowData) => {
              if (rowData.status === 0) {
                return (
                  <p
                    style={{
                      backgroundColor: "yellow",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#333",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Chờ duyệt
                  </p>
                );
              } else if (rowData.status === 1) {
                let [day, month, year] = rowData.return_date.split("-");
                let newReturnDate = new Date(year, month, day);
                let [nDay, nMonth, nYear] = nowDay.split("-");
                let newNowDay = new Date(nYear, nMonth, nDay);

                return Date.parse(newReturnDate) < Date.parse(newNowDay) ? (
                  <p
                    style={{
                      backgroundColor: "red",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Qúa hạn trả sách
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: "yellow",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#333",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Đã duyệt
                  </p>
                );
              } else if (rowData.status === 2) {
                return (
                  <p
                    style={{
                      backgroundColor: "red",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    {rowData.issue}
                  </p>
                );
              } else if (rowData.status === 3) {
                return (
                  <p
                    style={{
                      backgroundColor: "green",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Chờ duyệt trả
                  </p>
                );
              } else if (rowData.status === 4) {
                return (
                  <p
                    style={{
                      backgroundColor: "blue",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Đã duyệt trả
                  </p>
                );
              } else if (rowData.status === 5) {
                return (
                  <p
                    style={{
                      backgroundColor: "orange",
                      maxWidth: "80%",
                      textAlign: "center",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    {rowData.issue}
                  </p>
                );
              }
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
        <ConfirmDialog
          open={shouldDialog}
          onSelectYes={onSelectYes}
          onSelectNo={handleClose}
        />
      )}
      {shouldDialogReturn && (
        <ConfirmReturnRequestDialog
          open={shouldDialogReturn}
          selectYes={selectYes}
          selectNo={handleClose}
        />
      )}
    </Fragment>
  );
}
