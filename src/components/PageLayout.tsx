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
          gridTemplateColumns: "270px 1fr",
          height: "100%",
          gap: 5,
          marginRight: "2em",
        }}
      >
        <Navbar />
        <FullColumn sx={{ gap: 5, marginBottom: 10 }}>
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
