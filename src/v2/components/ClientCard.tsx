import { ServiceUser } from "$types/serviceUsers";
import { placeholderProfilePicture } from "@/v2/utils/constants";
import { H3, H4 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type ClientProps = {
  client: ServiceUser;
};
export const ClientCard: React.FC<ClientProps> = ({ client }) => {
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
        navigate(`/v2/client/${client.id}/basic`);
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
          src={(client.photo as string) ?? placeholderProfilePicture}
        ></img>
        <Column>
          <H3>{client.name}</H3>
          <H4>{client.address}</H4>
        </Column>
      </FlexBox>

      <Close />
    </FlexBox>
  );
};
