import {
  AccountCircle,
  KeyboardArrowDown,
  Message,
  Notifications,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

import { COLORS } from "@/shared/constants/colors";

import { CustomColumn, CustomFlexBox } from "./common";
import { CommonAvatar } from "./CommonAvatar";
import { GlobalSearch } from "./GlobalSearch";

export const TopHeader = () => {
  return (
    <CustomColumn sx={{ gap: 1, marginTop: 2 }}>
      <CustomFlexBox
        sx={{
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          fontSize: "1.2rem",
        }}
      >
        <GlobalSearch />
        <CustomFlexBox
          sx={{
            gap: 1,
            background: COLORS.WHITE,
            px: 2,
            py: 0.5,
            borderRadius: 20,
          }}
        >
          <CommonAvatar icon={Notifications} />
          <CommonAvatar icon={Message} />
          <CustomFlexBox sx={{ gap: 1, flex: 1, alignItems: "center" }}>
            <CommonAvatar icon={AccountCircle} />
            <Typography
              variant='h6'
              display='flex'
              alignItems='center'
            >
              John Doe
            </Typography>
            <KeyboardArrowDown className='cursor-pointer rounded-full hover:bg-slate-200' />
          </CustomFlexBox>
        </CustomFlexBox>
      </CustomFlexBox>
    </CustomColumn>
  );
};
