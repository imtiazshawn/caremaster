import { ClientCard } from "@/v2/components/ClientCard";
import { ClientsRightBar } from "@/v2/components/ClientsRightBar";
import { Layout } from "@/v2/components/Layout";
import { Button } from "@common/Button";
import { Divider } from "@common/Dialog";
import { Tab, Tabs } from "@common/Tab";
import { Box, Column } from "@common/index";
import { TabContext, TabPanel } from "@mui/lab";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";
import { useState } from "react";

export const Client = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const { data } = useGetServiceUsersQuery(null);
  const serviceUsers = data?.response.data;

  return (
    <Layout rightBar={ClientsRightBar}>
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
            Start Risk Assessment
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
                label='Client'
                value='1'
                disableRipple
                sx={{
                  width: "50%",
                }}
              />
              <Tab
                label='Pre admission'
                value='2'
                disableRipple
                sx={{
                  width: "50%",
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
                {serviceUsers
                  ?.filter(
                    (serviceUser) =>
                      serviceUser.enrollment_status !== "Pre-admission",
                  )
                  ?.map((serviceUser) => (
                    <Box key={serviceUser.id}>
                      <ClientCard
                        key={serviceUser.id}
                        client={serviceUser}
                      />
                      <Divider />
                    </Box>
                  ))}
              </Column>
            </TabPanel>
            <TabPanel value='2'>
              <Column sx={{ gap: 1, overflow: "auto", height: "100%" }}>
                {serviceUsers
                  ?.filter(
                    (serviceUser) =>
                      serviceUser.enrollment_status === "Pre-admission",
                  )
                  ?.map((serviceUser) => (
                    <Box key={serviceUser.id}>
                      <ClientCard
                        key={serviceUser.id}
                        client={serviceUser}
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
