import { CircularProgress, SxProps } from "@mui/material";
import { Box } from "./index";

export default function Loader(props: { sx?: SxProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
