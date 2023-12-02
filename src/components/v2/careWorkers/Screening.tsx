import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import { Box, FlexBox } from "@common/index";
import { Check, Close } from "@mui/icons-material";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { Link } from "react-router-dom";

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
              <Check />
              <Close />
            </FlexBox>
          </CareWorkerCard>
        </Link>
      ))}
    </Box>
  );
};

export default ScreeningTab;
