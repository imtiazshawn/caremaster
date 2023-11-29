import { ReactComponent as Logo } from "@assets/logo.svg";

import { COLORS } from "@/shared/constants/colors";

import { NavLinkComponent } from "@/v2/components/Navbar/NavLink";
import { NavBarProfile } from "@/v2/components/Navbar/Profile";
import { NavLink } from "@/v2/types/navLink";
import { H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { defaultNavLinks } from "./navLinks/defaultNavLinks";

export type NavbarProps = {
  navLinks?: (NavLink | "separator" | "spacer")[];
  profile?: {
    name: string;
    photo: string | File;
    mobile: string;
  };
};

export const Navbar: React.FC<NavbarProps> = ({
  navLinks = defaultNavLinks,
  profile,
}) => {
  return (
    <Column
      sx={{
        height: "100vh",
        pb: 5,
        pt: 5,
        gap: 1,
        pl: 5,
        backgroundColor: COLORS.WHITE,
        overflow: "auto",
      }}
    >
      <FlexBox
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          ml: 4,
          gap: 0.6,
        }}
      >
        <Logo width='3em' />
        <H3
          fontFamily='Inter'
          color='#0F172A'
        >
          Care Master
        </H3>
      </FlexBox>

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
            mt: 10,
            borderTop: "1px solid #E3E3E3",
            mb: 3,
            opacity: 0.2,
            gap: 0,
          }}
        />
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
