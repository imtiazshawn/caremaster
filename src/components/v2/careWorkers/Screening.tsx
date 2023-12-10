import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import IconButton from "@common/IconButton";
import ShowShortMessage from "@common/ShortMessage";
import { H2 } from "@common/Typography";
import { Box, FlexBox } from "@common/index";
import {
  useDeleteCareWorkerMutation,
  useGetCareWorkersQuery,
} from "@reducers/api/careWorkers";
import { Link } from "react-router-dom";

const ScreeningTab = () => {
  const { data: careWorkers, refetch } = useGetCareWorkersQuery(null);
  const [deleteCareWorker] = useDeleteCareWorkerMutation();
  if (!careWorkers) {
    return <>No Care Worker</>;
  }
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
        <Link
          key={careWorker.id}
          to={`/v2/staff/screening/${careWorker.id}/personal-details`}
        >
          <CareWorkerCard
            careWorker={careWorker}
            key={careWorker.id}
            onClick={() => null}
          >
            <FlexBox>
              {/* <Check /> */}
              <IconButton
                variant='close'
                onClick={async (e) => {
                  e.preventDefault();
                  await deleteCareWorker(`${careWorker.id}`);
                  refetch();
                  ShowShortMessage("Screening Applicant Deleted Successfully");
                }}
              />
            </FlexBox>
          </CareWorkerCard>
        </Link>
      ))}
      {careWorkers.length === 0 && <H2>No pending screening application</H2>}
    </Box>
  );
};

export default ScreeningTab;
