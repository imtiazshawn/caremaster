import { Layout } from "@/v2/components/Layout";
import { TemplateForm } from "@/v2/components/template/TemplateForm";
import { useClientNavLinkProps } from "@/v2/hooks/useClientNavLinkProps";
import { CARE_PLAN_SLUG } from "@/v2/utils/constants";
import { useGetTemplateCategoriesQuery } from "@reducers/api/templateCategories";
import {
  useGetTemplateQuery,
  useGetTemplatesQuery,
} from "@reducers/api/templates";

export const CarePlanPage = () => {
  const { data: templateCategories } = useGetTemplateCategoriesQuery();
  const carePlanTemplates = templateCategories?.filter(
    (category) => category.slug === CARE_PLAN_SLUG,
  );

  const { data: templates } = useGetTemplatesQuery(
    carePlanTemplates?.[0]?.id ?? 0,
  );

  const { data: fullTemplate } = useGetTemplateQuery(templates?.[0]?.id ?? 0);

  const clientNavBarProps = useClientNavLinkProps();

  return (
    <Layout sidebarProps={clientNavBarProps}>
      <TemplateForm overrideTemplate={fullTemplate} />
    </Layout>
  );
};
