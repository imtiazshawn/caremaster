import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { XButton } from "@components/common/Button";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";
import { ModalTitle } from "@components/common/Typography";

import { Template, TemplateDTO } from "$types/template";
import {
  useCreateTemplateMutation,
  useGetTemplateQuery,
  useGetTemplatesQuery,
  useUpdateTemplateMutation,
} from "@reducers/api/templates";
import React, { useEffect } from "react";
const defaultValues: TemplateDTO = {
  name: "",
  description: "",
  slug: "",
  score_required: false,
  category: 0,
};

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  category: number;
  template?: Template;
};

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   // description: yup.string(),
//   // template: yup.number().required(),
//   // parent: yup.number().nullable().required(),
// });

const AddTemplateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  category,
  template,
}) => {
  const isEditing = Boolean(template);
  const { handleSubmit, control, reset } = useForm<TemplateDTO>({
    defaultValues: defaultValues,
    // @ts-ignore
    // resolver: yupResolver(schema),
  });

  const { refetch } = useGetTemplatesQuery();
  const { refetch: refetchTemplate } = useGetTemplateQuery(template?.id ?? 0);
  const [createTemplate, { isLoading }] = useCreateTemplateMutation();
  const [updateTemplate] = useUpdateTemplateMutation();

  useEffect(() => {
    if (template) {
      reset(template);
    }
  }, [reset, template]);

  const templateFormTemplate: FormTemplate<TemplateDTO>[] = [
    {
      type: "text",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "text",
      label: "Description",
      name: "description",
    },
    {
      type: "switch",
      name: "score_required",
      label: "Score Required",
    },
  ];

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = async (values: TemplateDTO) => {
    values.category = category;
    values.slug = values.name.toLowerCase().replace(/\s/g, "-");
    if (isEditing && template) {
      await updateTemplate({
        id: template.id,
        ...values,
      });
    } else {
      await createTemplate(values);
    }
    onCloseHandler?.();
    refetch();
    refetchTemplate();
  };

  const submitButtonText = isEditing ? "Update Template" : "Create Template";
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
        <ModalTitle>Template Form</ModalTitle>
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
              template={templateFormTemplate}
              control={control}
              labelPosition='top'
            />
            <FlexBox sx={{ justifyContent: "flex-end" }}>
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isLoading}
              >
                {submitButtonText}
              </LoadingButton>
            </FlexBox>
          </Column>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTemplateModal;
