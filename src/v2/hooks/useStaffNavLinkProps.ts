import { NavbarProps } from "@/v2/components/Navbar/Navbar";
import { staffNavLinks } from "@/v2/components/Navbar/navLinks/staffNavLinks";
import { useCareWorker } from "@shared/hooks/useCareWorker";

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
