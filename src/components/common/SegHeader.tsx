import { H4 } from "@common/Typography";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Row } from "./index";

type Props = {
  currentSegment: string;
  isExpanded?: boolean;
  changeExpandSegment: (segment: string) => void;
};

export const SegHeader = ({
  currentSegment,
  isExpanded,
  changeExpandSegment,
}: Props) => {
  return (
    <Row
      onClick={() => changeExpandSegment(currentSegment)}
      sx={{
        cursor: "pointer",
        backgroundColor: "rgba(148, 163, 184, 0.14)",
        padding: 2,
        height: "4rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <H4>{currentSegment}</H4>
      <Box>
        {isExpanded && <ExpandMoreIcon />}
        {!isExpanded && <ControlPointIcon />}
      </Box>
    </Row>
  );
};
