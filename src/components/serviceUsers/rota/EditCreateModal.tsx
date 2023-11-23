import { EventDTO } from "$types/event";
import { removeUndefined } from "@/Utils";
import {
  formatDateForBackend,
  formatTimeForBackend,
} from "@/shared/utils/date";
import { mapEventToEventUpdate } from "@/shared/utils/event";
import { Dialog, DialogContent, DialogTitle } from "@common/Dialog";
import { LoadingButton } from "@common/LoadingButton";
import { Tab, TabContext, Tabs } from "@common/Tab";
import { Column, FlexBox } from "@common/index";
import EventUpdateConfirmationModal from "@components/modals/EventUpdateConfirmationModal";
import { TabPanel } from "@mui/lab";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@reducers/api/eventApi";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";
import { EventInfoTab } from "@serviceUsersUI/rota/EventInfoTab";
import { PlanActivityTab } from "@serviceUsersUI/rota/PlanActivityTab";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Event } from "react-big-calendar";
import { useForm } from "react-hook-form";

export const EditCreateModal = ({
  open,
  setOpen,
  selectedEvent,
  onClose,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedEvent: Event | null;
  onClose: (shouldRefetch?: boolean) => void;
}) => {
  const { control, reset, watch, setValue, handleSubmit } = useForm<Event>();
  const [tabValue, setTabValue] = React.useState("1");
  const isEditing = selectedEvent?.resource?.id !== "new";
  const title = isEditing ? "Edit Event" : "Create Event";
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const updateValuesRef = React.useRef<EventDTO | null>(null);

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  useEffect(() => {
    reset(
      selectedEvent ?? {
        title: "",
        start: new Date(),
        end: new Date(),
      },
    );
  }, [reset, selectedEvent]);

  const onCloseHandler = (shouldRefetch?: boolean) => {
    setOpen(false);
    onClose(shouldRefetch);
  };

  const serviceUserId = useServiceUserId();
  const mapCalendarEventToEvent = (event: any) => {
    const mappedEvent: EventDTO = {
      title: event.title,
      start_date: formatDateForBackend(event.start_date),
      end_date: formatDateForBackend(
        event.end_type === "Never"
          ? dayjs(new Date()).add(60, "days").toDate()
          : event.end_date,
      ),
      start_time: formatTimeForBackend(event.start_date),
      end_time: formatTimeForBackend(event.end_time),
      repeat_week: event.repeat_week,
      end_type: event.end_type,
      end_after_occurrence: event.end_after_occurrence ?? 1000,
      repeat_on: event.repeat_on ?? "",
      service_user: serviceUserId,
      care_plan_tasks: event.care_plan_tasks ?? [],
      care_workers: event.care_workers ?? [],
    };

    return mappedEvent;
  };

  const handleSubmitForm = async (values: any) => {
    if (isEditing) {
      updateValuesRef.current = mapCalendarEventToEvent(values);
      setUpdateModalOpen(true);
      return;
    }
    setUpdateModalOpen(true);
    const mappedValues = mapCalendarEventToEvent(values);

    await createEvent(mappedValues);
    onCloseHandler(true);

    removeUndefined(mappedValues);
  };

  const submitButtonText = isEditing ? "Update Event" : "Create Event";

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "100%",
          maxHeight: "100%",
          margin: 0,
          borderRadius: "0px",
        },
      }}
      onClose={() => onCloseHandler()}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <EventUpdateConfirmationModal
            isOpen={updateModalOpen}
            title='Update Event'
            description='Are you sure you want to update this event?'
            onUpdate={async (value) => {
              if (updateValuesRef.current) {
                const payload = mapEventToEventUpdate(
                  selectedEvent?.resource?.id as string,
                  updateValuesRef.current,
                  value,
                );

                await updateEvent(payload);
                onCloseHandler(true);
              }
              setUpdateModalOpen(false);
            }}
            onCancel={() => {
              setUpdateModalOpen(false);
            }}
          />
          <Column sx={{ gap: "3em", width: 700, height: 600 }}>
            <TabContext value={tabValue}>
              <Tabs
                value={tabValue}
                onChange={(_, value) => setTabValue(value)}
              >
                <Tab
                  value='1'
                  label='Event Info'
                />
                <Tab
                  value='2'
                  label='Plan Activities'
                />
              </Tabs>
              <FlexBox sx={{ flex: 1 }}>
                <TabPanel
                  value='1'
                  sx={{ width: "100%", pt: 0 }}
                >
                  <EventInfoTab
                    control={control}
                    watch={watch}
                    setValue={setValue}
                    isEditing={isEditing}
                  />
                </TabPanel>
                <TabPanel
                  value='2'
                  sx={{ width: "100%", pt: 0 }}
                >
                  <PlanActivityTab
                    control={control}
                    watch={watch}
                    setValue={setValue}
                  />
                </TabPanel>
              </FlexBox>
            </TabContext>

            <FlexBox sx={{ justifyContent: "flex-end" }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                {submitButtonText}
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};
