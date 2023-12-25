import { placeholderProfilePicture } from "@/v2/utils/constants";
import { H3 } from "@common/Typography";
import { Close } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
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
    completedCount?: number;
    total?: number;
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
  const { completedCount, total } = careWorker;
  let colorClass;
  const bgcolorClass = "bg-gray-300";

  let progress = 0;
  if (completedCount !== undefined && total != undefined) {
    progress = Number((completedCount / total).toFixed(2));
    switch (true) {
      case progress === 1:
        colorClass = "bg-green-500";
        break;
      case progress && progress === 0.17:
        colorClass = "bg-red-500";
        break;
      case progress && progress === 0.33:
        colorClass = "bg-orange-500";
        break;
      case progress && progress === 0.5:
        colorClass = "bg-amber-500";
        break;
      case progress && progress === 0.67:
        colorClass = "bg-yellow-500";
        break;
      case progress && progress === 0.83:
        colorClass = "bg-lime-500";
        break;
      default:
        colorClass = "bg-gray-300";
        break;
    }
  }

  return (
    <Grid
      container
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
      <Grid
        item
        xs={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='end'
      >
        <img
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={(careWorker.photo as string) ?? placeholderProfilePicture}
        ></img>
      </Grid>

      <Grid
        item
        xs={3}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='start'
      >
        <H3>{careWorker.user.name}</H3>
        {total === undefined && completedCount === undefined && (
          <Typography fontSize='12px'>Employee Id: {careWorker.id}</Typography>
        )}
      </Grid>
      <Grid
        item
        xs={3}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography>{careWorker?.address}</Typography>
        <Typography>C B Memorials, 20a The Warren, London, E12 5HY</Typography>
      </Grid>
      <Grid
        item
        xs={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography>Role</Typography>
        <Typography>Admin</Typography>
      </Grid>
      {total != undefined && completedCount != undefined && (
        <Grid
          style={{
            // padding: "1rem ",
            marginLeft: "auto",
            marginTop: "1rem",
            alignContent: "flex-end",
          }}
        >
          <div
            className={bgcolorClass}
            style={{
              height: "2rem",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <div
              className={colorClass}
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <p>{`${completedCount} out of ${total} completed`}</p>
        </Grid>
      )}

      <Grid
        item
        xs={2}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='end'
      >
        {children ?? <Close />}
      </Grid>
    </Grid>
  );
};
