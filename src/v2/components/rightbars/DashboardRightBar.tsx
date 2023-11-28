import { Card } from "@/v2/components/common/Card";
import { dummyAlerts, unassignedAppointments } from "@/v2/utils/dummy";
import { H2 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { Close, ErrorOutline, Link } from "@mui/icons-material";
import dayjs from "dayjs";

const Alerts = () => {
  return (
    <Card
      sx={{
        width: "100%",
        p: 3,
        marginTop: "2rem",
      }}
    >
      <Column sx={{ gap: 1 }}>
        <FlexBox sx={{ justifyContent: "space-between" }}>
          <H2>Alerts</H2>
          <span
            style={{ color: "#00B894", cursor: "pointer", userSelect: "none" }}
          >
            View All
          </span>
        </FlexBox>
        <FlexBox
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#E5E5E5",
          }}
        />
        <Column sx={{ overflow: "auto", maxHeight: 500 }}>
          {dummyAlerts.map((alert, index) => (
            <FlexBox
              key={index}
              sx={{
                gap: 2,
                padding: 1,
                pt: 2,
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "0.5rem",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#EAEAEA",
                },
              }}
            >
              <ErrorOutline
                fontSize='large'
                color={alert.type}
              />
              <Column>
                <span>{alert.title}</span>
                <span style={{ maxHeight: "60px", overflow: "hidden" }}>
                  {alert.description}
                </span>
                <span>
                  {dayjs(new Date(alert.time)).format("hh:mm A, DD MMM")}
                </span>
              </Column>

              <Close />
            </FlexBox>
          ))}
        </Column>
      </Column>
    </Card>
  );
};

const UnassignedAppointments = () => {
  return (
    <Card
      sx={{
        width: "100%",
        p: 3,
        marginTop: "2rem",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Column sx={{ gap: 1 }}>
        <H2>Unassigned Appointments</H2>
        <FlexBox
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#E5E5E5",
          }}
        />
        {unassignedAppointments.map((appointment, index) => (
          <FlexBox
            key={index}
            sx={{
              gap: 1,
              padding: 1,
              border: "1px solid #E5E5E5",
              borderRadius: "0.5rem",
              justifyContent: "space-between",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#E5E5E5",
              },
            }}
          >
            <Column>
              <span>{appointment.title}</span>
            </Column>

            <Link />
          </FlexBox>
        ))}
      </Column>
    </Card>
  );
};

export const DashboardRightBar = () => {
  return (
    <Column
      sx={{
        width: ["16rem", "18rem", "20rem", "25rem", "40rem"],
      }}
    >
      <Alerts />
      <UnassignedAppointments />
    </Column>
  );
};
