import { ENROLLMENT_STATUS } from "$types/serviceUsers";
import { useServiceUser } from "@/shared/hooks/useServiceUser";
import { NavbarProps } from "@/v2/components/Navbar/Navbar";
import { clientNavLinks } from "@/v2/components/Navbar/navLinks/clientsNavLinks";
import { preAdClientNavLinks } from "@/v2/components/Navbar/navLinks/preAdNavLinks";
import { RISK_ASSESSMENT_CATEGORY_SLUG } from "@/v2/utils/constants";
import { useGetTemplateCategoriesQuery } from "@reducers/api/templateCategories";
import { useGetTemplatesQuery } from "@reducers/api/templates";

export const useClientNavLinkProps = () => {
  const { serviceUser } = useServiceUser();
  const { data: templateCategories } = useGetTemplateCategoriesQuery();

  const riskAssessmentCategories = templateCategories?.filter(
    (category) => category.slug === RISK_ASSESSMENT_CATEGORY_SLUG,
  );

  const { data: templates } = useGetTemplatesQuery(
    riskAssessmentCategories?.[0]?.id ?? 0,
  );

  const isPreAdClientSelected =
    serviceUser?.enrollment_status === ENROLLMENT_STATUS.PRE_ADMISSION;
  const preAdNavLinks = preAdClientNavLinks.map((navLink) => {
    if (typeof navLink !== "string" && navLink.label === "Risk Assessments") {
      return {
        ...navLink,
        route: `/v2/client/:${navLink.paramKey}/${templates?.[0]?.id ?? 0}`,
        children: templates?.map((template) => ({
          route: `/v2/client/:${navLink.paramKey}/${template.id}`,
          paramKey: navLink.paramKey,
          icon: navLink.icon,
          label: template.name,
        })),
      };
    }
    return navLink;
  });

  const navbarProps: NavbarProps = {
    navLinks: isPreAdClientSelected ? preAdNavLinks : clientNavLinks,
    profile: {
      name: serviceUser?.name ?? "",
      photo: serviceUser?.photo ?? "",
      mobile: serviceUser?.mobile ?? "",
    },
  };
  return navbarProps;
};
