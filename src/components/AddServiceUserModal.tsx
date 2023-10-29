import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useForm } from "react-hook-form";

import { ServiceUserType } from "$types/serviceUser";

import { serviceUserSchema } from "@/formSchemas/serviceUsers";
import { Column, FlexBox } from "@components/common";
import { XButton } from "@components/common/Button";
import { LoadingButton } from "@components/common/LoadingButton";
import { CustomSmartForm, FormTemplate } from "@components/common/SmartForm";
import { ModalTitle } from "@components/common/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateServiceUserMutation,
  useGetServiceUsersQuery,
} from "@reducers/api/serviceUsers";
import React from "react";
import { PostCodeComponent } from "./PostCodeComponent";

const defaultValues = {
  name: "",
  email: "",
  postcode: "",
  address: "",
} as ServiceUserType;

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
};

const AddServiceUserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleSubmit, control, setValue, reset } = useForm<ServiceUserType>({
    defaultValues: defaultValues,
    resolver: yupResolver(serviceUserSchema),
  });

  const { refetch } = useGetServiceUsersQuery(null);
  const [createServiceUser, { isLoading }] = useCreateServiceUserMutation();

  const ServiceUsersForm: FormTemplate<ServiceUserType>[] = [
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

  const handleFormSubmit = async (values: any) => {
    createServiceUser(values).then(() => {
      onCloseHandler?.();
      refetch();
    });
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
        <ModalTitle>Service Users</ModalTitle>
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
            <CustomSmartForm
              template={ServiceUsersForm}
              control={control}
            />
            <FlexBox sx={{ justifyContent: "flex-end" }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                Create Service User
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceUserModal;
