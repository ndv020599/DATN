import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Close } from "@material-ui/icons";

const ConfirmDialog = (props) => {
  const { selectYes, selectNo } = props;

  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Xác nhận</DialogTitle>
      <Box className="icon-close" onClick={() => selectNo()}>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>Bạn có chắc chắn muốn trả?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className="button-cancel"
          variant="contained"
          onClick={() => selectNo()}
        >
          Hủy
        </Button>
        <Button
          className="button-confirm"
          variant="contained"
          onClick={() => selectYes()}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
