import { Column } from "@components/common";
import { useEffect } from "react";

import { UpdateCareWorkerReq } from "$types/careWorkers";
import { removeUndefined } from "@/Utils";
import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { useStaffNavLinkProps } from "@/v2/hooks/useStaffNavLinkProps";
import { SmartForm } from "@common/SmartForm";
import { getDetailsCareWorkerForm } from "@components/careWorkers/PersonalProfileFormTemplates";
import { LoadingButton } from "@components/common/LoadingButton";
import { useUpdateCareWorkerMutation } from "@reducers/api/careWorkers";
import { useCareWorker } from "@shared/hooks/useCareWorker";
import { useForm } from "react-hook-form";

export const StaffBasicForm = () => {
  const { careWorker, refetch } = useCareWorker();
  const [updateCareWorker, { isLoading }] = useUpdateCareWorkerMutation();

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<UpdateCareWorkerReq>();

  const navLinkProps = useStaffNavLinkProps();

  useEffect(() => {
    if (careWorker) {
      reset({
        ...careWorker,
        name: careWorker.user.name,
        email: careWorker.user.email,
        phone: careWorker.user.phone,
      });
    }
  }, [reset, careWorker]);

  const handleFormSubmit = async (values: UpdateCareWorkerReq) => {
    const updatedValue = removeUndefined({ ...values });
    if (typeof updatedValue.photo === "string") {
      delete updatedValue.photo;
    }
    await updateCareWorker(updatedValue);
    refetch();
  };

  return (
    <Layout
      rightBar={MaintenanceRightBar}
      sidebarProps={navLinkProps}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column
          sx={{
            gap: "1em",
            p: 5,
            borderRadius: "1rem",
          }}
        >
          <LoadingButton
            sx={{
              alignSelf: "flex-end",
            }}
            type='submit'
            variant='contained'
            loading={isLoading}
          >
            Save
          </LoadingButton>
          <SmartForm
            template={getDetailsCareWorkerForm()}
            control={control}
            watch={watch}
            setValue={setValue}
            labelPosition='left'
          />
        </Column>
      </form>
    </Layout>
  );
};
