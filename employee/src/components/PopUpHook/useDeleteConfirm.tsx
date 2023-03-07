import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";

type DeleteConfirmType = {
  userName: string;
  deleteEmployee: () => void;
};

export const useDeleteConfirm = (props: DeleteConfirmType) => {
  const [open, setOpen] = React.useState(false);

  const { userName, deleteEmployee } = props;

  const handleDeleteConfirmOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const renderDeleteConfirm = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ m: 2 }}>
          <DialogTitle id="alert-dialog-title" fontWeight={600} marginTop={2}>
            Are You sure you want to delete {userName} ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action will delete this user form your list. This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button
              variant="contained"
              onClick={deleteEmployee}
              autoFocus
              color="error"
            >
              DELETE
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  };

  return { renderDeleteConfirm, handleDeleteConfirmOpen, handleClose };
};
