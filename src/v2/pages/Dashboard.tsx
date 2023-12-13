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
import { SupervisedUserCircle } from "@mui/icons-material";
import { Button } from "@mui/material";

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
          title='Unassigned Appointments'
          actionButtons={[
            <Button
              variant='contained'
              key='1'
              sx={{
                backgroundColor: "white",
                color: "#1F6D6B",
              }}
            >
              Call
            </Button>,
          ]}
        >
          <UnassignedAppointments />
        </CardWrapper>
        <CardWrapper
          title='REALTIME MAP'
          actionButtons={
            <CenteredRow>
              <MIconButton
                key='1'
                sx={{
                  backgroundColor: "#1F6D6B",
                  color: "white",
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
                  backgroundColor: "white",
                  color: "#1F6D6B",
                  borderRadius: "5px",
                  gap: 1,
                  ":hover": {
                    backgroundColor: "#1F6D6B",
                    color: "white",
                  },
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
