import React, { useState, useEffect, useCallback } from "react";
import { Button, Grid, MenuItem } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AllListCategory } from "../../Service/bookServices";
import { EditBook, AddNewBook } from "../../Service/bookServices";
import BookCodeDialog from "./BookCodeDialog";
// import { ADD_user, UPDATE_user, GET_COMMUNE_LIST, GET_DISTRICT_LIST, GET_PROVINCE_LIST, CLEAR_RES } from "../../redux/actions/usersAction"

export default function BookDialogUpdate(props) {
  const { handleClose, open, item, updateTableData, viewDetail } = props;
  const [openBookCodeDialog, setOpenBookCodeDialog] = useState(false);

  const handleOpenBookCode = () => {
    setOpenBookCodeDialog(true);
  };

  const handleCloseBookCode = () => {
    setOpenBookCodeDialog(false);
  };

  const handleEditSubmit = (id, data) => {
    if (id) {
      EditBook(id, data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          updateTableData();
        } else {
          toast.warning(res.data.message);
        }
      });
    } else {
      AddNewBook(data).then((res) => {
        if (res.data.code === 200) {
          toast.success(res.data.message);
          handleClose();
          updateTableData();
        } else {
          toast.warning(res.data.message);
        }
      });
    }
  };
  const [book, setBook] = useState({
    book_id: "",
    genre_id: "",
    title: "",
    author: "",
    publisher: "",
    quantity: "",
    book_code: "",
    book_code_distinct: "",
  });
  const [selectCategory, setSelectCategory] = useState([]);
  useEffect(() => {
    AllListCategory({ key: "" }).then((res) =>
      // console.log(res.data.data)
      setSelectCategory(res.data.data)
    );
  }, []);
  useEffect(() => {
    console.log(item);
    if (Object.keys(item).length !== 0) {
      // console.log(item);
      setBook({
        ...book,
        book_id: item.book_id,
        genre_id: item.genre_id,
        title: item.title,
        author: item.author,
        publisher: item.publisher,
        quantity: item.quantity,
        book_code: item.book_code,
        book_code_distinct: item.book_code_distinct,
      });
    }
  }, [item]);

  useEffect(() => {
    if (book.title) {
      var getFirstLetter = toLowerCaseNonAccentVietnamese(book.title)
        .match(/\b(\w)/g)
        .join("")
        .toUpperCase();
      setBook({
        ...book,
        book_code: getFirstLetter,
      });
    }
  }, [book.title]);

  function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huy???n s???c h???i ng?? n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ??, ??, ??, ??, ??
    return str;
  }

  return (
    <div>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle
          style={{ cursor: "move", paddingBottom: "0px" }}
          id="draggable-dialog-title"
        >
          <h4 className="">{item?.book_id ? "C???p nh???t" : "Th??m m???i"}</h4>
        </DialogTitle>

        <ValidatorForm>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      T??n s??ch
                    </span>
                  }
                  onChange={(event) => {
                    setBook({ ...book, title: event.target.value });
                  }}
                  onOutPut
                  type="text"
                  name="code"
                  value={book.title}
                  validators={["required"]}
                  errorMessages={["Tr?????ng n??y kh??ng h???p l???"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  select
                  className="w-100 "
                  fullWidth
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Th??? lo???i
                    </span>
                  }
                  onChange={(event) =>
                    setBook({ ...book, genre_id: event.target.value })
                  }
                  type="text"
                  name="class"
                  value={book.genre_id}
                  validators={["required"]}
                  errorMessages={["Tr?????ng n??y kh??ng h???p l???"]}
                >
                  {selectCategory.map((item) => (
                    <MenuItem key={item.genre_id} value={item.genre_id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextValidator>
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      T??c gi???
                    </span>
                  }
                  onChange={(event) =>
                    setBook({ ...book, author: event.target.value })
                  }
                  type="text"
                  name="name"
                  value={book.author}
                  validators={["required"]}
                  errorMessages={["Tr?????ng n??y kh??ng h???p l???"]}
                />
              </Grid>

              <Grid item sm={6} xs={6}>
                <TextValidator
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      Nh?? xu???t b???n
                    </span>
                  }
                  onChange={(event) =>
                    setBook({ ...book, publisher: event.target.value })
                  }
                  type="text"
                  name="phone"
                  value={book.publisher}
                  validators={["required"]}
                  errorMessages={["Tr?????ng n??y kh??ng h???p l???"]}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextValidator
                  disabled
                  fullWidth
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>
                      M?? s??ch
                    </span>
                  }
                  onChange={(event) =>
                    setBook({ ...book, book_code: event.target.value })
                  }
                  type="text"
                  name="book_code"
                  value={book.book_code}
                  validators={["required"]}
                  errorMessages={["Tr?????ng n??y kh??ng h???p l???"]}
                />
              </Grid>
              {!book.book_id && (
                <Grid item sm={6} xs={6}>
                  <TextValidator
                    fullWidth
                    className="w-100"
                    label={
                      <span>
                        <span style={{ color: "red" }}>* </span>
                        M?? s??ch ri??ng
                      </span>
                    }
                    onChange={(event) =>
                      setBook({
                        ...book,
                        book_code_distinct: event.target.value.toUpperCase(),
                      })
                    }
                    type="text"
                    name="book_code_distinct"
                    value={book.book_code_distinct}
                    validators={["required"]}
                    errorMessages={["Tr?????ng n??y kh??ng h???p l???"]}
                  />
                </Grid>
              )}

              {book.book_id && (
                <Grid item sm={6} xs={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    style={{ minHeight: "100%" }}
                    onClick={() => setOpenBookCodeDialog(true)}
                  >
                    Xem to??n b??? m?? s??ch
                  </Button>
                </Grid>
              )}
            </Grid>
          </DialogContent>

          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-12">
              <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                style={{ marginRight: 5 }}
                onClick={handleClose}
              >
                H???y
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "15px" }}
                color="primary"
                type="submit"
                onClick={() => handleEditSubmit(book.book_id, book)}
              >
                L??u
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>

      {openBookCodeDialog && (
        <BookCodeDialog handleClose={() => handleCloseBookCode()} book={book} />
      )}
    </div>
  );
}
