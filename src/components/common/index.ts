import { styled } from "@mui/material/styles";

export const Box = styled("div")({});

export const Grid = styled("div")({ display: "grid" });

export const FlexBox = styled("div")({
  display: "flex",
  gap: "2em",
});

export const Column = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2em",
});

export const FullColumn = styled(Column)({
  height: "100%",
  gap: "2em",
});

export const FullRow = styled(FlexBox)({
  width: "100%",
  gap: "2em",
});
