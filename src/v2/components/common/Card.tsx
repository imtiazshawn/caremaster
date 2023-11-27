import { Column } from "@common/index";
import { SxProps } from "@mui/system";

type CardProps = {
  children: React.ReactNode;
  sx?: SxProps;
};
export const Card: React.FC<CardProps> = ({ children, sx }) => {
  return (
    <Column
      sx={{
        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "1rem",
        ...sx,
      }}
    >
      {children}
    </Column>
  );
};
