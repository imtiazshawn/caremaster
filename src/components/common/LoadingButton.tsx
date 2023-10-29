import { LoadingButtonProps, LoadingButton as MLoadingButton } from "@mui/lab";

export const LoadingButton = (props: LoadingButtonProps) => {
  const { children, ...rest } = props;
  return <MLoadingButton {...rest}>{children}</MLoadingButton>;
};
