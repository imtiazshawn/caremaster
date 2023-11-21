import { ReactNode } from "react";

import { Layout } from "@components/layout/Layout";

export const PageLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <Layout>{children}</Layout>;
};
