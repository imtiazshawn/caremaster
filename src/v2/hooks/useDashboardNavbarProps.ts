import { useServiceUser } from "@/shared/hooks/useServiceUser";
import { NavbarProps } from "@/v2/components/Navbar/Navbar";
import { defaultNavLinks } from "@/v2/components/Navbar/navLinks/defaultNavLinks";

export const useDashboardNavbarProps = () => {
  const { serviceUser } = useServiceUser();

  const navbarProps: NavbarProps = {
    navLinks: defaultNavLinks,
    profile: {
      name: serviceUser?.name ?? "",
      photo: serviceUser?.photo ?? "",
      mobile: serviceUser?.mobile ?? "",
    },
  };
  return navbarProps;
};
