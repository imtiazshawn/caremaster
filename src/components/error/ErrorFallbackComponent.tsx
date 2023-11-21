import { Button } from "@common/Button";
import { H1, H2, H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { Replay } from "@mui/icons-material";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallbackComponent: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  // eslint-disable-next-line no-console
  console.log("### error ::", error);

  return (
    <Column
      role='alert'
      className='flex h-[100vh] flex-col items-center justify-center rounded-3xl bg-gray-100 p-6'
    >
      <Column>
        <H1>Something went wrong !!</H1>
        <H2>Message: {error.message}</H2>
        <pre>{error.stack}</pre>
        <H3>
          Try refreshing the page or{" "}
          <a
            style={{ textDecoration: "underline" }}
            href='mailto:help@caremaster.com'
          >
            contact us
          </a>
          .
        </H3>
        <FlexBox>
          <Button
            variant='contained'
            onClick={resetErrorBoundary}
            sx={{
              p: 2,
              width: "auto",
              alignItems: "center",
              gap: 1,
              bgcolor: "black",
              ":hover": {
                bgcolor: "black",
              },
            }}
          >
            <Replay />
            Try again
          </Button>
        </FlexBox>
      </Column>
    </Column>
  );
};
