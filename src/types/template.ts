import { TemplateField } from "$types/templateField";
import { TemplateSection } from "$types/templateSection";

export type Template = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  score_required?: boolean;
  category: number;
};

export type TemplateDTO = Omit<Template, "id">;

export type TemplateSectionFull = TemplateSection & {
  fields: TemplateField[];
  sections?: TemplateSectionFull[];
};

export type TemplateFull = Template & {
  category_name: string;
  fields: TemplateField[];
  sections: TemplateSectionFull[];
};
