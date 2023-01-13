import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllListBookRequestService } from "../../Service/bookServices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@material-ui/core";
import ListReturnBookDialog from "./ListReturnBookDialog";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
export default function ListReturnBookRequest() {
  const [listBookRequest, setListBookRequest] = useState([]);
  const [shouldDialog, setShouldDialog] = useState(false);

  const [render, setRender] = useState(false);
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    AllListBookRequestService({ status: 3 }).then((res) =>
      setListBookRequest(res.data.data)
    );
  }, [render]);
  const handleClose = () => {
    setShouldDialog(false);
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

      <MaterialTable
        title="Danh sách trả"
        columns={[
          { title: "Tên Sách", field: "title" },
          { title: "Thể loại", field: "name" },
          { title: "Tác Giả", field: "author" },
          { title: "Nhà Xuất Bản", field: "publisher" },
          { title: "Số lượng", field: "quantity" },
          {
            title: "Hành động",
            render: (rowData) => (
              <IconButton
                style={{
                  color: "#e93a1e",
                }}
                onClick={() => {
                  setBookId(rowData);
                  setShouldDialog(true);
                }}
              >
                <VisibilityIcon />
              </IconButton>
            ),
          },
        ]}
        data={listBookRequest}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "green",
            color: "#fff",
          },
        }}
      />
      {shouldDialog && (
        <ListReturnBookDialog
          open={shouldDialog}
          bookId={bookId}
          handleClose={handleClose}
        />
      )}
    </Fragment>
  );
}
