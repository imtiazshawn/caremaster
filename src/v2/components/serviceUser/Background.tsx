import { Column } from "@components/common";
import { useEffect } from "react";

import { ServiceUser } from "$types/serviceUsers";
import { removeUndefined } from "@/Utils";
import { useServiceUser } from "@/shared/hooks/useServiceUser";
import { Layout } from "@/v2/components/Layout";
import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { useClientNavLinkProps } from "@/v2/hooks/useClientNavLinkProps";
import { SmartForm } from "@common/SmartForm";
import { LoadingButton } from "@components/common/LoadingButton";
import { useUpdateServiceUserMutation } from "@reducers/api/serviceUsers";
import { backgroundInfoForm } from "@serviceUsersUI/PersonalProfileFormTemplates";
import { useForm } from "react-hook-form";

export const BackgroundForm = () => {
  const { serviceUser, refetch } = useServiceUser();
  const [updateServiceUser, { isLoading }] = useUpdateServiceUserMutation();

  const { handleSubmit, control, setValue, reset, watch } =
    useForm<ServiceUser>();

  const navLinkProps = useClientNavLinkProps();

  useEffect(() => {
    if (serviceUser) {
      reset({ ...serviceUser });
    }
  }, [reset, serviceUser]);

  const handleFormSubmit = async (value: ServiceUser) => {
    const updatedValue = removeUndefined({ ...value });
    if (typeof updatedValue.photo === "string") {
      delete updatedValue.photo;
    }
    await updateServiceUser(updatedValue);
    refetch();
  };

  return (
    <Layout
      rightBar={MaintenanceRightBar}
      sidebarProps={navLinkProps}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column sx={{ gap: "1em", p: 5 }}>
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
            template={backgroundInfoForm({ setValue, watch })}
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
