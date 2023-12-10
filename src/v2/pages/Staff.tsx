import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import { Layout } from "@/v2/components/Layout";
import { StaffsRightBar } from "@/v2/components/rightbars/StaffsRightBar";
import { Divider } from "@common/Dialog";
import { Search } from "@common/Search";
import Select from "@common/Select";
import { Tab, Tabs } from "@common/Tab";
import { Box, Column, FullColumn, FullRow } from "@common/index";
import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import AppliedTab from "@components/v2/careWorkers/Applicant";
import ScreeningTab from "@components/v2/careWorkers/Screening";
import { TabContext, TabPanel } from "@mui/lab";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useState } from "react";

export const Staff = () => {
  const [currentTab, setCurrentTab] = useState("3");
  const { data: careWorkers } = useGetCareWorkersQuery();
  const [isOpenCareWorkerModal, setIsOpenCareWorkerModal] = useState(false);
  return (
    <Layout
      rightBar={StaffsRightBar}
      bodyColor='transparent'
    >
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
          <FullRow>
            <Search
              sx={{
                borderRadius: ".5rem",
              }}
            />
            <Select
              sx={{
                borderRadius: ".5rem",
                width: "50%",
                height: "100%",
                "& .MuiInputBase-root": {
                  height: "100%",
                  outline: "none !important",
                },
                backgroundColor: "#fff",
              }}
              SelectDisplayProps={{
                style: {
                  display: "flex",
                  fontSize: "1.4rem",
                  color: "rgba(0, 0, 0, 0.5)",
                  alignItems: "center",
                },
              }}
              defaultValue='all'
              options={[{ label: "All", value: "all" }]}
            />
          </FullRow>
          <FullColumn
            sx={{
              backgroundColor: "#fff",
              borderRadius: ".5rem",
              pt: 3,
            }}
          >
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
                    </Box>
                  ))}
                </Column>
              </TabPanel>
              <TabPanel
                value='2'
                sx={{ overflow: "scroll" }}
              >
                <Column sx={{ gap: 1, overflow: "auto", height: "100%" }}>
                  {careWorkers?.map((careWorker) => (
                    <Box key={careWorker.id}>
                      <CareWorkerCard
                        key={careWorker.id}
                        careWorker={careWorker}
                      />
                    </Box>
                  ))}
                </Column>
              </TabPanel>
              <TabPanel
                value='3'
                sx={{ overflow: "scroll" }}
              >
                <ScreeningTab />
              </TabPanel>
              <TabPanel
                sx={{ height: 800 }}
                value='4'
              >
                <AppliedTab />
              </TabPanel>
            </TabContext>
          </FullColumn>
        </Column>
      </Column>
    </Layout>
  );
};
