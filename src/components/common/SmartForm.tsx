import { ReactElement } from "react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";

import HookFormDateTime from "@common/HookFormDateTime";
import { HookFormFileUpload } from "@common/HookFormFileUpload";
import { HookFormImageUpload } from "@common/HookFormImageUpload";
import HookFormMultiCheckbox from "@common/HookFormMultiCheckbox";
import HookFormRadio from "@common/HookFormRadio";
import HookFormCustomRadio from "@common/HookFormRadioGroup";
import HookFormSwitch from "@common/HookFormSwitch";
import HookFormTimePicker from "@common/HookFormTimePicker";
import { Column, FlexBox } from ".";
import HookFormDateField from "./HookFormDateField";
import HookFormSelect from "./HookFormSelect";
import HookFormTextField from "./HookFormTextField";

type Common = {
  label?: string;
  required?: boolean;
  isDisabled?: boolean;
};

type Data = Record<string, any>;

export type FormTemplate<T extends Data> = Common &
  (
    | {
        name: keyof T;
        type: "text";
      }
    | {
        name: keyof T;
        type: "text-area";
        rows?: number;
      }
    | {
        name: keyof T;
        type: "number";
      }
    | {
        name: keyof T;
        type: "password";
      }
    | {
        type: "date";
        name: keyof T;
      }
    | {
        type: "date-time";
        name: keyof T;
      }
    | {
        type: "time";
        name: keyof T;
      }
    | {
        type: "image";
        name: keyof T;
      }
    | {
        type: "file";
        name: keyof T;
      }
    | {
        type: "select";
        name: keyof T;
        options: string[];
      }
    | {
        type: "switch";
        name: keyof T;
      }
    | {
        type: "radio";
        name: keyof T;
        options: string[];
      }
    | {
        type: "radio-group";
        name: keyof T;
        options: { label: string; value: string | boolean }[];
      }
    | {
        type: "multi-checkbox";
        name: keyof T;
        options: string[];
      }
    | {
        type: "column";
        name?: keyof T;
        items: FormTemplate<T>[];
      }
    | {
        type: "custom";
        name?: keyof T;
        component: ReactElement;
      }
  );
// TODO: add array type
// | {
//     type: "array";
//     name?: keyof T;
//     items: FormTemplate<T>[];
//   }

export const styleLeftLabel = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiFormLabel-root": {
    width: "12.5rem",
  },
  "& .MuiInputBase-root": {
    width: "calc(100% - 12.5rem) !important",
    flexGrow: 1,
    borderRadius: "12px",
  },
};

export const styleTopLabel = {
  "& .MuiInputBase-root": {
    borderRadius: "12px",
  },
};

type SmartFormComponentType = <T extends Data>(props: {
  template: FormTemplate<T>[] | FormTemplate<T>;
  control: Control<any>;
  watch?: UseFormWatch<any>;
  setValue?: UseFormSetValue<any>;
  labelPosition: "left" | "top";
}) => JSX.Element | null;

export const SmartForm: SmartFormComponentType = ({
  template,
  control,
  watch,
  setValue,
  labelPosition,
}) => {
  if (Array.isArray(template)) {
    return (
      <Column sx={{ flexGrow: 1, gap: "1.5rem" }}>
        {template.map((item, index) => (
          <SmartForm
            key={index}
            control={control}
            watch={watch}
            setValue={setValue}
            template={item}
            labelPosition={labelPosition}
          />
        ))}
      </Column>
    );
  }
  const templateName = (template?.name ?? "") as string;

  switch (template.type) {
    case "text":
      return (
        <HookFormTextField
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          placeholder={template.label}
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
          required={template.required || false}
          disabled={template.isDisabled ?? false}
        />
      );
    case "text-area":
      return (
        <HookFormTextField
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          multiline
          rows={template.rows ?? 4}
          placeholder={template.label}
          sx={labelPosition === "left" ? styleLeftLabel : null}
          required={template.required || false}
        />
      );
    case "number":
      return (
        <HookFormTextField
          control={control}
          name={templateName}
          type='number'
          label={template.label}
          fullWidth
          placeholder={template.label}
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
          required={template.required || false}
        />
      );
    case "password":
      return (
        <HookFormTextField
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          placeholder={template.label}
          type='password'
          required={template.required || false}
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
        />
      );

    case "select":
      return (
        <HookFormSelect
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          options={template.options}
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
          required={template.required || false}
        />
      );
    case "image":
      return (
        <HookFormImageUpload
          label={template.label}
          value={watch?.(templateName)}
          setValue={(newFile: File) => setValue?.(templateName, newFile)}
        />
      );
    case "file":
      return (
        <HookFormFileUpload
          label={template.label}
          value={watch?.(templateName)}
          setValue={(newFile: File) => setValue?.(templateName, newFile)}
        />
      );
    case "switch":
      return (
        <HookFormSwitch
          control={control}
          name={templateName}
          label={template.label}
        />
      );
    case "radio":
      return (
        <HookFormRadio
          control={control}
          name={templateName}
          label={template.label}
          options={template.options ?? []}
        />
      );
    case "radio-group":
      return (
        <HookFormCustomRadio
          control={control}
          name={templateName}
          label={template.label}
          options={template.options ?? []}
        />
      );
    case "multi-checkbox":
      return (
        <HookFormMultiCheckbox
          control={control}
          name={templateName}
          label={template.label}
          options={template.options ?? []}
        />
      );
    case "date":
      return (
        <HookFormDateField
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
          required={template.required || false}
        />
      );
    case "date-time":
      return (
        <HookFormDateTime
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
          required={template.required || false}
        />
      );
    case "time":
      return (
        <HookFormTimePicker
          control={control}
          name={templateName}
          label={template.label}
          fullWidth
          sx={labelPosition === "left" ? styleLeftLabel : styleTopLabel}
          required={template.required || false}
          inputFormat='hh:mm A'
        />
      );
    case "custom":
      return template.component;
    case "column":
      return (
        <FlexBox
          sx={{ flexGrow: 1, gap: "1.5rem" }}
          className='w-full'
        >
          {template.items.map((item, index) => (
            <FlexBox
              key={index}
              sx={{ flex: 1 }}
            >
              <SmartForm
                key={index}
                control={control}
                watch={watch}
                setValue={setValue}
                template={item}
                labelPosition={labelPosition}
              />
            </FlexBox>
          ))}
        </FlexBox>
      );
    default:
      return null;
  }
};
