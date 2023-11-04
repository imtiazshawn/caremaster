export enum FieldTypeEnum {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  IMAGE = "image",
  FILE = "file",
  CHECKBOX = "checkbox",
  RADIO = "radio",
}

export const recordFieldTypes: FieldTypeEnum[] = [
  FieldTypeEnum.TEXT,
  FieldTypeEnum.NUMBER,
  FieldTypeEnum.DATE,
  FieldTypeEnum.IMAGE,
  FieldTypeEnum.FILE,
  FieldTypeEnum.CHECKBOX,
  FieldTypeEnum.RADIO,
];

export type RecordField = {
  id: number;
  record_name: string;
  label: string;
  field_type: FieldTypeEnum;
  options?: string;
  description?: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
  record: number;
};

export type RecordFieldDTO = Omit<
  RecordField,
  "id" | "created_at" | "updated_at" | "record_name" | "record"
>;
