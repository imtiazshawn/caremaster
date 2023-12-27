import { CarePlanCategory } from "$types/carePlanCategories";
import {
  CarePlanTask,
  CreateCarePlanTask,
  Frequency,
} from "$types/carePlanTasks";
import { removeUndefined } from "@/Utils";
import { carePlanTaskSchema } from "@/formSchemas/carePlanTask";
import { LoadingButton } from "@common/LoadingButton";
import { Modal } from "@common/Modal";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { Column, FlexBox } from "@common/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetCarePlanCategoriesQuery } from "@reducers/api/carePlanCategories";
import {
  useCreateCarePlanTaskMutation,
  useUpdateCarePlanTaskMutation,
} from "@reducers/api/carePlanTasks";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues: CreateCarePlanTask = {
  title: "",
  service_user: 0,
  category_name: "",
  category: 0,
  time: "",
  instruction: "",
  frequency: Frequency.WEEKLY,
};

type Props = {
  initialCarePlanTask: CarePlanTask | null;
  serviceUserId: string;
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  refetch: () => void;
};

const UpsertCarePlanTaskModal: React.FC<Props> = ({
  refetch,
  initialCarePlanTask,
  serviceUserId,
  isOpen,
  onClose,
}) => {
  const { data: categories, isLoading: isCategoryLoading } =
    useGetCarePlanCategoriesQuery(null);
  const [createCarePlanTask, { isLoading: isLoadingCreateCarePlanTask }] =
    useCreateCarePlanTaskMutation();
  const [updateCarePlanTask, { isLoading: isLoadingUpdateCarePlanTask }] =
    useUpdateCarePlanTaskMutation();

  const { handleSubmit, control, reset, setValue } =
    useForm<CreateCarePlanTask>({
      defaultValues,
      resolver: yupResolver(carePlanTaskSchema),
    });

  useEffect(() => {
    for (const key in initialCarePlanTask) {
      setValue(
        key as keyof CreateCarePlanTask,
        initialCarePlanTask[key as keyof CreateCarePlanTask],
      );
    }
    // eslint-disable-next-line
  }, [initialCarePlanTask]); // Eslint gives error for not mentioning setValue in the dependency array which is not mendatory in this case.

  const careWorkerFormTemplate = useMemo(() => {
    if (categories) {
      return getCarePlanTaskFormTemplate(categories);
    }
    return [];
  }, [categories]);

  if (isCategoryLoading || !categories) {
    return <></>;
  }

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = (values: CreateCarePlanTask) => {
    if (initialCarePlanTask) {
      const { id } = initialCarePlanTask;
      updateCarePlanTask(
        removeUndefined({
          id,
          ...values,
        }),
      ).then(() => {
        onCloseHandler?.();
        refetch();
      });
    } else {
      // Todo: This find will collupse if there are multiple categories with same label(text)
      values.category = categories?.find(
        ({ name }) => name === values.category_name,
      )?.id as number;

      values.service_user = Number.parseInt(serviceUserId);
      createCarePlanTask(values).then(() => {
        onCloseHandler?.();
        refetch();
      });
    }
  };

  return (
    <Modal
      title='Planned Activity'
      onCloseHandler={onCloseHandler}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column>
          <SmartForm
            template={careWorkerFormTemplate}
            control={control}
            labelPosition='left'
          />
          <FlexBox sx={{ justifyContent: "flex-end" }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={
                isLoadingCreateCarePlanTask || isLoadingUpdateCarePlanTask
              }
            >
              {initialCarePlanTask ? "Update" : "Create"} Care Worker
            </LoadingButton>
          </FlexBox>
        </Column>
      </form>
    </Modal>
  );
};

export default UpsertCarePlanTaskModal;

const getCarePlanTaskFormTemplate = (
  categories: CarePlanCategory[],
): FormTemplate<CreateCarePlanTask>[] => {
  return [
    {
      type: "text",
      label: "Title",
      name: "title",
    },
    {
      type: "text",
      label: "Instruction",
      name: "instruction",
    },
    {
      type: "select",
      label: "Category",
      name: "category_name",
      options: categories?.map(({ name }) => name) ?? [],
      required: true,
    },
  ];
};
