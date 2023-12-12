import { SxProps } from "$types/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@common/CommonTable";
import { Box, FlexBox } from "@common/index";
import classnames from "classnames";
import React from "react";

export const dOw = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

interface Props {
  blocks: Array<Array<number>>;
  previewBlocks: Array<Array<number>>;
  selectHandler: (
    mouseDownId: string,
    mouseUpId: string,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
  onPreviewHandler: (
    mouseDownId: string | null,
    mouseUpId: string | null,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
  mouseDownId: string | null;
  setMouseDownId: React.Dispatch<React.SetStateAction<string | null>>;
  mouseLastOverId: string | null;
  setMouseLastOverId: React.Dispatch<React.SetStateAction<string | null>>;
}

const getId = (w: number, t: number) => {
  return `${w},${t}`;
};

const weekDayCellStyle: SxProps = {
  width: "150px",
  padding: "10px",
  fontSize: "1.1em",
  fontWeight: "medium",
  userSelect: "none",
};
const blockWidth = 35;
// const cellToTime = (cell: number) => {
//   const hour = String(Math.floor((cell * 15) / 60)).padStart(2, "0");
//   const minute = String(
//     (cell * 15) % 60 === 0 ? "00" : (cell * 15) % 60,
//   ).padStart(2, "0");
//   return `${hour}:${minute}`;
// };

export const AvailabilityTable: React.FC<Props> = ({
  blocks,
  previewBlocks,
  selectHandler,
  onPreviewHandler,
  mouseDownId,
  setMouseDownId,
  setMouseLastOverId,
}) => {
  return (
    <Table
      sx={{
        position: "relative",
        ".MuiTableCell-root": {
          borderBottom: "none",
          p: 0,
        },
        width: "auto",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell sx={{ ...weekDayCellStyle }}>Week day</TableCell>
          {blocks?.[0].map((_: number, i) => {
            const hour = Math.floor((i * 15) / 60);
            const minute = (i * 15) % 60 === 0 ? "00" : (i * 15) % 60;
            if (i % 4 !== 0) {
              return null;
            }
            const time = `${hour}:${minute}`;
            return (
              <TableCell
                key={i}
                id={`${i}`}
                style={{
                  padding: 0,
                  minWidth: `${blockWidth * 4}px`,
                  maxWidth: `${blockWidth * 4}px`,
                  width: `${blockWidth * 4}px`,
                  userSelect: "none",
                }}
              >
                <Box>{time}</Box>
                <div
                  className='pointer-events-none absolute w-[1px] select-none bg-black'
                  style={{
                    height: "calc(100% - 20px)",
                  }}
                ></div>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {blocks.map((value, index) => {
          return (
            <TableRow key={`${value}.${index}`}>
              <TableCell sx={{ ...weekDayCellStyle }}>{dOw[index]}</TableCell>
              {value.map((_: Number, i) => {
                if (i % 4 !== 0) {
                  return null;
                }
                const cells = [i, i + 1, i + 2, i + 3];

                return (
                  <TableCell
                    key={`${index},${i}`}
                    id={`${index},${i}`}
                    sx={{
                      padding: 0,
                      minWidth: `${blockWidth * 4}px`,
                      maxWidth: `${blockWidth * 4}px`,
                    }}
                  >
                    <FlexBox sx={{ gap: 0 }}>
                      {cells.map((cell) => (
                        <Box
                          id={`${index},${cell}`}
                          key={`${index},${cell}`}
                          sx={{
                            backgroundColor: previewBlocks[index][cell]
                              ? "#93c5fd"
                              : undefined,
                            width: "100%",
                          }}
                          onMouseDown={() => {
                            const id = getId(index, cell);
                            if (mouseDownId) {
                              return;
                            }
                            setMouseDownId(id);
                          }}
                          onMouseUp={(e) => {
                            e.stopPropagation();
                            const id = getId(index, cell);
                            if (!mouseDownId) {
                              return;
                            }

                            selectHandler(mouseDownId, id, e);
                            setMouseDownId(null);
                            onPreviewHandler(null, null, e);
                          }}
                          onMouseMove={(e) => {
                            const id = getId(index, cell);
                            if (!mouseDownId) {
                              return;
                            }
                            setMouseLastOverId(id);
                            onPreviewHandler(mouseDownId, id, e);
                          }}
                        >
                          {/* <Tooltip
                            title={
                              <div className='flex flex-col gap-2'>
                                <div>Week day: {dOw[index]}</div>
                                <div>From: {cellToTime(cell)}</div>
                                <div>To: {cellToTime(cell + 1)}</div>
                              </div>
                            }
                          > */}
                          <Box
                            className={classnames("h-4 w-4", {
                              "bg-green-500": blocks[index][cell] === 1,
                              "bg-gray-100": blocks[index][cell] === 0,
                            })}
                            sx={{
                              backgroundColor: previewBlocks[index][cell]
                                ? "#93c5fd"
                                : undefined,
                              width: `${blockWidth}px`,
                              height: `${blockWidth}px`,
                              borderLeft: "1px solid #ccc",
                            }}
                          />
                          {/* </Tooltip> */}
                        </Box>
                      ))}
                    </FlexBox>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
