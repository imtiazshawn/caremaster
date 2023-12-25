import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";
import { yupResolver } from "@hookform/resolvers/yup";

import { emailBodySchema } from "@/formSchemas/emailBody";
import { Modal } from "@common/Modal";
import ShowShortMessage from "@common/ShortMessage";
import { useSendEmailMutation } from "@reducers/api/sendEmail";
import React from "react";

type Props = {
  email: string;
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
};

type EmailBody = {
  subject: string;
  message: string;
};

const defaultValues: EmailBody = {
  subject: "",
  message: "",
};
const SendMeetingReqModal: React.FC<Props> = ({ isOpen, onClose, email }) => {
  const { handleSubmit, control, reset } = useForm<EmailBody>({
    defaultValues: defaultValues,
    resolver: yupResolver(emailBodySchema),
  });
  const [sendEmail, { isLoading }] = useSendEmailMutation();

  const careWorkerFormTemplate: FormTemplate<EmailBody>[] = [
    {
      type: "text",
      label: "Subject",
      name: "subject",
      required: true,
    },
    {
      type: "text-area",
      label: "Message",
      name: "message",
      required: true,
    },
  ];

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = async (body: EmailBody) => {
    sendEmail({
      ...body,
      email,
    }).then(() => {
      onCloseHandler();
      ShowShortMessage("Email has been sent successfully");
    });
  };

  return (
    <Modal
      title='Send Video Invitation'
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
          <FlexBox sx={{ justifyContent: "flex-end" }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
            >
              Send Email
            </LoadingButton>
          </FlexBox>
        </Column>
      </form>
    </Modal>
  );
};

export default SendMeetingReqModal;
