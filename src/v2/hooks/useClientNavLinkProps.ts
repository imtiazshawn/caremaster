import { ENROLLMENT_STATUS } from "$types/serviceUsers";
import { useServiceUser } from "@/shared/hooks/useServiceUser";
import { NavbarProps } from "@/v2/components/Navbar/Navbar";
import { clientNavLinks } from "@/v2/components/Navbar/navLinks/clientsNavLinks";
import { preAdClientNavLinks } from "@/v2/components/Navbar/navLinks/preAdNavLinks";

export const useClientNavLinkProps = () => {
  const { serviceUser } = useServiceUser();

  const isPreAdClientSelected =
    serviceUser?.enrollment_status === ENROLLMENT_STATUS.PRE_ADMISSION;

  const navbarProps: NavbarProps = {
    navLinks: isPreAdClientSelected ? preAdClientNavLinks : clientNavLinks,
    profile: {
      name: serviceUser?.name ?? "",
      photo: serviceUser?.photo ?? "",
      mobile: serviceUser?.mobile ?? "",
    },
  };
  return navbarProps;
};
