import { ModifiedEvent } from "$types/event";
import { useCareWorkersMap } from "@/v2/hooks/useCareWorkersMap";
import { HtmlTooltip } from "@common/Tooltip";
import { Box, FlexBox } from "@common/index";
import dayjs from "dayjs";

type Props = {
  event: ModifiedEvent;
  otherProps?: {
    marginLeft?: string;
    width?: string;
    marginTop?: string;
  };
};

export const EventCard: React.FC<Props> = ({ event, otherProps }) => {
  const isUnassigned = event.care_workers.length === 0;
  const careWorkersMap = useCareWorkersMap();

  return (
    <HtmlTooltip
      title={
        <div>
          <div>{event.title}</div>
          <div>
            {dayjs(event.start_time).format("hh:mm A")} -{" "}
            {dayjs(event.end_time).format("hh:mm A")}
          </div>
          {event.care_workers?.map((careWorkerId, index) => (
            <FlexBox key={careWorkerId}>
              <Box
                sx={{
                  fontWeight: "bold",
                }}
              >
                Carer {index + 1}
              </Box>
              <Box>{careWorkersMap?.[careWorkerId]?.user?.name}</Box>
            </FlexBox>
          ))}
        </div>
      }
    >
      <Box
        sx={{
          position: "absolute",
          backgroundColor: isUnassigned ? "#ffb042" : "#b1e5b1",
          fontWeight: "600",
          p: 0.8,
          borderRadius: "5px",
          border: "0.5px solid #000000",
          ...otherProps,
          marginTop: otherProps?.marginTop
            ? `calc(${otherProps?.marginTop} - 15px)`
            : "-15px",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {event.title}
      </Box>
    </HtmlTooltip>
  );
};
