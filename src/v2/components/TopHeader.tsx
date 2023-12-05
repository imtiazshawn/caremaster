import dummyProfilePic from "@assets/dummy-profile-pic.png";
import { ReactComponent as Notifications } from "@assets/notifications.svg";
import { Box, Column, FlexBox } from "@common/index";
import { ExpandMore } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const topLinks = [
  {
    label: "Dashboard",
    path: "/v2/dashboard",
  },
  {
    label: "Calendar",
    path: "/v2/calendar",
  },
  {
    label: "Client",
    path: "/v2/clients",
  },
  {
    label: "Staff",
    path: "/v2/staff",
  },
];

export const TopHeader = () => {
  const location = useLocation();

  return (
    <Column sx={{ gap: 1, marginTop: 2 }}>
      <FlexBox
        sx={{
          gap: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          fontSize: "1.2rem",
        }}
      >
        <FlexBox sx={{ flex: 1, justifyContent: "center" }}>
          {topLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    color: "#595959",
                    p: 2,
                    pb: 1,
                    fontWeight: 600,
                    ...(isActive && {
                      borderBottom: "2px solid #595959",
                      color: "#292929",
                    }),
                  }}
                >
                  {link.label}
                </Box>
              </Link>
            );
          })}
        </FlexBox>
        <FlexBox sx={{ gap: 1 }}>
          <Notifications />
          <FlexBox>
            <img
              src={dummyProfilePic}
              alt='profile'
            />
            <Column>
              <span>John Doe</span>
              <span>Admin</span>
            </Column>
            <ExpandMore />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Column>
  );
};
