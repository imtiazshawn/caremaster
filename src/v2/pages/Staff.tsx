import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Button } from "@common/Button";
import { Divider } from "@common/Dialog";
import { Search } from "@common/Search";
import { Tab, Tabs } from "@common/Tab";
import { Box, Column, FlexBox } from "@common/index";
import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import AppledTab from "@components/v2/careWorkers/Applicant";
import ScreeningTab from "@components/v2/careWorkers/Screening";
import { TabContext, TabPanel } from "@mui/lab";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useState } from "react";

export const Staff = () => {
  const [currentTab, setCurrentTab] = useState("4");
  const { data: careWorkers } = useGetCareWorkersQuery();
  const [isOpenCareWorkerModal, setIsOpenCareWorkerModal] = useState(false);
  return (
    <Layout rightBar={MaintenanceRightBar}>
      <AddCareWorkerModal
        isOpen={isOpenCareWorkerModal}
        onClose={() => setIsOpenCareWorkerModal(false)}
      />
      <Column
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Column
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "70rem",
            p: 4,
          }}
        >
          <FlexBox sx={{ height: "3.5em" }}>
            <Search />
            <Button
              variant='contained'
              sx={{
                fontSize: "1.2em",
                width: "30%",
                borderRadius: "0.5em",
              }}
              onClick={() => setIsOpenCareWorkerModal(true)}
            >
              Create new staff
            </Button>
          </FlexBox>
          <TabContext value={currentTab}>
            <Tabs
              value={currentTab}
              onChange={(_, value) => {
                setCurrentTab(value as string);
              }}
              sx={{ width: "100%" }}
            >
              <Tab
                label='Care workers'
                value='1'
                disableRipple
                sx={{
                  width: "25%",
                }}
              />
              <Tab
                label='All staff'
                value='2'
                disableRipple
                sx={{
                  width: "25%",
                }}
              />
              <Tab
                label='Screening'
                value='3'
                disableRipple
                sx={{
                  width: "25%",
                }}
              />
              <Tab
                label='Applied'
                value='4'
                disableRipple
                sx={{
                  width: "25%",
                }}
              />
            </Tabs>
            <Divider />
            <TabPanel
              value='1'
              sx={{
                height: "100%",
                overflow: "auto",
              }}
            >
              <Column sx={{ gap: 1, overflow: "auto", height: "100%" }}>
                {careWorkers?.map((careWorker) => (
                  <Box key={careWorker.id}>
                    <CareWorkerCard
                      key={careWorker.id}
                      careWorker={careWorker}
                    />
                    <Divider />
                  </Box>
                ))}
              </Column>
            </TabPanel>
            <TabPanel value='2'>
              <Column sx={{ gap: 1, overflow: "auto", height: "100%" }}>
                {careWorkers?.map((careWorker) => (
                  <Box key={careWorker.id}>
                    <CareWorkerCard
                      key={careWorker.id}
                      careWorker={careWorker}
                    />
                    <Divider />
                  </Box>
                ))}
              </Column>
            </TabPanel>
            <TabPanel value='3'>
              <ScreeningTab />
            </TabPanel>
            <TabPanel
              sx={{ height: 800 }}
              value='4'
            >
              <AppledTab />
            </TabPanel>
          </TabContext>
        </Column>
      </Column>
    </Layout>
  );
};
