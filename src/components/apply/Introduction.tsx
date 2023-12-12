import { Button } from "@common/Button";
import { FlexBox, FullColumn } from "@common/index";

type Props = {
  description: string;
  nextUrl: string;
};
export const Introduction = ({ description, nextUrl }: Props) => {
  return (
    <div>
      <FullColumn className='p-4'>
        <p className='p-4'>{description}</p>
        <FlexBox className='p-4'>
          <Button
            variant='contained'
            className='rounded-md'
            href={nextUrl}
          >
            Start
          </Button>
        </FlexBox>
      </FullColumn>
    </div>
  );
};
