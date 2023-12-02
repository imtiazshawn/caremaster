import { placeholderProfilePicture } from "@/v2/utils/constants";
import { H3, H5 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type CareWorkerProps = {
  careWorker: {
    id?: number | string;
    photo?: string;
    address?: string;
    user: {
      name: string;
      phone?: string;
      email: string;
    };
  };
  onClick?: () => void;
  children?: React.ReactNode;
};

export const CareWorkerCard: React.FC<CareWorkerProps> = ({
  careWorker,
  children,
  onClick,
}) => {
  const navigate = useNavigate();
  return (
    <FlexBox
      sx={{
        gap: 1,
        padding: 2,
        borderRadius: "0.5rem",
        justifyContent: "space-between",
        cursor: "pointer",
        // backgroundColor: "red",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => {
        if (onClick) {
          onClick();
          return;
        }
        navigate(`/v2/staff/${careWorker.id}/basic`);
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
          {careWorker.user?.phone && <H5>{careWorker.user?.phone}</H5>}
          <H5>{careWorker.user.email}</H5>
        </Column>
      </FlexBox>

      {children ?? <Close />}
    </FlexBox>
  );
};
