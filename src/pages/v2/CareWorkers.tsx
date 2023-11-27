import { COLORS } from "@/shared/constants/colors";
import { useCareWorker } from "@/shared/hooks/useCareWorker";
import { BackButton } from "@common/BackButton";
import { H2 } from "@common/Typography";
import { Box, FlexBox, FullColumn } from "@components/common";
import { Tab, TabContext, TabPanel, Tabs } from "@components/common/Tab";
import { PageLayout } from "@components/layout/PageLayout";
import AppledTab from "@components/v2/careWorkers/Applicant";
import ScreeningTab from "@components/v2/careWorkers/Screening";
import { useState } from "react";
type CareWorkersTabItem = {
  label: string;
  value: string;
};

const CareWorker = () => {
  const [selectedTab, setSelectedTab] = useState("4");
  const { careWorker } = useCareWorker();

  const tabItems: CareWorkersTabItem[] = [
    {
      label: "Care Worker",
      value: "1",
    },
    {
      label: "All Staffs",
      value: "2",
    },
    {
      label: "Screening",
      value: "3",
    },
    {
      label: "Applied",
      value: "4",
    },
  ];

  return (
    <PageLayout>
      <FullColumn
        sx={{
          background: COLORS.WHITE,
          p: "1.5rem",
          gap: 0,
          marginBottom: "1em",
          width: "80%",
        }}
      >
        <TabContext value={selectedTab}>
          <FlexBox sx={{ alignItems: "center", gap: 2 }}>
            <BackButton />
            <FlexBox sx={{ flex: 1 }}>
              <H2>Care Worker: {careWorker?.user?.name}</H2>
            </FlexBox>
          </FlexBox>
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
            <TabPanel value='1'></TabPanel>
            <TabPanel value='2'>{/* <PersonalProfileTab /> */}</TabPanel>
            <TabPanel value='3'>
              <ScreeningTab />
            </TabPanel>
            <TabPanel value='4'>
              <AppledTab />
            </TabPanel>
          </Box>
        </TabContext>
      </FullColumn>
    </PageLayout>
  );
};

export default CareWorker;
