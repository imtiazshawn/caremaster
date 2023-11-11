import { ReactNode } from "react";

import { COLORS } from "@/shared/constants/colors";

import { Box, FullColumn, Grid } from "./common";
import { Navbar } from "./Navbar";
import { TopHeader } from "./TopHeader";

export const PageLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <FullColumn sx={{ height: "100vh", backgroundColor: COLORS.BACKGROUND }}>
      <Grid
        sx={{
          gridTemplateColumns: "17rem 1fr",
          height: "100%",
          gap: "2rem",
          marginRight: "2rem",
        }}
      >
        <Navbar />
        <FullColumn sx={{ gap: "3rem", height: "100vh", marginBottom: "5em" }}>
          <TopHeader />
          <Box
            sx={{
              overflowY: "auto",
            }}
          >
            <Box sx={{ backgroundColor: COLORS.WHITE }}>{children}</Box>
            <Box sx={{ height: "1rem" }} />
          </Box>
        </FullColumn>
      </Grid>
    </FullColumn>
  );
};
