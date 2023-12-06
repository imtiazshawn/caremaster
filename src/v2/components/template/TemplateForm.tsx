import { TemplateFull, TemplateSectionFull } from "$types/template";
import { removeUndefined } from "@/Utils";
import { useTemplate } from "@/v2/hooks/useTemplate";
import { Form, FormRef } from "@common/Form";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { SmartForm } from "@common/SmartForm";
import { H1, H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import {
  useCreateTemplateValueMutation,
  useGetTemplateValuesQuery,
  useUpdateTemplateValueMutation,
} from "@reducers/api/templateValues";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";
import {
  getFormFieldTypeFromFieldType,
  mapFieldDataToFormValues,
  mapFormFieldValuesToData,
} from "@shared/utils/template";
import { FC, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { TemplateField } from "../../../types/templateField";

type TemplateFormProps = {
  overrideTemplate?: TemplateFull | undefined;
};

export const TemplateForm: FC<TemplateFormProps> = ({ overrideTemplate }) => {
  const { template: templateFromRoute } = useTemplate();
  const template = overrideTemplate ?? templateFromRoute;
  const serviceUserId = useServiceUserId();
  const { data: templateValue } = useGetTemplateValuesQuery({
    templateId: template?.id ?? 0,
    serviceUserId: serviceUserId ?? 0,
  });

  const [updateTemplateValue] = useUpdateTemplateValueMutation();
  const [createTemplateValue] = useCreateTemplateValueMutation();

  const formRef = useRef<FormRef>(null);

  useEffect(() => {
    if (!templateValue?.[0]) {
      return;
    }
    formRef.current?.api.reset(
      mapFieldDataToFormValues(templateValue?.[0].data),
    );
  }, [formRef, templateValue]);

  const onSubmit = async (values: Record<string, any>) => {
    removeUndefined(values);

    const fieldData = mapFormFieldValuesToData(values);
    if (!templateValue?.[0]) {
      await createTemplateValue({
        template: template?.id ?? 0,
        service_user: serviceUserId ?? 0,
        data: fieldData,
      });
    } else {
      await updateTemplateValue({
        id: templateValue?.[0].id ?? 0,
        template: template?.id ?? 0,
        service_user: serviceUserId ?? 0,
        data: fieldData,
      });
    }
    ShowShortMessage("Template saved successfully");
  };

  return (
    <Form
      onSubmit={onSubmit}
      ref={formRef}
    >
      <Column sx={{ p: 3, gap: 3 }}>
        <Column>
          <FlexBox sx={{ justifyContent: "space-between" }}>
            <H1>{template?.name}</H1>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
            >
              Save
            </LoadingButton>
          </FlexBox>
          <H3>{template?.description}</H3>
        </Column>

        <TemplateFieldArray
          fields={template?.fields}
          depth={0}
          sectionId={null}
          templateId={template?.id ?? 0}
          labelPosition='top'
        />
        {template?.sections?.map((section) => {
          return (
            <SectionComponent
              key={section.id}
              section={section}
              depth={0}
            />
          );
        })}
      </Column>
    </Form>
  );
};

type SectionProps = {
  section: TemplateSectionFull;
  depth: number;
};

const SectionComponent: React.FC<SectionProps> = ({ section, depth }) => {
  const isOdd = depth % 2 === 1;

  const evenColor = "rgba(0,0,0,.07)";
  const oddColor = "white";

  return (
    <Column
      sx={{
        width: "100%",
        p: 2,
        background: isOdd ? oddColor : evenColor,
        borderRadius: 2,
      }}
    >
      <FlexBox>
        <FlexBox
          sx={{
            p: 2,
            background: !isOdd ? oddColor : evenColor,
            borderRadius: 2,
            justifyContent: "space-between",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <H3>{section.name}</H3>
        </FlexBox>
      </FlexBox>
      <Column
        sx={{
          display: "flex",
        }}
      >
        <TemplateFieldArray
          fields={section.fields}
          depth={0}
          sectionId={section.id}
          templateId={section.template}
        />
        <SectionArray
          sections={section.sections}
          templateId={section.template}
          sectionId={section.id}
          depth={depth}
        />
      </Column>
    </Column>
  );
};

const SectionArray = ({
  sections,
  depth,
}: {
  sections: TemplateSectionFull[] | undefined;
  depth: number;
  templateId: number;
  sectionId: number | null;
}) => {
  return (
    <Column
      sx={{
        ml: depth > 0 ? 3 : 0,
      }}
    >
      {sections?.map((section) => {
        return (
          <SectionComponent
            key={section.id}
            section={section}
            depth={depth + 1}
          />
        );
      })}
    </Column>
  );
};

type TemplateFieldProps = {
  field: TemplateField;
  labelPosition?: "left" | "top";
};

const TemplateFieldComponent = ({
  field,
  labelPosition = "left",
}: TemplateFieldProps) => {
  const type = getFormFieldTypeFromFieldType(field.field_type);
  const methods = useFormContext();

  const templates = [
    {
      type,
      name: String(field.id) as any,
      label: field.label,
      options:
        field.options?.map((option: any) => ({
          label: option.name,
          value: option.name,
        })) ?? [],
    },
  ];

  return (
    <SmartForm
      template={templates as any}
      labelPosition={labelPosition}
      control={methods.control}
    />
  );
};

const TemplateFieldArray = ({
  fields,
  depth,
  labelPosition,
}: {
  fields: TemplateField[] | undefined;
  depth: number;
  templateId: number;
  sectionId: number | null;
  labelPosition?: "left" | "top";
}) => {
  return (
    <Column
      sx={{
        ml: depth > 0 ? 3 : 0,
      }}
    >
      {fields?.map((field) => {
        return (
          <TemplateFieldComponent
            key={field.id}
            field={field}
            labelPosition={labelPosition}
          />
        );
      })}
    </Column>
  );
};
