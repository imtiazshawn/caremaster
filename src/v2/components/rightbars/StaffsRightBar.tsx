import { CardWrapper } from "@/v2/components/CardWrapper";
import { Button } from "@common/Button";
import { Column, FlexBox } from "@common/index";
import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import { Card, Grid, Typography } from "@mui/material";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useState } from "react";

export const CarerOfTheMonth = () => {
  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <Column sx={{ gap: 1 }}>
        <FlexBox
          sx={{
            width: "100%",
            backgroundColor: "#E5E5E5",
          }}
        />
        <Grid
          container
          sx={{
            gap: 1,
            width: "100%",
            p: 1,
            backgroundColor: "#F4F5F6",
            borderRadius: "0.5rem",
          }}
        >
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='start'
            alignItems='start'
          >
            <Typography color='black'>Carer</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display='flex'
            justifyContent='center'
            alignItems='start'
          >
            <Typography color='black'>tasks</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display='flex'
            justifyContent='center'
            alignItems='start'
          >
            <Typography color='red'>late</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            display='flex'
            justifyContent='center'
            alignItems='start'
          >
            <Typography>pts</Typography>
          </Grid>
        </Grid>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid
            container
            key={index}
            sx={{
              gap: 1,
              padding: 1,
              borderBottom: "1px solid #E5E5E5",
            }}
          >
            <Grid
              item
              xs={4}
              display='flex'
              justifyContent='start'
              alignItems='start'
            >
              <Typography color='black'>SuperCarer Name</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display='flex'
              justifyContent='center'
              alignItems='start'
            >
              <Typography color='black'>35</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              display='flex'
              justifyContent='center'
              alignItems='start'
            >
              <Typography color='red'>2</Typography>
            </Grid>
            <Grid
              item
              xs={1}
              display='flex'
              justifyContent='center'
              alignItems='start'
            >
              <Typography>32</Typography>
            </Grid>
          </Grid>
        ))}
      </Column>
    </Card>
  );
};

export const StaffsRightBar = () => {
  const { refetch } = useGetCareWorkersQuery(null);

  const [openCareWorkerModal, setOpenCareWorkerModal] = useState(false);

  return (
    <Column
      sx={{
        gap: 3,
        width: ["30rem", "30rem", "30rem", "30rem", "40rem"],
      }}
    >
      <AddCareWorkerModal
        isOpen={openCareWorkerModal}
        onClose={() => {
          setOpenCareWorkerModal(false);
          refetch();
        }}
      />
      <Button
        variant='contained'
        sx={{
          height: "4.5rem",
          fontSize: "1.2rem",
          borderRadius: ".8rem",
          backgroundColor: "#349572",
        }}
        onClick={() => {
          setOpenCareWorkerModal(true);
        }}
      >
        + New Staff
      </Button>
      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='Carer Of The Month'
      >
        <CarerOfTheMonth />
      </CardWrapper>
    </Column>
  );
};
