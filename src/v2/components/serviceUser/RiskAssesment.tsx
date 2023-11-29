import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { useClientNavLinkProps } from "@/v2/hooks/useClientNavLinkProps";
import { Column } from "@common/index";

export const RiskAssessment: React.FC = () => {
  const navLinkProps = useClientNavLinkProps();
  return (
    <Layout
      rightBar={MaintenanceRightBar}
      sidebarProps={navLinkProps}
    >
      <Column
        sx={{
          width: "100%",
          p: 3,
        }}
      >
        Risk assessment
      </Column>
    </Layout>
  );
};
