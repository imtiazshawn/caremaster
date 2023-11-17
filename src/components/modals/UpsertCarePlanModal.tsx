import { CarePlanCategory } from "$types/carePlanCategories";
import { CarePlan, CreateCarePlan, Frequency } from "$types/carePlans";
import { removeUndefined } from "@/Utils";
import { carePlanSchema } from "@/formSchemas/carePlan";
import { XButton } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { ModalTitle } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useGetCarePlanCategoriesQuery } from "@reducers/api/carePlanCategories";
import {
  useCreateCarePlanMutation,
  useUpdateCarePlanMutation,
} from "@reducers/api/carePlans";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues: CreateCarePlan = {
  title: "",
  service_user: 0,
  category_name: "",
  category: 0,
  time: "",
  instruction: "",
  frequency: Frequency.WEEKLY,
};

type Props = {
  initialCarePlan: CarePlan | null;
  serviceUserId: string;
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  refetch: () => void;
};

const UpsertCarePlanModal: React.FC<Props> = ({
  refetch,
  initialCarePlan,
  serviceUserId,
  isOpen,
  onClose,
}) => {
  const { data: categories, isLoading: isCategoryLoading } =
    useGetCarePlanCategoriesQuery(null);
  const [createCarePlan, { isLoading: isLoadingCreateCarePlan }] =
    useCreateCarePlanMutation();
  const [updateCarePlan, { isLoading: isLoadingUpdateCarePlan }] =
    useUpdateCarePlanMutation();

  const { handleSubmit, control, reset, setValue } = useForm<CreateCarePlan>({
    defaultValues,
    resolver: yupResolver(carePlanSchema),
  });

  useEffect(() => {
    for (const key in initialCarePlan) {
      setValue(
        key as keyof CreateCarePlan,
        initialCarePlan[key as keyof CreateCarePlan],
      );
    }
    // eslint-disable-next-line
  }, [initialCarePlan]); // Eslint gives error for not mentioning setValue in the dependency array which is not mendatory in this case.

  const careWorkerFormTemplate = useMemo(() => {
    if (categories) {
      return getCarePlanFormTemplate(categories);
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

  const handleFormSubmit = (values: CreateCarePlan) => {
    if (initialCarePlan) {
      const { id } = initialCarePlan;
      updateCarePlan(
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
      createCarePlan(values).then(() => {
        onCloseHandler?.();
        refetch();
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%",
          width: "650px",
        },
      }}
      onClose={onCloseHandler}
    >
      <DialogTitle sx={{ flexDirection: "row" }}>
        <ModalTitle>Care Worker</ModalTitle>
      </DialogTitle>
      <XButton
        onClick={onCloseHandler}
        sx={{
          position: "absolute",
          right: 24,
          top: 10,
        }}
      />
      <Divider />
      <DialogContent>
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
                loading={isLoadingCreateCarePlan || isLoadingUpdateCarePlan}
              >
                {initialCarePlan ? "Update" : "Create"} Care Worker
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertCarePlanModal;

const getCarePlanFormTemplate = (
  categories: CarePlanCategory[],
): FormTemplate<CreateCarePlan>[] => {
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
