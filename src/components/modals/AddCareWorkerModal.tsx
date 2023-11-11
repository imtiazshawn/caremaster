import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { XButton } from "@components/common/Button";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";
import { ModalTitle } from "@components/common/Typography";
import { yupResolver } from "@hookform/resolvers/yup";

import { CreateCareWorker } from "$types/careWorkers";
import { careWorkerSchema } from "@/formSchemas/careWorkers";
import { PostCodeComponent } from "@components/PostCodeComponent";
import {
  useCreateCareWorkerMutation,
  useGetCareWorkersQuery,
} from "@reducers/api/careWorkers";
import React from "react";

const defaultValues: CreateCareWorker = {
  email: "",
  phone: "",
  name: "",
  postcode: "",
  address: "",
  password: "",
};

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
};

const AddCareWorkerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleSubmit, control, reset, setValue } = useForm<CreateCareWorker>({
    defaultValues: defaultValues,
    resolver: yupResolver(careWorkerSchema),
  });

  const { refetch } = useGetCareWorkersQuery(null);
  const [createCareWorker, { isLoading }] = useCreateCareWorkerMutation();

  const careWorkerFormTemplate: FormTemplate<CreateCareWorker>[] = [
    {
      type: "text",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "text",
      label: "Email",
      name: "email",
    },
    {
      type: "text",
      label: "Phone Number(UK)",
      name: "phone",
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

  const handleFormSubmit = async (values: CreateCareWorker) => {
    values.password = Math.random().toString(36).slice(-8);

    createCareWorker(values).then(() => {
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
              labelPosition='top'
            />
            <FlexBox sx={{ justifyContent: "flex-end" }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                Create Care Worker
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCareWorkerModal;
