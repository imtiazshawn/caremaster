import { ReactComponent as Calendar } from "@assets/calender.svg";
import { ReactComponent as Dashboard } from "@assets/dashboard.svg";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as Message } from "@assets/message-circle.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as ServiceUser } from "@assets/service-user.svg";
import { ReactComponent as Settings } from "@assets/settings.svg";
import { ReactComponent as TickSquare } from "@assets/tick-square.svg";
import { ReactComponent as Training } from "@assets/training.svg";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";

import { ENROLLMENT_STATUS } from "$types/serviceUsers";
import { NavBarProfile } from "@/v2/components/Navbar/Profile";
import { useServiceUser } from "@/v2/hooks/useServiceUser";
import { H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";

type NavLink = {
  route: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  label: string;
  children?: NavLink[];
  activePatterns?: string[];
};

const navLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: "/v2",
    icon: Dashboard,
    label: "Home",
  },
  {
    route: "/v2/daily-tasks",
    icon: TickSquare,
    label: "Tasks",
  },
  {
    route: "/v2/docs-and-forms",
    icon: ServiceUser,
    label: "Docs and Forms",
  },
  {
    route: "/v2/care-workers",
    icon: ProfileUser,
    label: "Reports",
  },
  {
    route: "/v2/training",
    icon: Training,
    label: "Training",
  },
  "spacer",
  {
    route: "/v2/help-and-support",
    icon: Message,
    label: "Help and Support",
  },
  {
    route: "/v2/settings",
    icon: Settings,
    label: "Settings",
  },
];

const clientNavLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: "/v2/client/:clientId/tasks",
    icon: TickSquare,
    label: "Tasks",
  },
  {
    route: "/v2/client/:clientId/basic",
    icon: ProfileUser,
    label: "Profile",
    // activePatterns: ["/v2/client/"],
    children: [
      {
        route: "/v2/client/:clientId/basic",
        icon: TickSquare,
        label: "Basic",
      },
      {
        route: "/v2/client/:clientId/identification",
        icon: TickSquare,
        label: "Identification",
      },
      {
        route: "/v2/client/:clientId/background",
        icon: TickSquare,
        label: "Background",
      },
      {
        route: "/v2/client/:clientId/council",
        icon: TickSquare,
        label: "Council",
      },
      {
        route: "/v2/client/:clientId/others",
        icon: TickSquare,
        label: "Others",
      },
    ],
  },
  {
    route: "/v2/client/:clientId/records",
    icon: Training,
    label: "Records",
  },
  {
    route: "/v2/client/:clientId/care-plan",
    icon: Dashboard,
    label: "Care Plan",
  },
  {
    route: "/v2/client/:clientId/rota",
    icon: Calendar,
    label: "Rota",
  },
  "spacer",
  {
    route: "/v2/help-and-support",
    icon: Message,
    label: "Help and Support",
  },
  {
    route: "/v2/settings",
    icon: Settings,
    label: "Settings",
  },
];

const preAdClientNavLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: "/v2/client/:clientId/profile",
    icon: ProfileUser,
    label: "Profile",
  },
  {
    route: "/v2/client/:clientId/risk-assessment",
    icon: ProfileUser,
    label: "Risk Assessments",
    // activePatterns: ["/v2/client/"],
    children: [
      {
        route: "/v2/client/:clientId/generic",
        icon: TickSquare,
        label: "Generic",
      },
      {
        route: "/v2/client/:clientId/mca",
        icon: TickSquare,
        label: "MCA",
      },
      {
        route: "/v2/client/:clientId/medicine",
        icon: TickSquare,
        label: "Medicine",
      },
    ],
  },
  "spacer",
  {
    route: "/v2/help-and-support",
    icon: Message,
    label: "Help and Support",
  },
  {
    route: "/v2/settings",
    icon: Settings,
    label: "Settings",
  },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const { serviceUser } = useServiceUser();

  const isClientSelected = pathname.startsWith("/v2/client/");
  const isPreAdClientSelected =
    serviceUser?.enrollment_status === ENROLLMENT_STATUS.PRE_ADMISSION;

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

      {isClientSelected && (
        <NavBarProfile
          name={serviceUser?.name ?? "Name"}
          photo={serviceUser?.photo as string}
          mobile={serviceUser?.mobile ?? "+44 1234 567890"}
        />
      )}

      {!isClientSelected && (
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

      {!isClientSelected &&
        navLinks.map((navLink, index) => {
          return (
            <NavLinkComponent
              key={index}
              navLink={navLink}
            />
          );
        })}

      {isClientSelected &&
        !isPreAdClientSelected &&
        clientNavLinks.map((navLink, index) => {
          return (
            <NavLinkComponent
              key={index}
              navLink={navLink}
            />
          );
        })}
      {isClientSelected &&
        isPreAdClientSelected &&
        preAdClientNavLinks.map((navLink, index) => {
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

const NavLinkComponent = ({
  navLink,
}: {
  navLink: NavLink | "separator" | "spacer";
}) => {
  const { pathname } = useLocation();
  const clientId = useServiceUserId();
  if (navLink === "separator") {
    return (
      <FlexBox
        sx={{
          width: "100%",
          my: 5,
          borderTop: "1px solid #E3E3E3",
        }}
      />
    );
  }

  if (navLink === "spacer") {
    return (
      <FlexBox
        sx={{
          flex: 1,
          flexBasis: 0,
          width: "100%",
          borderTop: "1px solid #E3E3E3",
          opacity: 0.2,
        }}
      />
    );
  }

  const { route, icon, label } = navLink;

  const Icon = icon;

  const replaceClientId = (route: string) => {
    return route.replace(":clientId", String(clientId));
  };

  const replaceIds = (route: string) => {
    return replaceClientId(route);
  };

  const link = replaceIds(route);

  const isActive =
    pathname === link ||
    (pathname === "/v2" && link === "/dashboard") ||
    (link !== "/v2" && pathname.startsWith(link)) ||
    navLink.activePatterns?.some?.((pattern) => pathname.startsWith(pattern)) ||
    navLink.children?.some?.((navChild) =>
      pathname.startsWith(replaceIds(navChild.route)),
    );

  return (
    <Column>
      <Link
        key={route}
        to={link}
      >
        <IconButton
          key={route}
          disableRipple
          sx={{
            p: "0.75rem",
            px: "2.5rem",
            borderRadius: 2,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            width: "100%",
            backgroundColor: "transparent",
            ...(isActive && {
              color: "#000000",
            }),
            ...(isActive && {
              fontWeight: "800",
            }),
          }}
        >
          <FlexBox
            sx={{
              gap: 1.5,
              justifyContent: "left",
              alignItems: "center",
              width: "100%",
              fontSize: "1.2rem",
            }}
          >
            <Icon color={isActive ? "#000" : "inherit"} />
            {label}
          </FlexBox>
        </IconButton>
      </Link>
      {navLink.children && (
        <Column
          sx={{
            ml: 2,
            gap: 1,
          }}
        >
          {navLink.children.map((child) => {
            return (
              <NavLinkComponent
                key={child.route}
                navLink={child}
              />
            );
          })}
        </Column>
      )}
    </Column>
  );
};
