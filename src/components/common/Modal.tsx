import { XButton } from "@common/Button";
import { ModalTitle } from "@common/Typography";
import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onCloseHandler: () => void;
  title: string;
};

export const Modal: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%",
          width: "650px",
        },
      }}
      onClose={props.onCloseHandler}
    >
      <DialogTitle
        sx={{
          flexDirection: "row",
          backgroundColor: "#082F3C",
          color: "white",
        }}
      >
        <ModalTitle>{props.title}</ModalTitle>
      </DialogTitle>
      <XButton
        onClick={props.onCloseHandler}
        sx={{
          position: "absolute",
          right: 24,
          top: 10,
          backgroundColor: "#082F3C",
          ".MuiSvgIcon-root": {
            color: "white",
          },
        }}
      />
      <Divider />
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
};
