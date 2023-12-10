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
}

export const AvailabilityTable: React.FC<Props> = ({
  blocks,
  previewBlocks,
  selectHandler,
  onPreviewHandler,
}) => {
  const [mouseDownId, setMouseDownId] = React.useState<string | null>(null);
  return (
    <table className='flex flex-col '>
      <tbody>
        {blocks.map((value, index) => {
          return (
            <div
              key={`${index}`}
              className=' flex '
            >
              <th className='flex w-28 select-none items-center justify-center text-center'>
                {dOw[index]}
              </th>
              <tr className='p-3'>
                <div className='flex cursor-default justify-between'>
                  {value.map((_: number, i) => {
                    const hour = Math.floor((i * 15) / 60);
                    const minute = (i * 15) % 60 === 0 ? "00" : (i * 15) % 60;

                    const time = `${hour}:${minute}`;
                    return (
                      <td
                        key={i}
                        id={`${index},${i}`}
                        className='text-sm'
                      >
                        {index === 0 && i % 4 === 0 && time}
                        {index === 0 && i % 4 === 0 && (
                          <div className='pointer-events-none absolute h-72 w-0.5 select-none bg-black'></div>
                        )}
                      </td>
                    );
                  })}
                </div>
                <div className='flex'>
                  {value.map((v: Number, i) => (
                    <td
                      key={i}
                      id={`${index},${i}`}
                      className={classnames("h-4 w-4", {
                        "bg-green-500": v === 1,
                        "bg-gray-100": v === 0,
                        "bg-blue-200": previewBlocks[index][i] === 1,
                      })}
                      onMouseDown={(e) => {
                        const id = e.currentTarget.id;
                        if (mouseDownId) {
                          return;
                        }
                        setMouseDownId(id);
                      }}
                      onMouseUp={(e) => {
                        const id = e.currentTarget.id;
                        if (!mouseDownId) {
                          return;
                        }
                        selectHandler(mouseDownId, id, e);
                        setMouseDownId(null);
                        onPreviewHandler(null, null, e);
                      }}
                      onMouseMove={(e) => {
                        const id = e.currentTarget.id;
                        if (!mouseDownId) {
                          return;
                        }
                        onPreviewHandler(mouseDownId, id, e);
                      }}
                    ></td>
                  ))}
                </div>
              </tr>
            </div>
          );
        })}
      </tbody>
    </table>
  );
};
