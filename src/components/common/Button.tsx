import CloseIcon from "@mui/icons-material/Close";
import { ButtonProps, Button as MButton } from "@mui/material";

export const Button: React.FC<ButtonProps> = (props) => {
  return <MButton {...props} />;
};

export const XButton: React.FC<ButtonProps> = ({ sx, ...rest }) => {
  return (
    <MButton
      {...rest}
      size='small'
      aria-label='delete'
      sx={{
        height: "40px",
        width: "40px",
        minWidth: "40px",
        backgroundColor: "#F8FAFC",
        ...sx,
      }}
    >
      <CloseIcon
        fontSize='small'
        color='action'
      />
    </MButton>
  );
};
