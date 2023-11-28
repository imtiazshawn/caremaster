import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { FullRow } from "@common/index";
import CarePlanTaskTab from "@serviceUsersUI/CarePlanTab";

export const ClientPlanActivity: React.FC = () => {
  return (
    <Layout rightBar={MaintenanceRightBar}>
      <FullRow
        sx={{
          width: "100%",
          p: 3,
        }}
      >
        <CarePlanTaskTab />
      </FullRow>
    </Layout>
  );
};
