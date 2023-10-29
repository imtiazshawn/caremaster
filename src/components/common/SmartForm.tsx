import { ReactNode } from "react";
import { Control } from "react-hook-form";

import { Column, FlexBox } from ".";
import HookFormDateField from "./HookFormDateField";
import HookFormSelect from "./HookFormSelect";
import HookFormTextField from "./HookFormTextField";

type Common<T> = {
  label?: string;
  name?: keyof T;
};

export type FormTemplate<T> = Common<T> &
  (
    | {
        type: "text";
      }
    | {
        type: "date";
      }
    | {
        type: "select";
        options: string[];
      }
    | {
        type: "column";
        items: FormTemplate<T>[];
      }
    | {
        type: "custom";
        component: ReactNode;
      }
  );

type CustomSmartFormProps = {
  template: FormTemplate<any>[] | FormTemplate<any>;
  control: Control<any>;
};

export const CustomSmartForm: React.FC<CustomSmartFormProps> = ({
  template,
  control,
}) => {
  if (Array.isArray(template)) {
    return (
      <Column sx={{ flexGrow: 1, gap: "32px" }}>
        {template.map((item, index) => (
          <CustomSmartForm
            key={index}
            control={control}
            template={item}
          />
        ))}
      </Column>
    );
  }
  switch (template.type) {
    case "text":
      return (
        <HookFormTextField
          control={control}
          name={(template.name ?? "") as string}
          label={template.label}
          fullWidth
          placeholder={template.label}
        />
      );
    case "select":
      return (
        <HookFormSelect
          control={control}
          name={(template.name ?? "") as string}
          label={template.label}
          fullWidth
          options={template.options}
        />
      );
    case "date":
      return (
        <HookFormDateField
          control={control}
          name={(template.name ?? "") as string}
          label={template.label}
          fullWidth
        />
      );
    case "custom":
      return template.component;
    case "column":
      return (
        <FlexBox
          sx={{ flexGrow: 1, gap: "20px" }}
          className='w-[100%]'
        >
          {template.items.map((item, index) => (
            <CustomSmartForm
              key={index}
              control={control}
              template={item}
            />
          ))}
        </FlexBox>
      );
    default:
      return null;
  }
};
