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
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        padding: "1rem",
        ...sx,
      }}
    >
      {children}
    </Column>
  );
};
