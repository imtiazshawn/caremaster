import { COLORS } from "@/shared/constants/colors";
import { Box, FullColumn } from "@components/common";
import CarePlanTab from "@components/serviceUsers/CarePlanTab";
import { PersonalProfileTab } from "@components/serviceUsers/PersonalProfileTab";
import { ServiceUserRecordTab } from "@components/serviceUsers/ServiceUserRecordTab";
import { TabContext, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

type ServiceUserTabItem = {
  label: string;
  value: string;
};

export const EditServiceUser = () => {
  const [tabValue, setTabValue] = useState("1");

  const tabItems: Array<ServiceUserTabItem> = [
    {
      label: "Person Profile",
      value: "1",
    },
    {
      label: "Records",
      value: "2",
    },
    {
      label: "Care Plan",
      value: "3",
    },
    {
      label: "Rota",
      value: "4",
    },
  ];

  return (
    <FullColumn sx={{ p: "1rem", gap: 0, marginBottom: "1em" }}>
      <TabContext value={tabValue}>
        <Tabs
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "2rem",
            },
          }}
          value={tabValue}
          onChange={(_, value) => setTabValue(value)}
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
          <TabPanel value='2'>
            <ServiceUserRecordTab />
          </TabPanel>
          <TabPanel value='3'>
            <CarePlanTab />
          </TabPanel>
        </Box>
      </TabContext>
    </FullColumn>
  );
};
