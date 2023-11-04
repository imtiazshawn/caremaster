import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Button } from "@common/Button";
import React from "react";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
};

const ConfirmationDialog: React.FC<Props> = ({
  isOpen,
  onCancel,
  title,
  description,
  onOk,
  okText,
  cancelText,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={onCancel}
        >
          {cancelText ?? "Cancel"}
        </Button>
        <Button
          variant='contained'
          onClick={onOk}
          autoFocus
        >
          {okText ?? "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
