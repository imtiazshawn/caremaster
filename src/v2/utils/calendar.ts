import { AvailabilityGet } from "$types/Availability";
import { CareWorker } from "$types/careWorkers";
import { GridType, ModifiedEvent, RotaEventGet } from "$types/event";
import { diffInMinutes } from "@/v2/utils/date";
import dayjs from "dayjs";

export const getCurrentEventInfo = (
  events: ModifiedEvent[],
  currentDate: Date,
  hourWidth: number,
  currentHour: number,
) => {
  const dateNow = new Date(currentDate);
  return events
    .filter(
      (event) =>
        event.start &&
        event.start >= new Date(dateNow.setHours(currentHour, 0, 0, 0)) &&
        event.start < new Date(dateNow.setHours(currentHour + 1, 0, 0, 0)),
    )
    .sort(
      (a, b) =>
        new Date(a.start as Date).valueOf() -
        new Date(b.start as Date).valueOf(),
    )
    .map((event) => {
      let marginLeft = "0px";
      let width = "0px";
      const duration = diffInMinutes(event?.start, event?.end);
      const differenceFromStart = diffInMinutes(
        event?.start,
        new Date(dateNow.setHours(currentHour, 0, 0, 0)),
      );

      marginLeft = `${(differenceFromStart / 60) * hourWidth}px`;
      width = `${(duration / 60) * hourWidth}px`;

      return {
        marginLeft,
        width,
        event,
      };
    });
};

export const getCurrentTimeIndicatorInfo = (
  currentDate: Date,
  hourWidth: number,
  currentHour: number,
) => {
  if (
    dayjs(currentDate).format("DD/MM/YYYY") !== dayjs().format("DD/MM/YYYY")
  ) {
    return {
      shouldShowTimeHere: false,
      marginLeft: "0px",
    };
  }

  const shouldShowTimeHere =
    new Date().getHours() >= currentHour &&
    new Date().getHours() < currentHour + 1;

  const differenceFromNow = diffInMinutes(
    new Date().setHours(currentHour, 0, 0, 0),
    new Date(),
  );

  const marginLeft = shouldShowTimeHere
    ? `${(differenceFromNow / 60) * hourWidth}px`
    : "0px";

  return {
    shouldShowTimeHere,
    marginLeft,
  };
};

export const getModifiedEvents = (events: RotaEventGet[] | undefined) => {
  return (
    events?.map((event) => {
      const startDate = dayjs(
        `${event.date} ${event.start_time}`,
        "YYYY-MM-DD HH:mm:ss",
      ).toDate();

      const endTime = dayjs(
        `${event.date} ${event.end_time}`,
        "YYYY-MM-DD HH:mm:ss",
      ).toDate();

      return {
        ...event,
        start_date: startDate,
        start: startDate,
        end: endTime,
        end_date: "",
        end_time: endTime,
        start_time: startDate,
        resource: {
          id: event.id,
        },
      } as ModifiedEvent;
    }) ?? []
  );
};

export const getCareWorkerGrid = (
  currentDate: Date,
  events: ModifiedEvent[],
  careWorkers: CareWorker[],
) => {
  const eventsGroupedByCareWorker =
    events
      .filter((event) => new Date(event.start_time) >= new Date(currentDate))
      .reduce(
        (acc, event) => {
          for (const care_worker of event.care_workers) {
            if (care_worker in acc) {
              acc[care_worker].push(event);
            } else {
              acc[care_worker] = [event];
            }
          }

          return acc;
        },
        {} as Record<string, ModifiedEvent[]>,
      ) ?? {};

  const unassignedEvents = events?.filter(
    (event) => event.care_workers.length === 0,
  );

  const grid: GridType = [
    Array.from({ length: 24 }, (_, j) => j).map((j) => {
      return {
        id: `${j}`,
        timeStart: j,
        events: unassignedEvents ?? [],
        careWorker: null,
      };
    }),
    ...Object.keys(eventsGroupedByCareWorker).map((id) => {
      const events = eventsGroupedByCareWorker[id];
      const careWorker = careWorkers?.find(
        (careWorker) => String(careWorker.id) === String(id),
      );
      return Array.from({ length: 24 }, (_, j) => j).map((j) => {
        return {
          id: `${j}`,
          timeStart: j,
          events,
          careWorker: careWorker ?? null,
        };
      });
    }),
  ];
  return grid;
};

export const getAvailabilityRangesInfo = (
  availabilities: AvailabilityGet[],
  currentDate: Date,
  hourWidth: number,
) => {
  const dateNow = new Date(currentDate);
  let lastEndTime = new Date(dateNow.setHours(0, 0, 0, 0));
  const availabilityRanges: {
    start: number;
    end: number;
    isAvailable: boolean;
  }[] = [];

  availabilities
    .filter(
      (availability) =>
        availability.weekday === dayjs(dateNow).format("dddd").toLowerCase(),
    )
    .sort(
      (a, b) =>
        dayjs(`${dayjs().format("YYYY-MM-DD")} ${a.start_time}`).valueOf() -
        dayjs(`${dayjs().format("YYYY-MM-DD")} ${b.start_time}`).valueOf(),
    )
    .forEach((availability) => {
      const startTime = dayjs(
        `${dayjs(dateNow).format("YYYY-MM-DD")} ${availability.start_time}`,
      ).toDate();
      const endTime = dayjs(
        `${dayjs(dateNow).format("YYYY-MM-DD")} ${availability.end_time}`,
      ).toDate();
      dateNow.setHours(0, 0, 0, 0);

      if (lastEndTime < startTime) {
        availabilityRanges.push({
          start:
            (diffInMinutes(lastEndTime, new Date(dateNow)) / 60) * hourWidth,
          end: (diffInMinutes(startTime, new Date(dateNow)) / 60) * hourWidth,
          isAvailable: false,
        });
      }

      availabilityRanges.push({
        start: (diffInMinutes(startTime, new Date(dateNow)) / 60) * hourWidth,
        end: (diffInMinutes(endTime, new Date(dateNow)) / 60) * hourWidth,
        isAvailable: true,
      });

      lastEndTime = endTime;
    });

  const lastTime = new Date(dateNow.setHours(23, 59, 59, 999));

  if (lastEndTime < lastTime) {
    dateNow.setHours(0, 0, 0, 0);
    availabilityRanges.push({
      start: (diffInMinutes(lastEndTime, new Date(dateNow)) / 60) * hourWidth,
      end: (diffInMinutes(lastTime, new Date(dateNow)) / 60) * hourWidth,
      isAvailable: false,
    });
  }

  return availabilityRanges;
};
