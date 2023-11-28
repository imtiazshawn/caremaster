import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Column } from "@common/index";

export const RiskAssessment: React.FC = () => {
  return (
    <Layout rightBar={MaintenanceRightBar}>
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
