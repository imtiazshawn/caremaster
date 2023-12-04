import { FieldTypeEnum } from "$types/recordFields";

export type TemplateField = {
  id: number;
  label: string;
  field_type: FieldTypeEnum;
  options?: any;
  description?: string;
  show_on_table?: boolean;
  section: number;
  template: number;
};

export type TemplateFieldDTO = Omit<TemplateField, "id">;
