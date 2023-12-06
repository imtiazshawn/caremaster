export type TemplateData = {
  fieldId: number;
  value: any;
};

export type TemplateValue = {
  id: number;
  data: TemplateData[];
  created_at?: Date;
  updatedAt?: Date;
  service_user?: number | null;
  care_worker?: number | null;
  template: number;
};

export type TemplateValueDTO = Omit<TemplateValue, "id">;
