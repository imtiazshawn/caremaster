import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { useClientNavLinkProps } from "@/v2/hooks/useClientNavLinkProps";
import { FullRow } from "@common/index";
import CarePlanTaskTab from "@serviceUsersUI/CarePlanTab";

export const ClientPlanActivity: React.FC = () => {
  const navLinkProps = useClientNavLinkProps();

  return (
    <Layout
      rightBar={MaintenanceRightBar}
      sidebarProps={navLinkProps}
    >
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
