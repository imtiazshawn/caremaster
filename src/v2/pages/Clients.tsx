import { ENROLLMENT_STATUS, ServiceUser } from "$types/serviceUsers";
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
  const { data: serviceUsers, refetch } = useGetServiceUsersQuery();

  const liveClients = serviceUsers?.filter(
    (serviceUser) => serviceUser.enrollment_status !== "Pre-admission",
  );

  const preAdmittedClients = serviceUsers?.filter(
    (serviceUser) => serviceUser.enrollment_status === "Pre-admission",
  );

  const [openServiceUserModal, setOpenServiceUserModal] = useState(false);

  const [searchResult, setSearchResult] = useState<ServiceUser[]>([]);
  const SearchChangeHandler = (e: string) => {
    if (e.trim().length > 0) {
      const result = serviceUsers?.filter((serviceUser) => {
        const s = serviceUser.name.toLocaleLowerCase();
        const c = e.toLowerCase();
        return s.includes(c);
      });

      if (!result || result?.length === 0) {
        setSearchResult([]);
      } else {
        setSearchResult(result);
      }
    } else {
      setSearchResult([]);
    }
  };
  return (
    <Layout
      rightBar={ClientRightBar}
      bodyColor='transparent'
    >
      <AddServiceUserModal
        isOpen={openServiceUserModal}
        onClose={(successfullyCreated) => {
          setOpenServiceUserModal(false);
          refetch();

          if (successfullyCreated) {
            setCurrentTab("2");
          }
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
            maxWidth: "70rem",
          }}
        >
          <FullRow>
            <Search
              sx={{
                borderRadius: ".5rem",
              }}
              onChange={SearchChangeHandler}
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
            {searchResult.length === 0 ? (
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
                      width: "33%",
                      flex: 1,
                    }}
                  />
                  <Tab
                    label='Pre admission'
                    value='2'
                    disableRipple
                    sx={{
                      width: "33%",
                      flex: 1,
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
                <TabPanel
                  value='2'
                  sx={{
                    height: "100%",
                    overflow: "auto",
                  }}
                >
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
            ) : (
              <Column sx={{ gap: 1, overflow: "scroll", height: "100%" }}>
                {searchResult?.map((serviceUser) => (
                  <Box key={serviceUser.id}>
                    <ClientCard
                      key={serviceUser.id}
                      client={serviceUser}
                    />
                  </Box>
                ))}
              </Column>
            )}
          </FullColumn>
        </Column>
      </Column>
    </Layout>
  );
};
