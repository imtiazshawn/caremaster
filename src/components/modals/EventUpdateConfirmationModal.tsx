import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Button } from "@common/Button";
import Select from "@common/Select";
import React from "react";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onCancel?: () => void;
  onUpdate: (value: string) => void;
  cancelText?: string;
};

const EventUpdateConfirmationModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  title,
  description,
  onUpdate,
  cancelText,
}) => {
  const [value, setValue] = React.useState("Only this");
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
        <Select
          value={value}
          options={[
            {
              value: "Only this",
              label: "Only this",
            },
            {
              value: "This and following",
              label: "This and following",
            },
            {
              value: "All",
              label: "All",
            },
          ]}
          onChange={(e) => setValue(e.target.value as string)}
        />

        <Button
          variant='contained'
          onClick={() => [onUpdate(value)]}
          autoFocus
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventUpdateConfirmationModal;
