import { Box, FlexBox } from "@common/index";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardCard = ({
  label,
  value: propValue,
}: {
  value: number;
  label: string;
}) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (value >= propValue) {
          clearInterval(interval);
          return;
        }
        setValue((value) => value + 1);
      },
      (1 / propValue) * 100,
    );
    return () => clearInterval(interval);
  }, [propValue, value]);

  return (
    <Box className='h-[200px] w-[320px] items-center justify-center rounded-xl bg-white p-4 text-center shadow-lg'>
      <Typography variant='h1'>{value}</Typography>
      <Typography variant='h5'>{label}</Typography>
    </Box>
  );
};

export const Dashboard = () => {
  return (
    <div className='p-40'>
      <FlexBox>
        <DashboardCard
          label='Service Users'
          value={50}
        />
        <DashboardCard
          label='Care Workers'
          value={36}
        />
      </FlexBox>
    </div>
  );
};
