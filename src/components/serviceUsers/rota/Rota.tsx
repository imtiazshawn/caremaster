import { RotaEventGet } from "$types/event";
import { stringToColor } from "@/shared/utils/random";
import BigCalendar from "@common/BigCalender";
import { useGetEventsQuery } from "@reducers/api/eventApi";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";
import { EditCreateModal } from "@serviceUsersUI/rota/EditCreateModal";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { CalendarProps, Event } from "react-big-calendar";
import {
  EventInteractionArgs,
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const Rota: FC = () => {
  const [isOpenEditCreateModal, setIsOpenEditCreateModal] = useState(false);

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onUpdateEvent = (_: EventInteractionArgs<Event>) => {
    //
  };
  const serviceUserId = useServiceUserId();
  const { data: rotaEvents, refetch } = useGetEventsQuery(serviceUserId);
  const events = rotaEvents?.map((event) => {
    const startDate = dayjs(
      `${event.date} ${event.start_time}`,
      "YYYY-MM-DD hh:mm A",
    ).toDate();

    const endTime = dayjs(
      `${event.date} ${event.end_time}`,
      "YYYY-MM-DD hh:mm A",
    ).toDate();

    return {
      ...event,
      start_date: startDate,
      start: startDate,
      end: endTime,
      end_date: "",
      end_time: endTime,
      resource: {
        id: event.id,
      },
    } as RotaEventGet & Event;
  });

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    onUpdateEvent(data);
  };

  const onEventDrop: withDragAndDropProps["onEventDrop"] = (data) => {
    onUpdateEvent(data);
  };

  const onSelectSlot: CalendarProps["onSelectSlot"] = (data) => {
    setCurrentEvent({
      title: "",
      start: data.start,
      end: data.end,
      // @ts-ignore
      start_date: dayjs(data.start).toDate(),
      end_date: dayjs(data.end).toDate(),
      end_time: dayjs(data.end).toDate(),
      resource: {
        id: "new",
      },
    });
    setIsOpenEditCreateModal(true);
  };

  const onSelectEvent: CalendarProps["onSelectEvent"] = (data) => {
    setCurrentEvent(data);
    setIsOpenEditCreateModal(true);
  };

  return (
    <>
      <BigCalendar
        events={events ?? []}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: stringToColor(event.title as string),
            },
          };
        }}
      />
      <EditCreateModal
        open={isOpenEditCreateModal}
        selectedEvent={currentEvent}
        setOpen={setIsOpenEditCreateModal}
        onClose={(shouldRefetch) => {
          setIsOpenEditCreateModal(false);
          setCurrentEvent(null);
          if (shouldRefetch) {
            refetch();
          }
        }}
      />
    </>
  );
};

export default Rota;
