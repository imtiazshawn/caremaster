import { ReactComponent as Calender } from "@assets/calender.svg";
import { ReactComponent as Chart } from "@assets/chart.svg";
import { ReactComponent as Dashboard } from "@assets/dashboard.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as Settings } from "@assets/settings.svg";
import { ReactComponent as TwoUsers } from "@assets/two-users.svg";
import { ReactComponent as User } from "@assets/user.svg";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";

import { CustomColumn, CustomFlexBox } from "./common";

type NavLink = {
  route: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  label: string;
};

const navLinks: NavLink[] = [
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
];

export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <CustomColumn sx={{ py: 14, gap: 1, backgroundColor: COLORS.WHITE }}>
      {navLinks.map(({ route, icon, label }) => {
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
                p: 1.5,
                px: 5,
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
              <CustomFlexBox
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
              </CustomFlexBox>
            </IconButton>
          </Link>
        );
      })}
    </CustomColumn>
  );
};
