import { ReactNode } from "react";

import { COLORS } from "@/shared/constants/colors";

import { Navbar } from "../Navbar";
import { TopHeader } from "../TopHeader";
import { Box, FullColumn, Grid } from "../common";

type LayoutProps = {
  children?: ReactNode;
  applyTopHeader?: boolean;
  sidebar?: () => ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  applyTopHeader = true,
  sidebar = Navbar,
}) => {
  const sidebarComponenet = sidebar();
  return (
    <FullColumn sx={{ height: "100vh", backgroundColor: COLORS.BACKGROUND }}>
      <Grid
        sx={{
          gridTemplateColumns: "17.5rem 1fr",
          height: "100%",
          gap: "2rem",
          marginRight: "2rem",
        }}
      >
        {sidebarComponenet}
        <FullColumn sx={{ gap: "3rem", height: "100vh", marginBottom: "5em" }}>
          {applyTopHeader ? <TopHeader /> : <></>}
          <Box
            sx={{
              overflowY: "auto",
              height: "100%",
            }}
          >
            <Box
              sx={{ backgroundColor: COLORS.WHITE, minHeight: "100%", pb: 4 }}
            >
              {children}
            </Box>
          </Box>
        </FullColumn>
      </Grid>
    </FullColumn>
  );
};
