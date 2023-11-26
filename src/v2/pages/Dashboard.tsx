import { DashboardRightBar } from "@/v2/components/DashboardRightBar";
import GoogleMap from "@/v2/components/GoogleMap";
import { Layout } from "@/v2/components/Layout";
import { Column } from "@common/index";

export const Dashboard = () => {
  return (
    <Layout rightBar={DashboardRightBar}>
      <Column
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GoogleMap />
      </Column>
    </Layout>
  );
};
