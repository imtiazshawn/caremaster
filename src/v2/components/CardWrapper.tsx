import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  actionButtons?: ReactNode;
};

export const CardWrapper = (props: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#1E6069",
          padding: "15px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "18px" }}>
          {props.title}
        </Typography>
        {props.actionButtons}
      </Box>
      {props.children}
    </Box>
  );
};
