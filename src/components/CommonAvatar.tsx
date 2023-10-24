import { SvgIconComponent } from "@mui/icons-material";

import { COLORS } from "@/shared/constants/colors";

import { CustomFlexBox } from "./common";

export const CommonAvatar: React.FC<{ icon: SvgIconComponent }> = ({
  icon,
}) => {
  const Icon = icon;
  return (
    <CustomFlexBox
      sx={{
        gap: 1,
        alignItems: "center",
        p: 1,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
      }}
      className='cursor-pointer border hover:bg-slate-200'
    >
      <Icon
        sx={{
          height: ".8em",
          width: ".8em",
        }}
      />
    </CustomFlexBox>
  );
};
