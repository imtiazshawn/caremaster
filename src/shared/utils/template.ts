import { FieldTypeEnum } from "$types/recordFields";
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
    // case FieldTypeEnum.TEXTAREA:
    //   return "textarea";
    default:
      return "text";
  }
};
