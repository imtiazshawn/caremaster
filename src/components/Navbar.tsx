import { Dashboard } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { CustomColumn, CustomFlexBox } from "./common";

const navLinks = [
  {
    route: "/dashboard",
    icon: <Dashboard />,
    label: "Dashboard",
  },
  {
    route: "/daily-tasks",
    icon: <Dashboard />,
    label: "Daily Tasks",
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
    <CustomColumn sx={{ my: 20, gap: 1 }}>
      {navLinks.map(({ route, icon, label }) => {
        const isActive = pathname === route;
        return (
          <Link
            key={route}
            to={route}
          >
            <IconButton
              key={route}
              sx={{
                p: 1,
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
              }}
            >
              <CustomFlexBox
                sx={{
                  gap: 1,
                  justifyContent: "left",
                  alignItems: "center",
                  width: "100%",
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
