import { ENROLLMENT_STATUS } from "$types/serviceUsers";
import { ClientCard } from "@/v2/components/ClientCard";
import { Layout } from "@/v2/components/Layout";
import { ClientRightBar } from "@/v2/components/rightbars/ClientsRightBar";
import { Search } from "@common/Search";
import Select from "@common/Select";
import { Tab, Tabs } from "@common/Tab";
import { Box, Column, FullColumn, FullRow } from "@common/index";
import AddServiceUserModal from "@components/modals/AddServiceUserModal";
import { TabContext, TabPanel } from "@mui/lab";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";
import { useState } from "react";

export const Clients = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const { data, refetch } = useGetServiceUsersQuery(null);
  const serviceUsers = data?.response.data;
  const liveClients = serviceUsers?.filter(
    (serviceUser) => serviceUser.enrollment_status !== "Pre-admission",
  );

  const preAdmittedClients = serviceUsers?.filter(
    (serviceUser) => serviceUser.enrollment_status === "Pre-admission",
  );

  const [openServiceUserModal, setOpenServiceUserModal] = useState(false);

  return (
    <Layout
      rightBar={ClientRightBar}
      bodyColor='transparent'
    >
      <AddServiceUserModal
        isOpen={openServiceUserModal}
        onClose={() => {
          setOpenServiceUserModal(false);
          refetch();
        }}
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
            maxWidth: "50rem",
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
              options={[
                { label: "All", value: "all" },
                {
                  label: "Pre admission",
                  value: ENROLLMENT_STATUS.PRE_ADMISSION,
                },
                { label: "Live", value: ENROLLMENT_STATUS.LIVE },
              ]}
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
                sx={{ width: "100%", borderBottom: "1px solid #E0E0E0" }}
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
              <TabPanel
                value='1'
                sx={{
                  height: "100%",
                  overflow: "auto",
                }}
              >
                <Column sx={{ gap: 1, overflow: "auto", height: "100%" }}>
                  {liveClients?.map((serviceUser) => (
                    <Box key={serviceUser.id}>
                      <ClientCard
                        key={serviceUser.id}
                        client={serviceUser}
                      />
                    </Box>
                  ))}
                </Column>
              </TabPanel>
              <TabPanel value='2'>
                <Column sx={{ gap: 1, overflow: "auto", height: "100%" }}>
                  {preAdmittedClients?.map((serviceUser) => (
                    <Box key={serviceUser.id}>
                      <ClientCard
                        key={serviceUser.id}
                        client={serviceUser}
                      />
                    </Box>
                  ))}
                </Column>
              </TabPanel>
            </TabContext>
          </FullColumn>
        </Column>
      </Column>
    </Layout>
  );
};
