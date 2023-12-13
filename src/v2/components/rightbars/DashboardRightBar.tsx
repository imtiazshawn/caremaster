import { CardWrapper } from "@/v2/components/CardWrapper";
import { Card } from "@/v2/components/common/Card";
import { dummyAlerts, unassignedAppointments } from "@/v2/utils/dummy";
import { Column, FlexBox } from "@common/index";
import { Close, ErrorOutline, Link } from "@mui/icons-material";
import dayjs from "dayjs";

const Alerts = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      }}
    >
      <Column sx={{ gap: 1 }}>
        <FlexBox sx={{ justifyContent: "space-between" }}></FlexBox>
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
                borderBottom: "2px rgba(0,0,0,0.1) solid",
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

export const UnassignedAppointments = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <Column sx={{ gap: 1 }}>
        <FlexBox
          sx={{
            width: "100%",
            height: "1px",
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
      <CardWrapper title='Alerts'>
        <Alerts />
      </CardWrapper>
    </Column>
  );
};
