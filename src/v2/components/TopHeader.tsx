import { TopProfileCard } from "@/v2/components/TopProfileCard";
import { ReactComponent as Logo } from "@assets/logo.svg";
import { ReactComponent as Notifications } from "@assets/notifications.svg";
import { Box, CenteredRow, Column, FlexBox } from "@common/index";
import { COLORS } from "@shared/constants/colors";
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
    <Column>
      <FlexBox
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100vw",
          height: "8vh",
          fontSize: "1.2rem",
          backgroundColor: COLORS.TOPHEADER_BACKGROUND,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "16vw",
          }}
        >
          <Box
            sx={{
              margin: "5px",
            }}
          >
            <Logo
              style={{
                color: "#427c7d",
              }}
            />
          </Box>
          <Box
            sx={{ color: "#F0F1F3", fontSize: "20px", pointerEvents: "none" }}
          >
            CareMaster
          </Box>
        </Box>
        <FlexBox sx={{ flex: 1, justifyContent: "start" }}>
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
                    color: "#F0F1F3",
                    p: 2,
                    fontWeight: 600,
                    height: "8vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    ...(isActive && {
                      color: "#F0F1F3",
                      backgroundColor: "#051D25",
                      borderBottom: "4px #1E6069 solid",
                    }),
                  }}
                >
                  {link.label}
                </Box>
              </Link>
            );
          })}
        </FlexBox>
        <CenteredRow sx={{ gap: 1 }}>
          <CenteredRow>
            <Notifications height={36} />
          </CenteredRow>
          <Box
            sx={{
              borderLeft: "1px solid #C2C6CE",
              height: "2rem",
            }}
          ></Box>
          <TopProfileCard />
        </CenteredRow>
      </FlexBox>
    </Column>
  );
};
