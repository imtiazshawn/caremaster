import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton as MIconButton } from "@mui/material";

type IconProps = React.ComponentProps<typeof EditIcon>;
export type IconButtonProps = IconProps &
  React.ComponentProps<typeof MIconButton> & {
    varient: "edit" | "delete";
  };

const IconButton = ({
  varient,
  fontSize = "small",
  ...remainingProps
}: IconButtonProps) => {
  let icon = null;
  switch (varient) {
    case "edit":
      icon = <EditIcon fontSize={fontSize} />;
      break;
    case "delete":
      icon = <DeleteForeverIcon fontSize={fontSize} />;
      break;
    default:
      break;
  }
  return <MIconButton {...remainingProps}>{icon}</MIconButton>;
};

export default IconButton;
