import { COLORS } from "@/shared/constants/colors";
import { Chip } from "@common/Chip";
import HookFormDateField from "@common/HookFormDateField";
import HookFormTextField from "@common/HookFormTextField";
import { Radio, RadioGroup } from "@common/Radio";
import Select from "@common/Select";
import { H3, H4 } from "@common/Typography";
import { CenteredFlexBox, Column } from "@common/index";
import { startCase } from "lodash-es";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
type CustomRecurrenceEditorProps = {
  control: any;
  watch: UseFormWatch<any> | undefined;
  setValue: UseFormSetValue<any> | undefined;
};

const days = [
  {
    value: "monday",
    label: "M",
  },
  {
    value: "tuesday",
    label: "T",
  },
  {
    value: "wednesday",
    label: "W",
  },
  {
    value: "thursday",
    label: "T",
  },
  {
    value: "friday",
    label: "F",
  },
  {
    value: "saturday",
    label: "S",
  },
  {
    value: "sunday",
    label: "S",
  },
];

export const CustomRecurrenceEditor: React.FC<CustomRecurrenceEditorProps> = ({
  control,
  setValue,
  watch,
}) => {
  const selectedDays: string[] = watch?.("repeat_on")?.split(",") ?? [];

  return (
    <Column sx={{ flex: 1 }}>
      <H3>Custom Recurrence</H3>
      <CenteredFlexBox>
        <H4>Repeat every</H4>
        <HookFormTextField
          control={control}
          name='repeat_week'
          defaultValue={1}
          type='number'
          sx={{ width: "6em" }}
        />
        <Select
          defaultValue='week'
          sx={{ minWidth: "150px" }}
          options={["week"].map((option) => ({
            label: startCase(option),
            value: option,
          }))}
        />
      </CenteredFlexBox>
      <Column>
        <H4>Repeat on</H4>
        <CenteredFlexBox>
          {days.map(({ label, value }) => {
            const dayKey = `${value}`;

            return (
              <Chip
                key={dayKey}
                label={label}
                sx={{
                  mx: "2px",
                  cursor: "pointer",
                  backgroundColor: selectedDays.includes(dayKey)
                    ? COLORS.LIGHT_BLUE
                    : COLORS.BACKGROUND,
                  color: selectedDays.includes(dayKey)
                    ? "white"
                    : COLORS.LIGHT_BLUE,
                  ":hover": {
                    backgroundColor: selectedDays.includes(dayKey)
                      ? COLORS.LIGHT_BLUE
                      : COLORS.BACKGROUND,
                    color: selectedDays.includes(dayKey)
                      ? "white"
                      : COLORS.LIGHT_BLUE,
                  },
                }}
                onClick={() => {
                  let currentDays = selectedDays;

                  if (selectedDays.includes(dayKey)) {
                    currentDays = selectedDays.filter(
                      (currentDay) => currentDay !== dayKey,
                    );
                  } else {
                    currentDays = currentDays
                      ? [...currentDays, dayKey]
                      : [dayKey];
                  }
                  setValue?.("repeat_on", currentDays?.join(","));
                }}
              />
            );
          })}
        </CenteredFlexBox>
      </Column>
      <Column>
        <H4>Ends</H4>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='Never'
          value={watch?.("end_type") ?? "Never"}
          name='radio-buttons-group'
          onChange={(event) => {
            setValue?.("end_type", event.target.value);
          }}
        >
          <CenteredFlexBox>
            <Radio
              name='end_type'
              value='Never'
            />
            <H4>Never</H4>
          </CenteredFlexBox>
          <CenteredFlexBox>
            <Radio
              name='end_type'
              value='On'
            />
            <H4>On</H4>
            <HookFormDateField
              fullWidth
              variant='standard'
              inputFormat='DD MMMM, YYYY'
              control={control}
              name='end_date'
            />
          </CenteredFlexBox>
          <CenteredFlexBox>
            <Radio
              name='end_type'
              value='After'
            />
            <H4>After</H4>
            <HookFormTextField
              type='number'
              InputProps={{
                endAdornment: <H4>occurrences</H4>,
              }}
              control={control}
              name='end_after_occurrence'
            />
          </CenteredFlexBox>
        </RadioGroup>
      </Column>
    </Column>
  );
};
