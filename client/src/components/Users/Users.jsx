import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { AllListUserService } from "../../Service/UserService";
import { DeleteUserService } from "../../Service/UserService";
import axios from "axios";
import UserDialog from "./UserDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "../../commons/ConfirmDialog";

export default function User() {
  const [listUser, setListUser] = useState([]);
  const [userId, setUserId] = useState({});
  const [deleteId, setDeleteId] = useState("");
  const [shouldDialog, setShouldDialog] = useState(false);
  const [shouldDialogDelete, setShouldDialogDelete] = useState(false);
  const updateTableData = () => {
    AllListUserService({ key: "", role: 0 }).then((res) =>
      setListUser(res.data.data)
    );
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    updateTableData();
  }, []);
  const onSelectYes = async () => {
    await DeleteUserService(deleteId).then((res) => {
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
    setUserId({});
  };
  const addNewUser = () => {
    setShouldDialog(true);
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
          onClick={() => addNewUser()}
        >
          Thêm mới
        </Button>
      </Box>

      <MaterialTable
        title="Basic Export Preview"
        columns={[
          { title: "Mã độc giả", field: "user_code" },
          { title: "Đơn vị", field: "user_class" },
          { title: "Khoa", field: "user_faculty" },
          { title: "Họ Tên", field: "name" },
          { title: "Số điện thoại", field: "phone" },
          { title: "Email", field: "email" },
          { title: "Địa chỉ", field: "address" },
          {
            title: "Vai trò",
            render: (rowData) =>
              rowData.role === 0
                ? "Sinh viên"
                : rowData.role === 1
                ? "Admin"
                : rowData.role === 2
                ? "Thủ thư"
                : "Cán bộ, Giáo viên",
          },
        ]}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            iconProps: { style: { color: "green" } },
            onClick: (event, rowData) => {
              setShouldDialog(true);
              setUserId(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete",
            iconProps: { style: { color: "red" } },
            onClick: (event, rowData) => {
              setShouldDialogDelete(true);
              setDeleteId(rowData.user_id);
            },
          },
        ]}
        data={listUser}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "green",
            color: "#fff",
          },
        }}
      />
      {shouldDialog && (
        <UserDialog
          updateTableData={updateTableData}
          open={shouldDialog}
          item={userId}
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
