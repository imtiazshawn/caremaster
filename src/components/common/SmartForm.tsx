import { ReactElement } from "react";
import { Control } from "react-hook-form";

import HookFormSwitch from "@common/HookFormSwitch";
import { Column, FlexBox } from ".";
import HookFormDateField from "./HookFormDateField";
import HookFormSelect from "./HookFormSelect";
import HookFormTextField from "./HookFormTextField";

type Common = {
  label?: string;
  required?: boolean;
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
        type: "password";
      }
    | {
        type: "date";
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

const styleLeftLabel = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiFormLabel-root": {
    width: "12.5rem",
  },
  "& .MuiInputBase-root": {
    flexGrow: 1,
  },
};

type SmartFormComponentType = <T extends Data>(props: {
  template: FormTemplate<T>[] | FormTemplate<T>;
  control: Control<any>;
  labelPosition?: "left" | "top";
}) => JSX.Element | null;

export const SmartForm: SmartFormComponentType = ({
  template,
  control,
  labelPosition,
}) => {
  if (Array.isArray(template)) {
    return (
      <Column sx={{ flexGrow: 1, gap: "1.5rem" }}>
        {template.map((item, index) => (
          <SmartForm
            key={index}
            control={control}
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
          fullWidth={labelPosition === "top"}
          placeholder={template.label}
          sx={labelPosition === "left" ? styleLeftLabel : null}
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
        />
      );

    case "select":
      return (
        <HookFormSelect
          control={control}
          name={templateName}
          label={template.label}
          fullWidth={labelPosition === "top"}
          options={template.options}
          sx={labelPosition === "left" ? styleLeftLabel : null}
          required={template.required || false}
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
    case "date":
      return (
        <HookFormDateField
          control={control}
          name={templateName}
          label={template.label}
          fullWidth={labelPosition === "top"}
          sx={labelPosition === "left" ? styleLeftLabel : null}
          required={template.required || false}
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
            <SmartForm
              key={index}
              control={control}
              template={item}
              labelPosition={labelPosition}
            />
          ))}
        </FlexBox>
      );
    default:
      return null;
  }
};
