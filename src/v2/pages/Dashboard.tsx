import GoogleMap from "@/v2/components/GoogleMap";
import { Layout } from "@/v2/components/Layout";
import { DashboardCard } from "@/v2/components/dashboard/DashboardCard";
import { DashboardRightBar } from "@/v2/components/rightbars/DashboardRightBar";
import { Column, FullRow } from "@common/index";

export const Dashboard = () => {
  return (
    <Layout
      rightBar={DashboardRightBar}
      bodyColor='transparent'
    >
      <Column
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          gap: 4,
        }}
      >
        <FullRow sx={{ flexWrap: "wrap", gap: 4 }}>
          <DashboardCard
            title='Pages'
            value='1345'
            backgroundColor='#00b894'
          />
          <DashboardCard
            title='Posts'
            value='12,456'
            backgroundColor='purple'
          />
          <DashboardCard
            title='Users'
            value='21'
            backgroundColor='orange'
          />
          <DashboardCard
            title='Files'
            value='1220'
            backgroundColor='blue'
          />
          <DashboardCard
            title='Categories'
            value='65'
            backgroundColor='grey'
          />
          <DashboardCard
            title='Comments'
            value='35'
            backgroundColor='green'
          />
        </FullRow>
        <GoogleMap />
      </Column>
    </Layout>
  );
};
