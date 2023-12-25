import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";

import { Template, TemplateDTO } from "$types/template";
import { Modal } from "@common/Modal";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
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
  const [deleteTemplate] = useDeleteTemplateMutation();
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
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  return (
    <Modal
      title='Template Form'
      isOpen={isOpen}
      onCloseHandler={onCloseHandler}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column>
          <SmartForm
            template={templateFormTemplate}
            control={control}
            labelPosition='top'
          />
          <ConfirmationDialog
            isOpen={isConfirmationOpen}
            onCancel={() => setIsConfirmationOpen(false)}
            onOk={async () => {
              setIsConfirmationOpen(false);
              await deleteTemplate(template?.id ?? 0);
              refetch();
              refetchTemplate();
              onCloseHandler();
            }}
            title='Are you sure you want to delete?'
            description='All forms created will be deleted! Be super sure before doing this.'
          />
          <FlexBox sx={{ justifyContent: "flex-end" }}>
            {isEditing && (
              <LoadingButton
                variant='contained'
                color='error'
                loading={isLoading}
                onClick={() => setIsConfirmationOpen(true)}
              >
                Delete
              </LoadingButton>
            )}
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
    </Modal>
  );
};

export default AddTemplateModal;
