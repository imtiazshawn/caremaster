import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import { Box, FlexBox } from "@common/index";
import { Check, Close } from "@mui/icons-material";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";

const ScreeningTab = () => {
  const { data: careWorkers } = useGetCareWorkersQuery(null);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: "70rem",
        overflow: "auto",
      }}
    >
      {careWorkers?.map((careWorker) => (
        <CareWorkerCard
          careWorker={careWorker}
          key={careWorker.id}
        >
          <FlexBox>
            <Check />
            <Close />
          </FlexBox>
        </CareWorkerCard>
      ))}
      {/* <Table<Screening>
        rows={careWorkers ?? []}
        columns={getScreeningColumns()}
        isLoading={isCareWorkersLoading}
        onRowClick={(row) => navigate(`/care-workers/${row.id}`)}
        initialPageSize={10}
      /> */}
    </Box>
  );
};

export default ScreeningTab;
