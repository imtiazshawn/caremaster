import { RotaTab } from "@/pages/RotaTab";
import { COLORS } from "@/shared/constants/colors";
import { useServiceUser } from "@/shared/hooks/useServiceUser";
import { BackButton } from "@common/BackButton";
import { H2 } from "@common/Typography";
import { Box, FlexBox, FullColumn } from "@components/common";
import { PageLayout } from "@components/layout/PageLayout";
import CarePlanTab from "@components/serviceUsers/CarePlanTab";
import { PersonalProfileTab } from "@components/serviceUsers/PersonalProfileTab";
import { TabContext, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import { ServiceUserRecordTab } from "@serviceUsersUI/ServiceUserRecordTabOld";
import { useState } from "react";

type ServiceUserTabItem = {
  label: string;
  value: string;
};

export const EditServiceUser = () => {
  const [tabValue, setTabValue] = useState("1");

  const { serviceUser } = useServiceUser();

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
    <PageLayout>
      <FullColumn sx={{ p: "1rem", gap: 0, marginBottom: "1em" }}>
        <TabContext value={tabValue}>
          <FlexBox sx={{ alignItems: "center", gap: 2 }}>
            <BackButton />
            <FlexBox sx={{ flex: 1 }}>
              <H2>Client: {serviceUser?.name}</H2>
            </FlexBox>
          </FlexBox>
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
            <TabPanel value='4'>
              <RotaTab />
            </TabPanel>
            <TabPanel value='3'>
              <CarePlanTab />
            </TabPanel>
          </Box>
        </TabContext>
      </FullColumn>
    </PageLayout>
  );
};
