import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { H5 } from "@common/Typography";
import { FlexBox } from "@common/index";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function DynamicList<
  TForm extends Record<string, any>,
  Template extends Record<`${string}.${string}`, unknown>,
  TData extends Record<string, any>,
>({
  getTemplates,
  topic,
  data,
  update,
  injectParams,
  refetch,
  header,
  isUpdateLoading,
  next,
}: {
  topic: keyof TData;
  header: string;
  getTemplates: (
    id: number,
    handleDelete: (id: number) => void,
    employmentIdsLength: number,
  ) => FormTemplate<Template>[];
  data: TData;
  update: (data: TData) => Promise<unknown>;
  injectParams: (payload: any) => TData;
  refetch: () => void;
  next: string;
  isUpdateLoading: boolean;
}) {
  const { control, handleSubmit, reset } = useForm<TForm>();
  const [ids, setIds] = useState([0]);
  const [count, setCount] = useState(0);

  const handleDelete = (id: number) => {
    setIds((ids) => ids.filter((employment) => employment !== id));
  };

  useEffect(() => {
    if (data[topic]) {
      const ids = [];
      for (let i = 0; i < data[topic].length; i++) {
        ids.push(i);
      }
      setIds(ids);
      reset({ ...data[topic] } as TForm);
    }
  }, [reset, topic, data]);

  const templates: FormTemplate<Template>[][] = ids.map((id) =>
    getTemplates(id, handleDelete, ids.length),
  );

  const handleFormSubmit = async (values: TForm) => {
    const payload = Object.entries(values)
      .filter(([key]) => ids.includes(Number.parseInt(key)))
      .map(([, value]) => value);

    if (data) {
      update(injectParams(payload)).then(() => {
        ShowShortMessage("Saved successfully");
        refetch();
      });
    }
  };

  return (
    <div className='p-4'>
      <H5 className='text-lg'>{header}</H5>

      <form
        className='py-4'
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {templates.map((template, index: number) => {
          return (
            <div
              key={ids[index]}
              className='my-2'
            >
              <SmartForm
                control={control}
                template={template}
                labelPosition='top'
              />
            </div>
          );
        })}

        <FlexBox className='items-cente my-12 justify-between '>
          <Button
            variant='contained'
            size='large'
            onClick={() => {
              setIds((ids) => {
                return [...ids, count + 1];
              });
              setCount((count) => count + 1);
            }}
          >
            Add New
          </Button>
          <FlexBox className='items-center justify-center'>
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              loading={isUpdateLoading}
            >
              Save
            </LoadingButton>
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              href={next}
            >
              Next
            </LoadingButton>
          </FlexBox>
        </FlexBox>
      </form>
    </div>
  );
}
