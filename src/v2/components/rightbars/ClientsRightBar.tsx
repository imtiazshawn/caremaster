import { CardWrapper } from "@/v2/components/CardWrapper";
import { Button } from "@common/Button";
import { Column, FlexBox } from "@common/index";
import AddServiceUserModal from "@components/modals/AddServiceUserModal";
import { Card, Grid, Typography } from "@mui/material";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";
import { useState } from "react";

export const CheckListSummary = () => {
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
        p: 2,
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
              p: "0.5rem",
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

export const Contracts = () => {
  return (
    <Card
      sx={{
        p: 2,
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
                sx={{
                  overflow: "hidden",
                }}
              >
                Contract Sent
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
                sx={{
                  overflow: "hidden",
                }}
              >
                Expiring in 7 days
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
                sx={{
                  overflow: "hidden",
                }}
              >
                Contract Expired
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

export const ClientRightBar = () => {
  const { refetch } = useGetServiceUsersQuery();

  const [openServiceUserModal, setOpenServiceUserModal] = useState(false);

  return (
    <Column
      sx={{
        gap: 3,
        width: ["30rem", "30rem", "30rem", "30rem", "40rem"],
      }}
    >
      <AddServiceUserModal
        isOpen={openServiceUserModal}
        onClose={() => {
          setOpenServiceUserModal(false);
          refetch();
        }}
      />
      <Button
        variant='outlined'
        sx={{
          height: "4.5rem",
          fontSize: "1.2rem",
          borderRadius: ".8rem",
          backgroundColor: "#349572",
        }}
        onClick={() => {
          setOpenServiceUserModal(true);
        }}
      >
        + New Client
      </Button>
      {/* <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='Maintenance'
      >
        <MaintenanceRightBar
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "50rem",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            p: 4,
          }}
        />
      </CardWrapper> */}

      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='CheckList Summary'
      >
        <CheckListSummary />
      </CardWrapper>

      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='Contracts'
      >
        <Contracts />
      </CardWrapper>
    </Column>
  );
};
