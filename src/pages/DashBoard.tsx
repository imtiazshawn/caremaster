import { CustomBox, CustomFlexBox } from "@components/common";
import { Typography } from "@mui/material";

export const Dashboard = () => {
  return (
    <div className='p-40'>
      <CustomFlexBox sx={{ gap: 2 }}>
        <CustomBox className='h-[200px] w-[200px] items-center justify-center rounded-2xl bg-white p-4 text-center shadow-lg'>
          <Typography variant='h1'>4</Typography>
          <Typography variant='h5'>Service Users</Typography>
        </CustomBox>
        <CustomBox className='h-[200px] w-[200px] items-center justify-center rounded-2xl bg-white p-4 text-center shadow-lg'>
          <Typography variant='h1'>7</Typography>
          <Typography variant='h5'>Care Workers</Typography>
        </CustomBox>
      </CustomFlexBox>
    </div>
  );
};
