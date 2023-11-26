import { CareWorker } from "$types/careWorkers";
import { placeholderProfilePicture } from "@/v2/utils/constants";
import { H3, H4 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type CareWorkerProps = {
  careWorker: CareWorker;
};
export const CareWorkerCard: React.FC<CareWorkerProps> = ({ careWorker }) => {
  const navigate = useNavigate();
  return (
    <FlexBox
      sx={{
        gap: 1,
        padding: 2,
        borderRadius: "0.5rem",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/v2/careWorker/${careWorker.id}/basic`);
      }}
    >
      <FlexBox
        sx={{
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={(careWorker.photo as string) ?? placeholderProfilePicture}
        ></img>
        <Column>
          <H3>{careWorker.user.name}</H3>
          <H4>{careWorker.address}</H4>
        </Column>
      </FlexBox>

      <Close />
    </FlexBox>
  );
};
