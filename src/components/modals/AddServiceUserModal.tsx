import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  ENROLLMENT_STATUS,
  ServiceUser,
  ServiceUserDto,
} from "$types/serviceUsers";
import { serviceUserSchema } from "@/formSchemas/serviceUsers";
import { XButton } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { ModalTitle } from "@common/Typography";
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
  onClose?: () => void;
  onProceed?: () => void;
};

const AddServiceUserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleSubmit, control, setValue, reset } = useForm<ServiceUserDto>({
    defaultValues: defaultValues,
    resolver: yupResolver(serviceUserSchema),
  });

  const { refetch } = useGetServiceUsersQuery(null);
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

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = (values: ServiceUserDto) => {
    createServiceUser({
      ...values,
      enrollment_status: ENROLLMENT_STATUS.PRE_ADMISSION,
    }).then(() => {
      onCloseHandler();
      refetch();
    });
  };

  return (
    <Dialog
      open={isOpen}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%",
          width: "40rem",
        },
      }}
      onClose={onCloseHandler}
    >
      <DialogTitle sx={{ flexDirection: "row" }}>
        <ModalTitle>Add new client</ModalTitle>
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
              template={ServiceUsersApplyForm}
              control={control}
              labelPosition='top'
            />
            <FlexBox sx={{ justifyContent: "flex-end" }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                Create Client
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceUserModal;
