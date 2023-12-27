import { COLOR } from "@/theme";
import { CardWrapper } from "@/v2/components/CardWrapper";
import { Card } from "@/v2/components/common/Card";
import { dummyAlerts, unassignedAppointments } from "@/v2/utils/dummy";
import { Column, FlexBox } from "@common/index";
import { Close, Link } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
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
            backgroundColor: "#FFFFFF",
          }}
        />
        <Column sx={{ overflow: "auto" }}>
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
              <Column
                sx={{
                  height: "50px",
                }}
              >
                <Typography
                  color='secondary.contrastText'
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  {alert.description}
                </Typography>
                <Typography color='gray'>
                  {dayjs(new Date(alert.time)).format("hh:mm A, DD MMM")}
                </Typography>
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
  const dummyTime = ["8:00-9:30", "12:30-13:30", "15:30-16:30"];

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
              p: "3px",
              borderBottom: "1px solid #E5E5E5",
              justifyContent: "space-between",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#E5E5E5",
              },
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
              }}
            >
              <Grid
                item
                xs={4}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='start'
              >
                <Typography color='black'>{appointment.title}</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Typography color='black'>Today</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Typography color='black'>{dummyTime[index]}</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Typography
                  sx={{
                    backgroundColor: "#FFF5EB",
                    border: "2px solid #FED5AF",
                    borderRadius: "8px",
                    py: "3px",
                    px: "8px",
                  }}
                  color='#FC9736'
                >
                  Unassigned
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Typography color='#F48282'>Edit Roster</Typography>
              </Grid>
            </Grid>

            <Link />
          </FlexBox>
        ))}
      </Column>
    </Card>
  );
};

export const Training = () => {
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
            backgroundColor: "#FFFFFF",
          }}
        />
        <Column sx={{ overflow: "auto", maxHeight: 500 }}>
          <Grid container>
            <Grid
              item
              xs={5}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
            >
              <Typography
                color={COLOR.redText}
                sx={{
                  overflow: "hidden",
                }}
              >
                Due Training
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography color='gray'>19 users</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E0E2E7",
                  px: "0.1rem",
                }}
              >
                check
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={5}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
            >
              <Typography
                color={COLOR.yellowText}
                sx={{
                  overflow: "hidden",
                }}
              >
                Training Running
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography color='gray'>22 users</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E0E2E7",
                  px: "0.1rem",
                }}
              >
                check
              </Button>
            </Grid>
          </Grid>
        </Column>
      </Column>
    </Card>
  );
};

export const CheckList = () => {
  const dummyList = [
    {
      title: "Routine Health Checkup",
      status: "Required",
      users: 20,
    },
    {
      title: "DBS Certificate",
      status: "Required",
      users: 26,
    },
    {
      title: "Carer Screening",
      status: "Required",
      users: 12,
    },
    {
      title: "Risk Assessment",
      status: "Required",
      users: 14,
    },
  ];
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
        {dummyList.map((value, index) => (
          <FlexBox
            key={index}
            sx={{
              gap: 1,
              p: "3px",
              borderBottom: "1px solid #E5E5E5",
              justifyContent: "space-between",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#E5E5E5",
              },
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
              }}
            >
              <Grid
                item
                xs={5}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='start'
              >
                <Typography color='black'>{value.title}</Typography>
              </Grid>

              <Grid
                item
                xs={4}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Typography color='#F48282'>{value.status}</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
              >
                <Typography color='black'>{value.users} users</Typography>
              </Grid>
            </Grid>
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
      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='Alerts'
      >
        <Alerts />
      </CardWrapper>
      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='Training'
      >
        <Training />
      </CardWrapper>
      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='CheckList'
      >
        <CheckList />
      </CardWrapper>
    </Column>
  );
};
