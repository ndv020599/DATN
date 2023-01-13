import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClearIcon from "@mui/icons-material/Clear";

import MaterialTable from "material-table";
import { Button, DialogTitle, IconButton } from "@material-ui/core";
import {
  AllListUserRequestService,
  UpdateRequestBook,
} from "../../Service/bookServices";
import LogDialog from "./LogDialog";

export default function ListBookRequestDialog(props) {
  const { handleClose, open, bookId } = props;
  const [render, setRender] = useState(false);
  const [shouldDialog, setShouldDialog] = useState(false);
  const [listUserRequest, setListUserRequest] = useState([]);
  const [rowData, setRowData] = useState({});
  const handleAcceptRequest = (rowData) => {
    UpdateRequestBook({
      status: 1,
      book_id: rowData.book_id,
      book_code: rowData.book_code,
      request_id: rowData.request_id,
    }).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
    setRender(!render);
  };
  const handleCancelRequest = (rowData) => {
    setShouldDialog(true);
    setRowData(rowData);
  };

  useEffect(() => {
    AllListUserRequestService({ status: 0, book_code: bookId.book_code }).then(
      (res) => setListUserRequest(res.data.data)
    );
  }, [render]);

  return (
    <div>
      <Dialog open={open} maxWidth="lg" fullWidth>
        <DialogTitle style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton>
            <ClearIcon onClick={handleClose} />
          </IconButton>
        </DialogTitle>
        <MaterialTable
          title="Danh sách người mượn"
          columns={[
            { title: "Mã sinh viên", field: "user_code" },
            { title: "Lớp", field: "user_class" },
            { title: "Họ Tên", field: "user_name" },
            { title: "Số điện thoại", field: "user_phone" },
            { title: "Email", field: "user_email" },
            { title: "Địa chỉ", field: "user_address" },
            {
              title: "Hành động",
              render: (rowData) => (
                <>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: "green",
                      color: "#fff",
                      marginBottom: 5,
                    }}
                    onClick={() => handleAcceptRequest(rowData)}
                  >
                    Chấp nhận
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "red", color: "#fff" }}
                    onClick={() => handleCancelRequest(rowData)}
                  >
                    Từ chối
                  </Button>
                </>
              ),
            },
          ]}
          data={listUserRequest}
          options={{
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: "rgb(28 8 131)",
              color: "#fff",
            },
          }}
        />
      </Dialog>
      {shouldDialog && (
        <LogDialog
          open={shouldDialog}
          rowData={rowData}
          handleClose={() => setShouldDialog(false)}
          updatePageData={() => setRender(!render)}
        />
      )}
    </div>
  );
}
