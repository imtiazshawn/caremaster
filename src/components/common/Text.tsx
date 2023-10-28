import { Typography } from "@mui/material";

export type TextProps = React.ComponentProps<typeof Typography>;

export const Text = ({ children, ...props }: TextProps): JSX.Element => {
  return <Typography {...props}>{children}</Typography>;
};
