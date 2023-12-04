export type TemplateCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  template_for: string;
  created_at: string;
  updated_at: string;
};

export type TemplateCategoryDTO = Omit<TemplateCategory, "id">;
