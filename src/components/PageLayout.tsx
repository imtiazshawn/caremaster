import { ReactNode } from "react";

import { CustomBox, CustomGrid } from "./common";
import { Navbar } from "./Navbar";

export const PageLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <CustomGrid
      sx={{
        gridTemplateColumns: "250px 1fr",
        height: "100vh",
      }}
    >
      <Navbar />
      <CustomBox>{children}</CustomBox>
    </CustomGrid>
  );
};
