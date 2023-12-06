import { FieldTypeEnum } from "$types/recordFields";
import { TemplateValue } from "$types/templateValue";
import { removeUndefined } from "@/Utils";
import { FormTemplate } from "@common/SmartForm";

export const getFormFieldTypeFromFieldType = (
  fieldType: FieldTypeEnum,
): FormTemplate<any>["type"] => {
  switch (fieldType) {
    case FieldTypeEnum.TEXT:
      return "text";
    case FieldTypeEnum.NUMBER:
      return "number";
    case FieldTypeEnum.DATE:
      return "date";
    case FieldTypeEnum.IMAGE:
      return "image";
    case FieldTypeEnum.FILE:
      return "file";
    case FieldTypeEnum.CHECKBOX:
      return "multi-checkbox";
    case FieldTypeEnum.RADIO:
      return "radio-group";
    case FieldTypeEnum.SELECT:
      return "select";
    case FieldTypeEnum.BIG_TEXT:
      return "text-area";
    case FieldTypeEnum.DATE_TIME:
      return "date-time";
    case FieldTypeEnum.TIME:
      return "time";
    // case FieldTypeEnum.TEXTAREA:
    //   return "textarea";
    default:
      return "text";
  }
};

export const mapFormFieldValuesToData = (
  fieldValues: Record<string, any>,
): TemplateValue["data"] => {
  removeUndefined(fieldValues);
  return Object.entries(fieldValues).map(([key, value]) => {
    return {
      fieldId: Number(key),
      value,
    };
  });
};

export const mapFieldDataToFormValues = (fieldData: TemplateValue["data"]) => {
  return fieldData.reduce(
    (acc, { fieldId, value }) => {
      acc[String(fieldId)] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
};
