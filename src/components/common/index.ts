import { styled } from "@mui/material/styles";

export const Box = styled("div")({});

export const Grid = styled("div")({ display: "grid" });

export const FlexBox = styled("div")({
  display: "flex",
  gap: "1em",
});

export const CenteredFlexBox = styled(FlexBox)({
  alignItems: "center",
});

export const Column = styled(FlexBox)({
  flexDirection: "column",
});

export const Row = styled(FlexBox)({
  flexDirection: "row",
});

export const CenteredRow = styled(FlexBox)({
  flexDirection: "row",
  alignItems: "center",
});

export const FullColumn = styled(Column)({
  height: "100%",
  gap: "1em",
});

export const FullRow = styled(FlexBox)({
  width: "100%",
  gap: "1em",
});
