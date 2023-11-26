import { Box } from "@common/index";
import { SxProps } from "@mui/system";
// an extensible divider component

type DividerProps = {
  sx?: SxProps;
};
export const Divider: React.FC<DividerProps> = ({ sx }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "1px",
        backgroundColor: "#E5E5E5",
        ...sx,
      }}
    />
  );
};
