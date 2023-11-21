import { Tab, TabContext, TabPanel, Tabs } from "@common/Tab";
import { Box, FlexBox } from "@common/index";
import { Records } from "@components/Records";
import { PageLayout } from "@components/layout/PageLayout";
import React from "react";

export const Settings = () => {
  const [currentTab, setCurrentTab] = React.useState("1");
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <PageLayout>
      <FlexBox sx={{ width: "100%", height: "100%" }}>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              orientation='vertical'
              aria-label='tabs'
            >
              <Tab
                value='0'
                label='Profile'
              />
              <Tab
                value='1'
                label='Records'
              />
              <Tab
                value='2'
                label='Advance Settings'
              />
            </Tabs>
          </Box>
          <TabPanel
            value='0'
            sx={{ width: "100%" }}
          >
            Profile
          </TabPanel>
          <TabPanel
            value='1'
            sx={{ width: "100%" }}
          >
            <Records />
          </TabPanel>
          <TabPanel
            value='2'
            sx={{ width: "100%" }}
          >
            Advance Settings
          </TabPanel>
        </TabContext>
      </FlexBox>
    </PageLayout>
  );
};
