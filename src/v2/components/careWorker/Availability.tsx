import { Availability } from "$types/Availability";
import { Layout } from "@/v2/components/Layout";
import {
  AvailabilityTable,
  dOw,
} from "@/v2/components/careWorker/AvailabilityTable";
import { useStaffNavLinkProps } from "@/v2/hooks/useStaffNavLinkProps";
import ShowShortMessage from "@common/ShortMessage";
import { Column } from "@common/index";
import { Button } from "@mui/material";
import {
  useCreateCareWorkerAvailabilitiesMutation,
  useGetCareWorkerAvailabilitiesQuery,
} from "@reducers/api/availability";
import { useCareWorkerId } from "@redux/hooks/useCareWorkerId";
import React, { useEffect, useState } from "react";

const getDefaultBlocks = () => {
  const weeklyBlocks: Array<Array<number>> = [];
  for (let i = 0; i < 7; i++) {
    const day: Array<number> = [];
    for (let j = 0; j < 24 * 60; j += 15) {
      day.push(0);
    }

    weeklyBlocks.push(day);
  }

  return weeklyBlocks;
};

const getSlotsFromBlocks = (blocks: Array<Array<number>>) => {
  let prev = -1;
  let startTime = "";
  let endTime = "";

  const slots: Array<Availability> = [];
  blocks.forEach((value, index) => {
    value.forEach((v, i) => {
      const hour = Math.floor((i * 15) / 60);
      const minute = (i * 15) % 60 === 0 ? "00" : (i * 15) % 60;

      if (prev < 0 && v > 0) {
        startTime += `${hour}:`;
        startTime += minute;
      }
      if (prev === 0 && v > 0) {
        startTime += `${hour}:`;
        startTime += minute;
      }
      if (i === value.length - 1 && v === 1) {
        endTime += `${hour}:`;
        endTime += minute;

        slots.push({
          weekday: dOw[index].toLowerCase(),
          start_time: startTime,
          end_time: endTime,
        });

        startTime = "";
        endTime = "";
      }

      if (prev === 1 && v === 0) {
        endTime += `${hour}:`;
        endTime += minute;

        slots.push({
          weekday: dOw[index].toLowerCase(),
          start_time: startTime,
          end_time: endTime,
        });

        startTime = "";
        endTime = "";
      }

      prev = v;
    });
  });

  return slots;
};

const getCoordFromIds = (mouseDownId: string, mouseUpId: string) => {
  let [w1, q1] = mouseDownId.split(",").map((v) => Number.parseInt(v));
  let [w2, q2] = mouseUpId.split(",").map((v) => Number.parseInt(v));

  let tmp = Math.min(w1, w2);
  w2 = Math.max(w1, w2);
  w1 = tmp;

  tmp = Math.min(q1, q2);
  q2 = Math.max(q1, q2);
  q1 = tmp;
  return {
    w1,
    w2,
    q1,
    q2,
  };
};

export const AvailabilityComponent = () => {
  const navLinkProps = useStaffNavLinkProps();
  const careWorkerId = useCareWorkerId();
  const [blocks, setBlocks] = useState<Array<Array<number>>>(
    getDefaultBlocks(),
  );
  const [previewBlocks, setPreviewBlocks] = useState<Array<Array<number>>>(
    getDefaultBlocks(),
  );
  const [schedule, setSchedule] = useState<Array<Availability>>([]);

  const [createAvailabilities] = useCreateCareWorkerAvailabilitiesMutation();
  const { data: availabilities, refetch } = useGetCareWorkerAvailabilitiesQuery(
    careWorkerId ?? 0,
  );

  useEffect(() => {
    if (availabilities) {
      const blocks: Array<Array<number>> = getDefaultBlocks();
      availabilities.forEach((availability) => {
        const weekday = dOw
          .map((d) => d.toLowerCase())
          .indexOf(availability.weekday.toLowerCase());
        const startTime = availability.start_time.split(":");
        const endTime = availability.end_time.split(":");
        const startHour = Number.parseInt(startTime[0]);
        const startMinute = Number.parseInt(startTime[1]);
        const endHour = Number.parseInt(endTime[0]);
        const endMinute = Number.parseInt(endTime[1]);
        const start = startHour * 4 + Math.floor(startMinute / 15);
        const end = endHour * 4 + Math.floor(endMinute / 15);
        for (let i = start; i < end; i++) {
          blocks[weekday][i] = 1;
        }
      });
      setBlocks(blocks);
    }
  }, [availabilities]);

  const selectHandler = (
    mouseDownId: string,
    mouseUpId: string,
    e: React.MouseEvent<HTMLElement>,
  ) => {
    setBlocks((prevBlocks) => {
      const { w1, w2, q1, q2 } = getCoordFromIds(mouseDownId, mouseUpId);

      const newBlocks = prevBlocks.map((value) => [...value]);
      const isShift = e.shiftKey;
      for (let i = w1; i <= w2; i++) {
        for (let j = q1; j <= q2; j++) {
          newBlocks[i][j] = isShift ? 0 : 1;
        }
      }
      setSchedule(getSlotsFromBlocks(newBlocks));
      return newBlocks;
    });
  };

  const onPreviewHandler = (
    mouseDownId: string | null,
    mouseUpId: string | null,
  ) => {
    if (!mouseDownId || !mouseUpId) {
      setPreviewBlocks(getDefaultBlocks());
      return;
    }
    setPreviewBlocks(() => {
      const { w1, w2, q1, q2 } = getCoordFromIds(mouseDownId, mouseUpId);

      const newBlocks = getDefaultBlocks();
      for (let i = w1; i <= w2; i++) {
        for (let j = q1; j <= q2; j++) {
          newBlocks[i][j] = 1;
        }
      }

      return newBlocks;
    });
  };

  const saveHandler = async () => {
    await createAvailabilities({
      care_worker: careWorkerId ?? 0,
      availabilities: schedule,
    });
    ShowShortMessage("Availability saved");
    refetch();
  };

  return (
    <Layout sidebarProps={navLinkProps}>
      <Column
        sx={{
          gap: "1em",
          p: 5,
          borderRadius: "1rem",
        }}
      >
        <AvailabilityTable
          blocks={blocks}
          previewBlocks={previewBlocks}
          selectHandler={selectHandler}
          onPreviewHandler={onPreviewHandler}
        />
        <Button
          variant='contained'
          onClick={saveHandler}
        >
          Save
        </Button>
      </Column>
    </Layout>
  );
};
