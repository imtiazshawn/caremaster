import dummyProfilePic from "@assets/dummy-profile-pic.png";
import { ReactComponent as Notifications } from "@assets/notifications.svg";
import { Tab, Tabs } from "@common/Tab";
import { Column, FlexBox } from "@common/index";
import { ExpandMore } from "@mui/icons-material";
import { TabContext } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";

export const TopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [tabValue, setTabValue] = useState(currentTab);
  // useEffect(() => {
  //   if (location.pathname === "/v2/client") {
  //     setTabValue("3");
  //   }
  // }, [location]);

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
          <TabContext value={location.pathname}>
            <Tabs
              value={location.pathname}
              // onChange={(_, value) => {
              //   setTabValue(value as string);
              // }}
            >
              <Tab
                label='Dashboard'
                value='/v2/dashboard'
                disableRipple
                onClick={() => {
                  navigate("/v2/dashboard");
                }}
              />
              <Tab
                label='Calendar'
                value='/v2/calendar'
                disableRipple
                onClick={() => {
                  navigate("/v2/calendar");
                }}
              />
              <Tab
                label='Client'
                value='/v2/clients'
                disableRipple
                onClick={() => {
                  navigate("/v2/clients");
                }}
              />
              <Tab
                label='Staff'
                value='/v2/staff'
                disableRipple
                onClick={() => {
                  navigate("/v2/staff");
                }}
              />
            </Tabs>
          </TabContext>
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
