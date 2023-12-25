import { Card } from "@/v2/components/common/Card";
import { Column, FlexBox } from "@common/index";
import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";

type Props = {
  sx?: SxProps;
};

export const MaintenanceRightBar: React.FC<Props> = ({ sx }) => {
  return (
    <Card sx={{ width: "25rem", p: 3, ...sx }}>
      <Column sx={{ gap: 1 }}>
        <FlexBox
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#E5E5E5",
          }}
        />
        {Array.from({ length: 5 }).map((_, index) => (
          <FlexBox
            key={index}
            sx={{
              gap: 1,
              padding: 1,
              borderBottom: "1px solid #E5E5E5",
              justifyContent: "space-around",
            }}
          >
            <Typography color='black'>Maintenance {index + 1}</Typography>
            <Typography color='black'>Maintenance description</Typography>
            <Typography color='red'>Required</Typography>

            <Close />
          </FlexBox>
        ))}
      </Column>
    </Card>
  );
};
