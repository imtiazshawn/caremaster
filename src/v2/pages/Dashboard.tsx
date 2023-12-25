import { CardWrapper } from "@/v2/components/CardWrapper";
import GoogleMap from "@/v2/components/GoogleMap";
import { Layout } from "@/v2/components/Layout";
import {
  DashboardRightBar,
  UnassignedAppointments,
} from "@/v2/components/rightbars/DashboardRightBar";
import { MIconButton } from "@common/IconButton";
import { H4 } from "@common/Typography";
import { CenteredRow, Column } from "@common/index";
import { FilterAlt, SupervisedUserCircle } from "@mui/icons-material";

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
          gap: 4,
        }}
      >
        <CardWrapper
          color='secondary.main'
          textColor='secondary.contrastText'
          title='Unassigned Appointments'
          actionButtons={[
            <MIconButton
              key='1'
              sx={{
                borderRadius: "5px",
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
                gap: 1,
              }}
            >
              <FilterAlt />
              <H4>Filter</H4>
            </MIconButton>,
          ]}
        >
          <UnassignedAppointments />
        </CardWrapper>
        <CardWrapper
          title='REALTIME MAP'
          color='secondary.main'
          textColor='secondary.contrastText'
          actionButtons={
            <CenteredRow>
              <MIconButton
                key='1'
                sx={{
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  borderRadius: "5px",
                  gap: 1,
                }}
              >
                <SupervisedUserCircle />
                <H4>BY CARE WORKERS</H4>
              </MIconButton>
              <MIconButton
                key='1'
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  gap: 1,
                }}
              >
                <SupervisedUserCircle />
                <H4>BY SERVICE USERS</H4>
              </MIconButton>
            </CenteredRow>
          }
        >
          <GoogleMap />
        </CardWrapper>
      </Column>
    </Layout>
  );
};
