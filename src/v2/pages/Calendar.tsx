import { SxProps } from "$types/index";
import { Layout } from "@/v2/components/Layout";
import { EventCard } from "@/v2/components/calendar/EventCard";
import { useCareWorkerAvailabilitiesMap } from "@/v2/hooks/useCareWorkerAvailabilitiesMap";
import {
  getAvailabilityRangesInfo,
  getCareWorkerGrid,
  getCurrentEventInfo,
  getCurrentTimeIndicatorInfo,
  getModifiedEvents,
} from "@/v2/utils/calendar";
import { Button } from "@common/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@common/CommonTable";
import DateField from "@common/DateField";
import { Box, Column, FlexBox } from "@common/index";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useGetAllEventsQuery } from "@reducers/api/eventApi";
import { FC, useState } from "react";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const Calendar: FC = () => {
  const { data: rotaEvents } = useGetAllEventsQuery();
  const { data: careWorkers } = useGetCareWorkersQuery();
  const events = getModifiedEvents(rotaEvents);

  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  const availabilitiesMap = useCareWorkerAvailabilitiesMap();

  const grid = getCareWorkerGrid(currentDate, events, careWorkers ?? []);

  const nameColumStyle: SxProps = {
    minWidth: "120px",
    padding: "10px",
    fontSize: "1.1em",
    fontWeight: "medium",
  };

  const hourWidth = 50;
  const cellHeight = hourWidth * 2;
  const hourPixel = `${hourWidth}px`;

  const normalCellStyle: SxProps = {
    minWidth: hourPixel,
    maxWidth: hourPixel,
    height: cellHeight,
  };

  return (
    <Layout>
      <Column
        sx={{
          p: 3,
          borderRadius: "10px",
        }}
      >
        <FlexBox>
          <DateField
            value={currentDate}
            sx={{
              maxWidth: "200px",
            }}
            onChange={(date) => setCurrentDate(date?.toDate() ?? new Date())}
          />

          <Button
            variant='outlined'
            onClick={() => {
              setCurrentDate(
                new Date(currentDate.setDate(currentDate.getDate() - 1)),
              );
            }}
          >
            Previous
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setCurrentDate(
                new Date(currentDate.setDate(currentDate.getDate() + 1)),
              );
            }}
          >
            Next
          </Button>
        </FlexBox>

        <FlexBox>
          <Table
            sx={{
              position: "relative",
              width: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={nameColumStyle}>Care Worker</TableCell>
                {Array.from({ length: 24 }, (_, i) => i).map((i) => {
                  const { shouldShowTimeHere, marginLeft } =
                    getCurrentTimeIndicatorInfo(currentDate, hourWidth, i);

                  return (
                    <TableCell
                      sx={{
                        textAlign: "left",
                        pl: 0,
                        ...normalCellStyle,
                      }}
                      key={i}
                    >
                      {i % 24}:00
                      {shouldShowTimeHere && (
                        <Box
                          sx={{
                            position: "absolute",
                            width: "1px",
                            height: "100%",
                            backgroundColor: "#000000",
                            marginLeft,
                            zIndex: 1000,
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {grid.map((row, i) => {
                const isUnassigned =
                  row?.[0]?.events?.[0]?.care_workers?.length === 0;
                const rowName = row?.[0]?.careWorker?.user?.name;
                const careWorker = row?.[0]?.careWorker;
                const availRanges = careWorker
                  ? getAvailabilityRangesInfo(
                      availabilitiesMap[careWorker.id ?? 0] ?? [],
                      currentDate,
                      hourWidth,
                    )
                  : [];

                return (
                  <TableRow
                    sx={{
                      ...(isUnassigned
                        ? {
                            height: "100px",
                          }
                        : {}),

                      position: "relative",
                    }}
                    key={i}
                  >
                    <TableCell sx={nameColumStyle}>
                      {isUnassigned ? "Unassigned" : rowName}
                    </TableCell>

                    {row.map((col, j) => {
                      const eventCards = getCurrentEventInfo(
                        col.events,
                        currentDate,
                        hourWidth,
                        j,
                      );

                      return (
                        <TableCell
                          sx={{
                            width: hourPixel,
                            borderRight: "1px solid #bebebe",
                            borderLeft: "1px solid #bebebe",
                            p: 0,
                            ...normalCellStyle,
                          }}
                          key={j}
                        >
                          {eventCards.map(
                            ({ event, marginLeft, width }, index) => (
                              <EventCard
                                key={event.id}
                                event={event}
                                otherProps={{
                                  marginLeft,
                                  width,
                                  marginTop: `${index * 10}px`,
                                }}
                              />
                            ),
                          )}
                        </TableCell>
                      );
                    })}

                    {!isUnassigned && (
                      <Box
                        sx={{
                          position: "relative",
                          display: "grid",
                        }}
                      >
                        <FlexBox
                          sx={{
                            position: "absolute",
                            left: -hourWidth * 24,
                            top: cellHeight - 5,
                            height: "5px",
                            width: hourWidth * 24,
                            gap: 0,
                          }}
                        >
                          {availRanges.map(
                            ({ start, end, isAvailable }, index) => (
                              <Box
                                sx={{
                                  width: end - start,
                                  height: "100%",
                                  backgroundColor: isAvailable
                                    ? "#5ab75a"
                                    : "#ffc0c0",
                                }}
                                key={index}
                              />
                            ),
                          )}
                        </FlexBox>
                      </Box>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </FlexBox>
      </Column>
    </Layout>
  );
};

export default Calendar;
