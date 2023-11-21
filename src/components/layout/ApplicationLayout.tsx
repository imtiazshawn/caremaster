import { Sidebar } from "@components/apply/Sidebar";
import { Layout } from "@components/layout/Layout";
import { ReactNode } from "react";

export const ApplicationLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <Layout
      sidebar={Sidebar}
      applyTopHeader={false}
    >
      {children}
    </Layout>
  );
};
