import { Button } from "@common/Button";
import { H1, H2 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { AddCircle, MoreHoriz } from "@mui/icons-material";
import { CSSProperties } from "styled-components";

type Props = {
  title: string;
  value: string;
  backgroundColor?: CSSProperties["backgroundColor"];
  textColor?: CSSProperties["color"];
  onViewAllClick?: () => void;
  onAddClick?: () => void;
  onContextMenu?: () => void;
};

export const DashboardCard: React.FC<Props> = ({
  title,
  value,
  textColor = "white",
  backgroundColor = "blue",
  // onViewAllClick,
  // onAddClick,
  // onContextMenu,
}) => {
  return (
    <Column
      sx={{
        padding: 4,
        borderRadius: "1rem",
        width: 200,
        height: 200,
        backgroundColor,
        color: textColor,
        justifyContent: "space-between",
      }}
    >
      <FlexBox
        sx={{
          justifyContent: "space-between",
        }}
      >
        <H2>{title}</H2>
        <MoreHoriz
          sx={{
            cursor: "pointer",
          }}
        />
      </FlexBox>
      <FlexBox
        sx={{
          justifyContent: "center",
        }}
      >
        <H1>{value}</H1>
      </FlexBox>
      <FlexBox
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          height: "2rem",
        }}
      >
        <AddCircle
          fontSize='large'
          sx={{
            border: "4px solid rgba(255,255,255,0.5)",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
        <Button
          sx={{
            borderRadius: "2rem",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
          variant='contained'
        >
          View All
        </Button>
      </FlexBox>
    </Column>
  );
};
