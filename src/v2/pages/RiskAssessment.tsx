import { Layout } from "@/v2/components/Layout";
import { TemplateForm } from "@/v2/components/template/TemplateForm";
import { useClientNavLinkProps } from "@/v2/hooks/useClientNavLinkProps";

export const RiskAssessmentPage = () => {
  const navLinkProps = useClientNavLinkProps();

  return (
    <Layout sidebarProps={navLinkProps}>
      <TemplateForm />
    </Layout>
  );
};
