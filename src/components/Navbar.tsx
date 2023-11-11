import { ReactComponent as Dashboard } from "@assets/dashboard.svg";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as Message } from "@assets/message-circle.svg";
import { ReactComponent as StarMoon } from "@assets/moon-stars.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as ServiceUser } from "@assets/service-user.svg";
import { ReactComponent as Settings } from "@assets/settings.svg";
import { ReactComponent as TickSquare } from "@assets/tick-square.svg";
import { ReactComponent as Training } from "@assets/training.svg";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";

import { H3 } from "@common/Typography";
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
    icon: TickSquare,
    label: "Daily Tasks",
  },
  {
    route: "/service-users",
    icon: ServiceUser,
    label: "Service Users",
  },
  {
    route: "/care-workers",
    icon: ProfileUser,
    label: "Care Workers",
  },
  {
    route: "/training",
    icon: Training,
    label: "Training",
  },
  "spacer",
  {
    route: "/messages",
    icon: Message,
    label: "Messages",
  },
  {
    route: "/settings",
    icon: Settings,
    label: "Settings",
  },
  "separator",
  {
    route: "",
    icon: StarMoon,
    label: "Dark Mode",
  },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <Column
      sx={{
        height: "100vh",
        pb: 5,
        pt: 5,
        gap: 1,
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
      <FlexBox
        sx={{
          width: "100%",
          mt: 3,
          borderTop: "1px solid #E3E3E3",
          mb: 3,
          opacity: 0.2,
          gap: 0,
        }}
      />
      <H3
        color={COLORS.TAB_INACTIVE_COLOR}
        sx={{
          p: "0.75rem",
          pt: 0,
          px: "2.5rem",
        }}
      >
        MENU
      </H3>
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
          pathname === route ||
          (pathname === "/" && route === "/dashboard") ||
          (route !== "/" && pathname.startsWith(route));
        const Icon = icon;
        return (
          <Link
            key={route}
            to={route}
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
                // ":hover": {
                //   backgroundColor: "#F7F7FB",
                // },
                ...(isActive && {
                  color: COLORS.BLUE,
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
                <Icon color={isActive ? COLORS.BLUE : "inherit"} />
                {label}
                {route === "/messages" && (
                  <FlexBox className='h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm text-white'>
                    13
                  </FlexBox>
                )}
              </FlexBox>
            </IconButton>
          </Link>
        );
      })}
    </Column>
  );
};
