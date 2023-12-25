import { ServiceUser } from "$types/serviceUsers";
import { COLORS } from "@/shared/constants/colors";
import { useFirstRiskAssessmentLink } from "@/v2/hooks/useClientNavLinkProps";
import { placeholderProfilePicture } from "@/v2/utils/constants";
import { H3, H4 } from "@common/Typography";
import { Close } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ClientProps = {
  client: ServiceUser;
};
export const ClientCard: React.FC<ClientProps> = ({ client }) => {
  const navigate = useNavigate();
  const isPreAdmitted = client.enrollment_status === "Pre-admission";
  const getFirstRiskAssessmentLink = useFirstRiskAssessmentLink();

  return (
    <Grid
      container
      sx={{
        gap: 1,
        padding: 2,
        justifyContent: "space-between",
        cursor: "pointer",
        borderBottom: "solid 2px rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => {
        if (isPreAdmitted) {
          navigate(getFirstRiskAssessmentLink(client.id ?? 0));
        } else {
          navigate(`/v2/client/${client.id}/tasks`);
        }
      }}
    >
      <Grid
        item
        xs={1}
        alignItems='center'
      >
        <img
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={(client.photo as string) ?? placeholderProfilePicture}
        ></img>
      </Grid>
      <Grid
        item
        xs={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='start'
      >
        <H3>{client.name}</H3>
        <Typography>Client id: {client.id}</Typography>
      </Grid>

      <Grid
        item
        xs={3}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='start'
      >
        <H4 color={COLORS.LIGHT_GREY}>{client.address}</H4>
      </Grid>

      <Grid
        item
        xs={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='start'
      >
        <Typography>Assigned Carer</Typography>
        <H4 color='blue'>Perez </H4>
      </Grid>

      <Grid
        item
        xs={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='start'
      >
        <Typography>Weekly Appo</Typography>
        <H4>13 </H4>
      </Grid>

      <Grid
        item
        xs={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='start'
      >
        <Close />
      </Grid>
    </Grid>
  );
};
