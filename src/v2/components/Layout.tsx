import { ReactNode } from "react";

import { COLORS } from "@/shared/constants/colors";

import { Box, FullColumn, Grid } from "@common/index";
import { Navbar, NavbarProps } from "./Navbar/Navbar";
import { TopHeader } from "./TopHeader";

type LayoutProps = {
  children?: ReactNode;
  applyTopHeader?: boolean;
  sidebar?: () => ReactNode;
  sidebarProps?: NavbarProps;
  rightBar?: (props: any) => ReactNode;
  bodyColor?: string;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  applyTopHeader = true,
  sidebar = Navbar,
  rightBar = "none",
  bodyColor = COLORS.WHITE,
  sidebarProps,
}) => {
  const SidebarComponent = sidebar;
  const RightBarComponent = rightBar;
  return (
    <FullColumn
      sx={{
        height: "100vh",
        backgroundColor: COLORS.BACKGROUND,
        overflow: "hidden",
        gap: 0,
      }}
    >
      {applyTopHeader ? <TopHeader /> : <></>}
      <Grid
        sx={{
          gridTemplateColumns: "22rem 1fr",
          height: "100%",
        }}
      >
        <SidebarComponent {...sidebarProps} />
        <FullColumn sx={{ height: "100vh", marginBottom: "5em", p: 3 }}>
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
                mt: 3,
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
