import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
      PaperProps={{
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          width: "100%",
          maxWidth: "300px",
        },
      }}
      aria-labelledby="success-dialog-title"
    >
      <DialogTitle id="success-dialog-title">Maksun tila</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText className="dialog-message">
          {message === "success" ? "onnistunut" : "epäonnistunut"}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="primary">
          sulje
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
