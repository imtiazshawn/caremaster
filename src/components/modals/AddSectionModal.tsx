import { useForm } from "react-hook-form";

import { Column, FlexBox } from "@components/common";
import { LoadingButton } from "@components/common/LoadingButton";
import { FormTemplate, SmartForm } from "@components/common/SmartForm";

import { TemplateSection, TemplateSectionDTO } from "$types/templateSection";
import { Modal } from "@common/Modal";
import {
  useCreateTemplateSectionMutation,
  useUpdateTemplateSectionMutation,
} from "@reducers/api/templateSections";
import { useGetTemplateQuery } from "@reducers/api/templates";
import React, { useEffect } from "react";
const defaultValues: TemplateSectionDTO = {
  name: "",
  description: "",
  template: 0,
  parent: null,
};

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
  template: number;
  parent: number | null;
  section?: TemplateSection;
};

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   // description: yup.string(),
//   // template: yup.number().required(),
//   // parent: yup.number().nullable().required(),
// });

const AddSectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  parent,
  template,
  section,
}) => {
  const { handleSubmit, control, reset } = useForm<TemplateSectionDTO>({
    defaultValues: defaultValues,
    // @ts-ignore
    // resolver: yupResolver(schema),
  });

  const { refetch } = useGetTemplateQuery(template);
  const [createTemplateSection, { isLoading }] =
    useCreateTemplateSectionMutation();
  const [updateSection] = useUpdateTemplateSectionMutation();

  const isEditing = Boolean(section);

  useEffect(() => {
    if (section) {
      reset(section);
    }
  }, [reset, section]);

  const templateSectionFormTemplate: FormTemplate<TemplateSectionDTO>[] = [
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
  ];

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = async (values: TemplateSectionDTO) => {
    values.parent = parent;
    values.template = template;

    if (parent === null) {
      // @ts-ignore
      delete values.parent;
    }

    if (isEditing && section) {
      await updateSection({
        id: section.id,
        ...values,
      });
    } else {
      await createTemplateSection(values);
    }

    onCloseHandler?.();
    refetch();
    return;
  };

  const submitButtonLabel = isEditing ? "Update Section" : "Create Section";
  return (
    <Modal
      title='Template Section Form'
      onCloseHandler={onCloseHandler}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column>
          <SmartForm
            template={templateSectionFormTemplate}
            control={control}
            labelPosition='top'
          />
          <FlexBox sx={{ justifyContent: "flex-end" }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
            >
              {submitButtonLabel}
            </LoadingButton>
          </FlexBox>
        </Column>
      </form>
    </Modal>
  );
};

export default AddSectionModal;
