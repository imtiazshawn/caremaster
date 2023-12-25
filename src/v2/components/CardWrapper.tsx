import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  actionButtons?: ReactNode;
  color: string;
  textColor: string;
};

export const CardWrapper = (props: Props) => {
  return (
    <Box
      color={props.color}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid  #E3E6E8",
        borderRadius: "12px",
      }}
    >
      <Box
        color={props.color}
        sx={{
          width: "100%",
          backgroundColor: props.color,
          color: props.textColor,
          padding: "15px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ECECEC",
        }}
      >
        <Typography sx={{ fontSize: "18px" }}>{props.title}</Typography>
        {props.actionButtons}
      </Box>
      {props.children}
    </Box>
  );
};
