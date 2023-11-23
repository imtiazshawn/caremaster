import { Event } from "$types/event";
import { Autocomplete } from "@common/Autocomplete";
import { SmartForm } from "@common/SmartForm";
import TextField from "@common/TextField";
import { Column, FlexBox } from "@common/index";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { CustomRecurrenceEditor } from "@serviceUsersUI/rota/CustomRecurrenceEditor";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type EventInfoTabProps = {
  control: any;
  watch?: UseFormWatch<any>;
  setValue?: UseFormSetValue<any>;
  isEditing?: boolean;
};

export const EventInfoTab: React.FC<EventInfoTabProps> = ({
  isEditing,
  control,
  setValue,
  watch,
}) => {
  const { data: careWorkers } = useGetCareWorkersQuery(null);
  const selectedCareWorkers =
    watch?.("care_workers")
      ?.map((id: number) => {
        return careWorkers?.find((careWorker) => careWorker.id === id);
      })
      ?.filter(Boolean) ?? [];

  return (
    <FlexBox sx={{ gap: "3em" }}>
      <Column sx={{ flex: 1 }}>
        <Column sx={{ width: "100%" }}>
          <SmartForm<Event>
            control={control}
            labelPosition='top'
            template={[
              {
                type: "text",
                label: "Title",
                // @ts-ignore
                name: "title",
                required: true,
              },
              {
                type: "date-time",
                label: "Start",
                name: "start_date",
                required: true,
              },
              {
                type: "time",
                label: "End Time",
                name: "end_time",
                required: true,
              },
            ]}
          />
        </Column>
        <Column sx={{ minWidth: "200px" }}>
          <Autocomplete
            multiple
            sx={{ height: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "100%",
                  },
                }}
                label='Assign Care Worker'
              />
            )}
            value={selectedCareWorkers ?? []}
            onChange={(_, value) => {
              setValue?.(
                "care_workers",
                value.map((careWorker) => careWorker.id),
              );
            }}
            options={careWorkers ?? []}
            getOptionLabel={(option) => option.user.name}
          />
        </Column>
      </Column>
      {!isEditing && (
        <CustomRecurrenceEditor
          control={control}
          setValue={setValue}
          watch={watch}
        />
      )}
    </FlexBox>
  );
};
