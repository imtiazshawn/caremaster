import { Applicant, UpdateApplicant } from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { getApplicationStatus } from "@/helper/apply";
import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import { H5 } from "@common/Typography";
import { FlexBox } from "@common/index";
import { useCareWorkerQuestions } from "@shared/hooks/useCareWorkerQuestions";
import { useNavigate } from "react-router-dom";

export const Training = ({
  data,
  isUpdateLoading,
  submitApplication,
  nextUrl,
  showNextButton = false,
  showFinishButton = false,
}: {
  showFinishButton?: boolean;
  showNextButton?: boolean;
} & ProfileSectionProps<
  Applicant,
  UpdateApplicant & {
    unique_id: string;
  }
> & { submitApplication?: () => Promise<void> }) => {
  const navigate = useNavigate();
  const { questions } = useCareWorkerQuestions();
  const status = getApplicationStatus(
    data,
    questions?.map((item) => item.id.toString()),
  );
  return (
    <div className='p-4'>
      <FlexBox
        sx={{
          justifyContent: "center",
          paddingTop: "6rem",
          paddingBottom: "6rem",
        }}
      >
        <u>
          <a
            key='/screening/dbs'
            href='https://dbsdirect.co.uk/dbs-application-process.php'
          >
            <H5>Please click here to complete your training.</H5>
          </a>
        </u>
      </FlexBox>
      <FlexBox
        sx={{
          justifyContent: "flex-end",
          marginTop: "12px",
        }}
      >
        <LoadingButton
          type='submit'
          variant='contained'
          loading={isUpdateLoading}
        >
          Save
        </LoadingButton>
        {showNextButton && (
          <Button
            type='submit'
            variant='contained'
            href={nextUrl}
          >
            Next
          </Button>
        )}
        {showFinishButton && (
          <Button
            // type='submit'
            variant='contained'
            disabled={!status || status.overall === "incomplete"}
            onClick={submitApplication ?? (() => navigate(nextUrl))}
          >
            Finish
          </Button>
        )}
      </FlexBox>
    </div>
  );
};
