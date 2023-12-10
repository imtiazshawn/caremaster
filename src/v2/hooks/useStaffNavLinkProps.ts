import { EMPLOYMENT_STATUS } from "$types/careWorkers";
import { NavbarProps } from "@/v2/components/Navbar/Navbar";
import { getAppliedNavLinks } from "@/v2/components/Navbar/navLinks/appliedNavLinks";
import { getScreeningNavLinks } from "@/v2/components/Navbar/navLinks/screeningNavLinks";
import { staffNavLinks } from "@/v2/components/Navbar/navLinks/staffNavLinks";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useApplicant } from "@shared/hooks/useApplied";
import { useCareWorker } from "@shared/hooks/useCareWorker";
import { useScreening } from "@shared/hooks/useScreening";

export const useStaffNavLinkProps = () => {
  const { careWorker } = useCareWorker();

  const navbarProps: NavbarProps = {
    navLinks: staffNavLinks,
    profile: {
      name: careWorker?.user?.name ?? "",
      photo: careWorker?.photo ?? "",
      mobile: careWorker?.user?.phone ?? "",
    },
  };
  return navbarProps;
};

export const useStaffAppliedNavLinkProps = (
  buttonOnClickHandler: () => unknown,
) => {
  const { applicant } = useApplicant();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const navbarProps: NavbarProps = {
    navLinks: !applicant ? [] : getAppliedNavLinks(applicant, questions),
    profile: {
      name: `${applicant?.first_name ?? ""} ${applicant?.surname ?? ""}`,
      photo: applicant?.documents?.passport_size_photo ?? "",
      mobile: applicant?.phone ?? "",
    },
    buttonLabel: applicant?.application_status?.is_application_accepted
      ? "Send Again"
      : "Send To Screening",
    buttonOnClickHandler,
  };
  return navbarProps;
};

export const useStaffScreeningNavLinkProps = () => {
  const { screening } = useScreening();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const navbarProps: NavbarProps = {
    navLinks: !screening ? [] : getScreeningNavLinks(screening, questions),
    profile: {
      name: `${screening?.applicant?.first_name ?? ""} ${
        screening?.applicant?.surname ?? ""
      }`,
      photo: screening?.applicant?.documents?.passport_size_photo ?? "",
      mobile: screening?.applicant?.phone ?? "",
    },
    buttonLabel:
      screening?.employment_status === EMPLOYMENT_STATUS.CURRENT
        ? "Accepted"
        : "Confirm Applicant",
    buttonOnClickHandler: () => {
      alert("Implement Invitation handler");
    },
  };
  return navbarProps;
};
