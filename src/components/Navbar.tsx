import { ReactComponent as Calender } from "@assets/calender.svg";
import { ReactComponent as Chart } from "@assets/chart.svg";
import { ReactComponent as Dashboard } from "@assets/dashboard.svg";
import { ReactComponent as Info } from "@assets/info-circle.svg";
import { ReactComponent as Logout } from "@assets/logout.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as Settings } from "@assets/settings.svg";
import { ReactComponent as TwoUsers } from "@assets/two-users.svg";
import { ReactComponent as User } from "@assets/user.svg";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";

import { Column, FlexBox } from "./common";

type NavLink = {
  route: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  label: string;
};

const navLinks: (NavLink | "separator" | "spacer")[] = [
  {
    route: "/",
    icon: Dashboard,
    label: "Dashboard",
  },
  {
    route: "/daily-tasks",
    icon: Calender,
    label: "Daily Tasks",
  },
  {
    route: "/service-users",
    icon: TwoUsers,
    label: "Service Users",
  },
  {
    route: "/care-workers",
    icon: ProfileUser,
    label: "Care Workers",
  },
  {
    route: "/rota",
    icon: Chart,
    label: "Rota",
  },
  "separator",
  {
    route: "/profile",
    icon: User,
    label: "Profile",
  },
  {
    route: "/settings",
    icon: Settings,
    label: "Settings",
  },
  "spacer",
  {
    route: "/help",
    icon: Info,
    label: "Help",
  },
  {
    route: "/logout",
    icon: Logout,
    label: "Logout",
  },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <Column sx={{ pb: 5, pt: 14, gap: 1, backgroundColor: COLORS.WHITE }}>
      {navLinks.map((navLink, index) => {
        if (navLink === "separator") {
          return (
            <FlexBox
              key={`${index}separator`}
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
              key={`${index}spacer`}
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
        const isActive =
          pathname === route || (pathname === "/" && route === "/dashboard");
        const Icon = icon;
        return (
          <Link
            key={route}
            to={route}
          >
            <IconButton
              key={route}
              sx={{
                p: "0.75rem",
                px: "2.5rem",
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: "4px solid transparent",
                width: "100%",
                backgroundColor: "transparent",
                ":hover": {
                  backgroundColor: "#F7F7FB",
                },
                ...(isActive && {
                  backgroundColor: "#e3e3e3",
                }),
                ...(isActive && {
                  borderLeft: "4px solid #3f51b5",
                }),
                ...(isActive && {
                  fontWeight: "600",
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
                <Icon
                  stroke={isActive ? "white" : COLORS.ICON_ACTIVE_COLOR}
                  fill={isActive ? COLORS.ICON_ACTIVE_COLOR : "none"}
                />
                {label}
              </FlexBox>
            </IconButton>
          </Link>
        );
      })}
    </Column>
  );
};
