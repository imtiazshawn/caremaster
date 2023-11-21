import { Button } from "@common/Button";
import { FlexBox, FullColumn } from "@common/index";
import { useSearchParams } from "react-router-dom";

export const Introduction = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  return (
    <div>
      <FullColumn className='p-4'>
        <p className='p-4'>
          {`Welcome to the Care Master family! We're excited that you're
          interested in joining our team as a care worker. Your dedication to
          making a positive impact on the lives of others is commendable. Please
          take a moment to share your qualifications and experiences with us.
          Let's work together to create a nurturing and supportive community for
          those in need.`}
        </p>
        <FlexBox className='p-4'>
          <Button
            variant='contained'
            className='rounded-md'
            href={`/care-worker/apply/personal-details?uid=${uid}`}
          >
            Start
          </Button>
        </FlexBox>
      </FullColumn>
    </div>
  );
};
