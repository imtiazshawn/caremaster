import { ReactNode } from "react";

import { COLORS } from "@/shared/constants/colors";

import { CustomBox, CustomGrid, FullColumn } from "./common";
import { Navbar } from "./Navbar";
import { TopHeader } from "./TopHeader";

export const PageLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <FullColumn sx={{ height: "100vh", backgroundColor: COLORS.BACKGROUND }}>
      <CustomGrid
        sx={{
          gridTemplateColumns: "270px 1fr",
          height: "100%",
        }}
      >
        <Navbar />
        <FullColumn>
          <TopHeader />
          <CustomBox
            sx={{
              height: "100%",
            }}
          >
            {children}
          </CustomBox>
        </FullColumn>
      </CustomGrid>
    </FullColumn>
  );
};
