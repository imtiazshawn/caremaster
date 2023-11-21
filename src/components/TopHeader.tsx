import {
  AccountCircle,
  KeyboardArrowDown,
  Message,
  Notifications,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

import { COLORS } from "@/shared/constants/colors";

import { CommonAvatar } from "./CommonAvatar";
import { Column, FlexBox } from "./common";
import { Search } from "./common/Search";

export const TopHeader = () => {
  return (
    <Column sx={{ gap: 1, marginTop: 2 }}>
      <FlexBox
        sx={{
          gap: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          fontSize: "1.2rem",
        }}
      >
        <Search sx={{ borderRadius: 3, height: "2.7em", maxWidth: "16em" }} />
        <FlexBox
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
          <FlexBox sx={{ gap: 1, flex: 1, alignItems: "center" }}>
            <CommonAvatar icon={AccountCircle} />
            <Typography
              variant='h6'
              display='flex'
              alignItems='center'
            >
              John Doe
            </Typography>
            <KeyboardArrowDown className='cursor-pointer rounded-full hover:bg-slate-200' />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Column>
  );
};
