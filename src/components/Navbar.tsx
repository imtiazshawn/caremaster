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
      {navLinks.map(({ route, icon, label }) => (
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
              width: "100%",
              backgroundColor: "transparent",
              ":hover": {
                backgroundColor: "#F7F7FB",
              },
              ...(pathname === route && {
                backgroundColor: "#e3e3e3",
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
      ))}
    </CustomColumn>
  );
};
