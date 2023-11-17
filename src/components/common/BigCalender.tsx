import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { FC } from "react";
import {
  Calendar,
  CalendarProps,
  Event,
  SlotInfo,
  dateFnsLocalizer,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

type BigCalendarProps = {
  events: Event[];
  onEventDrop: (args: EventInteractionArgs<Event>) => void;
  onEventResize: (args: EventInteractionArgs<Event>) => void;
  onSelectSlot: (slotInfo: SlotInfo) => void;
  onSelectEvent: (
    event: Event,
    e: React.SyntheticEvent<HTMLElement, globalThis.Event>,
  ) => void;
} & Omit<CalendarProps, "localizer">;

export const BigCalendar: FC<BigCalendarProps> = ({
  events,
  onEventDrop,
  onEventResize,
  onSelectSlot,
  onSelectEvent,
  ...rest
}) => {
  return (
    <DnDCalendar
      defaultView='week'
      events={events}
      localizer={localizer}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: "100vh" }}
      selectable
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      eventPropGetter={rest.eventPropGetter}
    />
  );
};

const locales = {
  "en-US": enUS,
};

// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
// @ts-ignore
export const DnDCalendar = withDragAndDrop(Calendar);

export default BigCalendar;
