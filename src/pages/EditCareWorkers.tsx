import { COLORS } from "@/shared/constants/colors";
import { PersonalProfileTab } from "@components/careWorkers/PersonalProfileTab";
import { Box, FullColumn } from "@components/common";
import { Tab, TabContext, TabPanel, Tabs } from "@components/common/Tab";
import { useState } from "react";
type CareWorkersTabItem = {
  label: string;
  value: string;
};

const EditCareWorkers = () => {
  const [selectedTab, setSelectedTab] = useState("1");

  const tabItems: CareWorkersTabItem[] = [
    {
      label: "Person Profile",
      value: "1",
    },
    {
      label: "Rota",
      value: "2",
    },
    {
      label: "Salary",
      value: "3",
    },
    {
      label: "Availability",
      value: "4",
    },
    {
      label: "Training",
      value: "5",
    },
  ];

  return (
    <FullColumn
      sx={{ background: COLORS.WHITE, p: "1rem", gap: 0, marginBottom: "1em" }}
    >
      <TabContext value={selectedTab}>
        <Tabs
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "2rem",
            },
          }}
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
          aria-label='tabs'
          TabIndicatorProps={{
            sx: { backgroundColor: COLORS.TEXT },
          }}
        >
          {tabItems.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              sx={{
                color: COLORS.TAB_INACTIVE_COLOR,
                fontSize: "1.25rem",
                fontWeight: "600",
                textTransform: "none",
                p: 0,
                "&.Mui-selected": {
                  color: COLORS.TEXT,
                },
              }}
            />
          ))}
        </Tabs>
        <Box
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <TabPanel value='1'>
            <PersonalProfileTab />
          </TabPanel>
          <TabPanel value='2'>{/* <PersonalProfileTab /> */}</TabPanel>
          <TabPanel value='3'>{/* <PersonalProfileTab /> */}</TabPanel>
        </Box>
      </TabContext>
    </FullColumn>
  );
};

export default EditCareWorkers;
