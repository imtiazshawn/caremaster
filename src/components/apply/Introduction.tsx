import { Button } from "@common/Button";
import { FlexBox, FullColumn } from "@common/index";
import { useSearchParams } from "react-router-dom";

type Props = {
  description: string;
};
export const Introduction = ({ description }: Props) => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  return (
    <div>
      <FullColumn className='p-4'>
        <p className='p-4'>{description}</p>
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
