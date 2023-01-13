import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-toastify";
import BookCodeEditDialog from "./BookCodeEditDialog";
import { SearchBookByCode } from "../../Service/bookServices";
import ConfirmDialog from "../../commons/ConfirmDialog";
import { AllListBook, DeleteBook } from "../../Service/bookServices";

export default function BookCodeDialog(props) {
  const { handleClose, book } = props;
  const [render, setRender] = useState(false);
  const [listBookCode, setListBookCode] = useState([]);
  const [valueEdit, setValueEdit] = useState({});
  const [openBookDialogUpdate, setOpenBookDialogUpdate] = useState(false);
  const [shouldDialogDelete, setShouldDialogDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const onSelectYes = async () => {
    await DeleteBook(deleteId).then((res) => {
      if (res.data.code === 200) {
        toast.success(res.data.message);
        setRender(!render);
      } else {
        toast.error(res.data.message);
      }
    });
    setShouldDialogDelete(false);
  };

  useEffect(() => {
    SearchBookByCode({ book_code: book.book_code })
      .then((res) => {
        if (res.data.code === 200) {
          setListBookCode(res.data.data);
        }
      })
      .catch((err) => toast.warning("Có lỗi, vui lòng thử lại"));
  }, [render]);
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">Danh sách mã sách</DialogTitle>
        <DialogContent>
          <MaterialTable
            columns={[
              { title: "Mã Sách", field: "book_code_distinct" },
              { title: "Tên Sách", field: "title" },
              { title: "Tác Giả", field: "author" },
              { title: "Nhà Xuất Bản", field: "publisher" },
            ]}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit",
                iconProps: { style: { color: "green" } },
                onClick: (event, rowData) => {
                  setValueEdit(rowData);
                  setOpenBookDialogUpdate(true);
                },
              },
              {
                icon: "delete",
                tooltip: "Delete",
                iconProps: { style: { color: "red" } },
                onClick: async (event, rowData) => {
                  setShouldDialogDelete(true);
                  setDeleteId(rowData.book_id);
                },
              },
            ]}
            data={listBookCode}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "green",
                color: "#fff",
              },
              showTitle: false,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            ĐÓNG
          </Button>
        </DialogActions>
      </Dialog>

      {openBookDialogUpdate && (
        <BookCodeEditDialog
          open={openBookDialogUpdate}
          handleClose={() => setOpenBookDialogUpdate(false)}
          item={valueEdit}
          viewDetail={false}
          updateTableData={() => setRender(!render)}
        />
      )}

      {shouldDialogDelete && (
        <ConfirmDialog
          open={shouldDialogDelete}
          onSelectYes={onSelectYes}
          onSelectNo={() => setShouldDialogDelete(false)}
        />
      )}
    </div>
  );
}
