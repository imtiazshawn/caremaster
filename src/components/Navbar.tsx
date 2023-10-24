import { Dashboard } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { COLORS } from "@/shared/constants/colors";

import { CustomColumn, CustomFlexBox } from "./common";

const navLinks = [
  {
    route: "/",
    icon: <Dashboard />,
    label: "Dashboard",
  },
  {
    route: "/daily-tasks",
    icon: <Dashboard />,
    label: "Daily Tasks",
  },
  {
    route: "/service-users",
    icon: <Dashboard />,
    label: "Service Users",
  },
  {
    route: "/rota",
    icon: <Dashboard />,
    label: "Rota",
  },
  {
    route: "/profile",
    icon: <Dashboard />,
    label: "Profile",
  },
  {
    route: "/settings",
    icon: <Dashboard />,
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
                  gap: 1,
                  justifyContent: "left",
                  alignItems: "center",
                  width: "100%",
                  fontSize: "1.2rem",
                }}
              >
                {icon}
                {label}
              </CustomFlexBox>
            </IconButton>
          </Link>
        );
      })}
    </CustomColumn>
  );
};
