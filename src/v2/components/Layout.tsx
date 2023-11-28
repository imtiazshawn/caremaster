import { ReactNode } from "react";

import { COLORS } from "@/shared/constants/colors";

import { Box, FullColumn, Grid } from "@common/index";
import { Navbar } from "./Navbar";
import { TopHeader } from "./TopHeader";

type LayoutProps = {
  children?: ReactNode;
  applyTopHeader?: boolean;
  sidebar?: () => ReactNode;
  rightBar?: (props: any) => ReactNode;
  bodyColor?: string;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  applyTopHeader = true,
  sidebar = Navbar,
  rightBar = "none",
  bodyColor = COLORS.WHITE,
}) => {
  const SidebarComponent = sidebar;
  const RightBarComponent = rightBar;
  return (
    <FullColumn sx={{ height: "100vh", backgroundColor: COLORS.BACKGROUND }}>
      <Grid
        sx={{
          gridTemplateColumns: "24rem 1fr",
          height: "100%",
          gap: "2rem",
          marginRight: "2rem",
        }}
      >
        <SidebarComponent />
        <FullColumn sx={{ gap: "1rem", height: "100vh", marginBottom: "5em" }}>
          {applyTopHeader ? <TopHeader /> : <></>}
          <Box
            sx={{
              overflowY: "auto",
              height: "100%",
            }}
          >
            <Grid
              sx={{
                gridTemplateColumns:
                  RightBarComponent !== "none" ? "1fr auto" : "1fr",
                height: "100%",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  minHeight: "100%",
                  pb: 4,
                  width: "100%",
                  overflow: "auto",
                  backgroundColor: bodyColor,
                }}
              >
                {children}
              </Box>
              {RightBarComponent !== "none" && <RightBarComponent />}
            </Grid>
          </Box>
        </FullColumn>
      </Grid>
    </FullColumn>
  );
};
