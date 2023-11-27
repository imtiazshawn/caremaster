import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton as MIconButton } from "@mui/material";

type IconProps = React.ComponentProps<typeof EditIcon>;
export type IconButtonProps = IconProps &
  React.ComponentProps<typeof MIconButton> & {
    variant: "edit" | "delete" | "add" | "more-horizontal" | "close" | "check";
  };

export const IconButton = ({
  variant,
  fontSize = "small",
  ...remainingProps
}: IconButtonProps) => {
  let icon = null;
  switch (variant) {
    case "edit":
      icon = <EditIcon fontSize={fontSize} />;
      break;
    case "delete":
      icon = <DeleteForeverIcon fontSize={fontSize} />;
      break;
    case "add":
      icon = <AddIcon fontSize={fontSize} />;
      break;
    case "more-horizontal":
      icon = <MoreHorizIcon fontSize={fontSize} />;
      break;
    case "close":
      icon = <CloseIcon fontSize={fontSize} />;
      break;
    case "check":
      icon = <CheckIcon fontSize={fontSize} />;
      break;
    default:
      break;
  }
  return <MIconButton {...remainingProps}>{icon}</MIconButton>;
};

export default IconButton;
