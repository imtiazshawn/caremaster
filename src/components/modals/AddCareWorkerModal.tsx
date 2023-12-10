import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { XButton } from "@components/common/Button";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";
import { ModalTitle } from "@components/common/Typography";
import { yupResolver } from "@hookform/resolvers/yup";

import { applicantSchema } from "@/formSchemas/aplicants";
import ShowShortMessage from "@common/ShortMessage";
import { PostCodeComponent } from "@components/PostCodeComponent";
import {
  useCreateApplicantMutation,
  useGetApplicantsQuery,
} from "@reducers/api/applicants";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
};

type CreateApplicant = {
  first_name: string;
  surname: string;
  email: string;
  address: string;
  postcode: string;
};

const defaultValues: CreateApplicant = {
  first_name: "",
  surname: "",
  email: "",
  postcode: "",
  address: "",
};
const AddCareWorkerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { handleSubmit, control, reset, setValue, watch } =
    useForm<CreateApplicant>({
      defaultValues: defaultValues,
      resolver: yupResolver(applicantSchema),
    });
  // const [showSuccess, setShowSuccess] = React.useState<boolean>(false);
  const { refetch } = useGetApplicantsQuery(null);
  const [createApplicant, { isLoading }] = useCreateApplicantMutation();

  const careWorkerFormTemplate: FormTemplate<CreateApplicant>[] = [
    {
      type: "text",
      label: "First Name",
      name: "first_name",
      required: true,
    },
    {
      type: "text",
      label: "Surname",
      name: "surname",
      required: true,
    },
    {
      type: "text",
      label: "Email",
      name: "email",
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

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = async (values: CreateApplicant) => {
    createApplicant(values).then(() => {
      ShowShortMessage("Applied successfully");
      onCloseHandler?.();
      refetch();
    });
  };
  // const handleFormSubmit = async (values: CreateApplicant) => {
  //   values.password = getRandomGeneratedPassword();

  //   createApplicant(values).then(() => {
  //     onCloseHandler?.();
  //     refetch();
  //   });
  // };

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
                Create A New Applicant
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCareWorkerModal;
