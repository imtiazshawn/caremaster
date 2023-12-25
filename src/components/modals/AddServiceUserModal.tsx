import { useForm } from "react-hook-form";

import {
  ENROLLMENT_STATUS,
  ServiceUser,
  ServiceUserDto,
} from "$types/serviceUsers";
import { serviceUserSchema } from "@/formSchemas/serviceUsers";
import { LoadingButton } from "@common/LoadingButton";
import { Modal } from "@common/Modal";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { Column, FlexBox } from "@common/index";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateServiceUserMutation,
  useGetServiceUsersQuery,
} from "@reducers/api/serviceUsers";
import React from "react";
import { PostCodeComponent } from "../PostCodeComponent";

const defaultValues = {
  name: "",
  email: "",
  postcode: "",
  address: "",
} as ServiceUser;

type Props = {
  isOpen: boolean;
  onClose?: (successfullyCreated?: boolean) => void;
  onProceed?: () => void;
};

const AddServiceUserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleSubmit, control, setValue, reset, watch } =
    useForm<ServiceUserDto>({
      defaultValues: defaultValues,
      resolver: yupResolver(serviceUserSchema),
    });

  const { refetch } = useGetServiceUsersQuery();
  const [createServiceUser, { isLoading }] = useCreateServiceUserMutation();

  const ServiceUsersApplyForm: FormTemplate<ServiceUser>[] = [
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "custom",
      component: (
        <PostCodeComponent
          setValue={setValue}
          postcode={watch("postcode")}
          setAddress={(address) => setValue("address", address)}
          setPostcode={(postcode) => setValue("postcode", postcode)}
          labelPosition='top'
        />
      ),
    },
    {
      type: "text",
      label: "Address",
      name: "address",
    },
  ];

  const onCloseHandler = (successfullyCreated = false) => {
    reset({ ...defaultValues });
    onClose?.(successfullyCreated);
  };

  const handleFormSubmit = (values: ServiceUserDto) => {
    createServiceUser({
      ...values,
      enrollment_status: ENROLLMENT_STATUS.PRE_ADMISSION,
    }).then(() => {
      onCloseHandler(true);
      refetch();
    });
  };

  return (
    <Modal
      onCloseHandler={onCloseHandler}
      title='Add New Client'
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column>
          <SmartForm
            template={ServiceUsersApplyForm}
            control={control}
            labelPosition='top'
          />
          <FlexBox sx={{ justifyContent: "center", width: "100%" }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
              sx={{
                width: "100%",
                backgroundColor: "#082F3C",
              }}
            >
              Create Client
            </LoadingButton>
          </FlexBox>
        </Column>
      </form>
    </Modal>
  );
};

export default AddServiceUserModal;
