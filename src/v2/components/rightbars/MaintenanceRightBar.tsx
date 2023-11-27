import { Card } from "@/v2/components/common/Card";
import { H2 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { Close } from "@mui/icons-material";
import { SxProps } from "@mui/system";

type Props = {
  sx?: SxProps;
};

export const MaintenanceRightBar: React.FC<Props> = ({ sx }) => {
  return (
    <Card sx={{ width: "25rem", p: 3, ...sx }}>
      <Column sx={{ gap: 1 }}>
        <H2>Maintenance</H2>
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
              border: "1px solid #E5E5E5",
              borderRadius: "0.5rem",
              justifyContent: "space-around",
            }}
          >
            <Column>
              <span>Maintenance {index + 1}</span>
              <span>Maintenance description</span>
            </Column>

            <Close />
          </FlexBox>
        ))}
      </Column>
    </Card>
  );
};
