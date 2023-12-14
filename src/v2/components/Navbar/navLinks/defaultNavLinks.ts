import { ReactComponent as Dashboard } from "@assets/dashboard.svg";
import { ReactComponent as Message } from "@assets/message-circle.svg";
import { ReactComponent as ProfileUser } from "@assets/profile-user.svg";
import { ReactComponent as ServiceUser } from "@assets/service-user.svg";
import { ReactComponent as Settings } from "@assets/settings.svg";
import { ReactComponent as TickSquare } from "@assets/tick-square.svg";
import { ReactComponent as Training } from "@assets/training.svg";
import { Logout } from "@mui/icons-material";
import { NavLink } from "../../../types/navLink";

export const settingsNavLink: NavLink = {
  route: "/v2/settings/profile",
  icon: Settings,
  label: "Settings",
  children: [
    {
      route: "/v2/settings/profile",
      label: "Profile",
      icon: ProfileUser,
    },
    {
      route: "/v2/settings/records",
      label: "Records",
      icon: ServiceUser,
    },
    {
      route: "/v2/settings/templates",
      label: "Templates",
      icon: ServiceUser,
    },
  ],
};

export const defaultNavLinks: (NavLink | "separator" | "spacer")[] = [
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
  settingsNavLink,
  {
    route: "/logout",
    icon: Logout,
    label: "Logout",
  },
];
