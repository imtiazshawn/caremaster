import { ReactNode } from "react";

import { COLORS } from "@/shared/constants/colors";

import { Box, FullColumn, Grid } from "./common";
import { Navbar } from "./Navbar";
import { TopHeader } from "./TopHeader";

export const PageLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <FullColumn sx={{ height: "100%", backgroundColor: COLORS.BACKGROUND }}>
      <Grid
        sx={{
          gridTemplateColumns: "17rem 1fr",
          height: "100%",
          gap: "2rem",
          marginRight: "2rem",
        }}
      >
        <Navbar />
        <FullColumn sx={{ gap: "2rem", marginBottom: "5em" }}>
          <TopHeader />
          <Box
            sx={{
              height: "100%",
            }}
          >
            {children}
          </Box>
        </FullColumn>
      </Grid>
    </FullColumn>
  );
};
