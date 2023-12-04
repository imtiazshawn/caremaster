export type TemplateSection = {
  id: number;
  name: string;
  description?: string;
  parent: number | null;
  template: number;
};

export type TemplateSectionDTO = Omit<TemplateSection, "id">;
