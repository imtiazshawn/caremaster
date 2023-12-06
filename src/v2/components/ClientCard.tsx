import { ServiceUser } from "$types/serviceUsers";
import { COLORS } from "@/shared/constants/colors";
import { useFirstRiskAssessmentLink } from "@/v2/hooks/useClientNavLinkProps";
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
  const isPreAdmitted = client.enrollment_status === "Pre-admission";
  const getFirstRiskAssessmentLink = useFirstRiskAssessmentLink();

  return (
    <FlexBox
      sx={{
        gap: 1,
        padding: 2,
        borderRadius: "0.5rem",
        justifyContent: "space-between",
        cursor: "pointer",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => {
        if (isPreAdmitted) {
          navigate(getFirstRiskAssessmentLink(client.id ?? 0));
        } else {
          navigate(`/v2/client/${client.id}/tasks`);
        }
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
          <H4 color={COLORS.LIGHT_GREY}>{client.address}</H4>
        </Column>
      </FlexBox>

      <Close />
    </FlexBox>
  );
};
