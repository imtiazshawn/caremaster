import { EventDTO, RotaEventUpdate } from "$types/event";
import dayjs from "dayjs";
import { formatDateForBackend } from "./date";

export const mapEventToEventUpdate = (
  id: string,
  event: EventDTO,
  updateType: string,
) => {
  const payload = {
    id,
    ...(event as any),
    date: formatDateForBackend(dayjs(event.start_date).toDate()),
    update_type: updateType,
  };

  delete payload.start_date;
  delete payload.end_date;
  delete payload.repeat_on;
  delete payload.repeat_week;
  delete payload.end_type;

  return payload as RotaEventUpdate;
};
