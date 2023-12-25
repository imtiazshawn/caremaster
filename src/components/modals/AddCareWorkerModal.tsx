import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";
import { yupResolver } from "@hookform/resolvers/yup";

import { applicantSchema } from "@/formSchemas/aplicants";
import { Modal } from "@common/Modal";
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
    <Modal
      title='Add Careworker'
      onCloseHandler={onCloseHandler}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column>
          <SmartForm
            template={careWorkerFormTemplate}
            control={control}
            labelPosition='top'
          />
          <FlexBox sx={{ justifyContent: "center", width: "100%" }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
              sx={{
                backgroundColor: "#082F3C",
                width: "100%",
                p: "5px",
              }}
            >
              Create A New Applicant
            </LoadingButton>
          </FlexBox>
        </Column>
      </form>
    </Modal>
  );
};

export default AddCareWorkerModal;
