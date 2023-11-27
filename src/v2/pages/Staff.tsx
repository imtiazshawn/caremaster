import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Button } from "@common/Button";
import { Divider } from "@common/Dialog";
import { Tab, Tabs } from "@common/Tab";
import { Box, Column } from "@common/index";
import { TabContext, TabPanel } from "@mui/lab";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useState } from "react";

export const Staff = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const { data: careWorkers } = useGetCareWorkersQuery();

  return (
    <Layout rightBar={MaintenanceRightBar}>
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
            maxWidth: "50rem",
            p: 4,
          }}
        >
          <Button
            variant='contained'
            sx={{
              height: "4em",
              fontSize: "1.2em",
              width: "100%",
              borderRadius: "0.5em",
            }}
          >
            Create new staff
          </Button>
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
                value='4'
                disableRipple
                sx={{
                  width: "25%",
                }}
              />
              <Tab
                label='Applied'
                value='5'
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
          </TabContext>
        </Column>
      </Column>
    </Layout>
  );
};
