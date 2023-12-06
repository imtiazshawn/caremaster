export enum FieldTypeEnum {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  IMAGE = "image",
  FILE = "file",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SELECT = "select",
  BIG_TEXT = "big_text",
  DATE_TIME = "date_time",
  TIME = "time",
}

export const recordFieldTypes: FieldTypeEnum[] = [
  FieldTypeEnum.TEXT,
  FieldTypeEnum.NUMBER,
  FieldTypeEnum.DATE,
  FieldTypeEnum.IMAGE,
  FieldTypeEnum.FILE,
  FieldTypeEnum.CHECKBOX,
  FieldTypeEnum.RADIO,
  FieldTypeEnum.SELECT,
  FieldTypeEnum.BIG_TEXT,
  FieldTypeEnum.DATE_TIME,
  FieldTypeEnum.TIME,
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
  show_on_table: boolean;
};

export type RecordFieldDTO = Omit<
  RecordField,
  "id" | "created_at" | "updated_at" | "record_name" | "record"
>;
