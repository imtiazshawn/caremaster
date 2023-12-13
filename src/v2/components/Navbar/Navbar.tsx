import { COLORS } from "@/shared/constants/colors";

import { NavLinkComponent } from "@/v2/components/Navbar/NavLink";
import { NavBarProfile } from "@/v2/components/Navbar/Profile";
import { NavLink } from "@/v2/types/navLink";
import { LoadingButton } from "@common/LoadingButton";
import { Column, FlexBox } from "@common/index";
import { defaultNavLinks } from "./navLinks/defaultNavLinks";

export type NavbarProps = {
  navLinks?: (NavLink | "separator" | "spacer")[];
  profile?: {
    name: string;
    photo: string | File;
    mobile: string;
  };
  buttonLabel?: string;
  buttonOnClickHandler?: () => unknown;
  isButtonLoading?: boolean;
};

export const Navbar: React.FC<NavbarProps> = ({
  navLinks = defaultNavLinks,
  profile,
  buttonLabel,
  buttonOnClickHandler,
  isButtonLoading,
}) => {
  return (
    <Column
      sx={{
        height: "92vh",
        backgroundColor: COLORS.WHITE,
        overflow: "auto",
        py: 5,
      }}
    >
      {profile && (
        <NavBarProfile
          name={profile.name ?? "Name"}
          photo={profile.photo as string}
          mobile={profile.mobile ?? "(Phone Number)"}
        />
      )}

      {!profile && (
        <FlexBox
          sx={{
            width: "100%",
            borderTop: "1px solid #E3E3E3",
            opacity: 0.2,
            gap: 0,
          }}
        />
      )}
      {buttonLabel && (
        <FlexBox
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <LoadingButton
            loading={isButtonLoading}
            sx={{
              width: "75%",
            }}
            variant='contained'
            onClick={buttonOnClickHandler}
          >
            {buttonLabel}
          </LoadingButton>
        </FlexBox>
      )}
      {navLinks.map((navLink, index) => {
        return (
          <NavLinkComponent
            key={index}
            navLink={navLink}
          />
        );
      })}
    </Column>
  );
};
