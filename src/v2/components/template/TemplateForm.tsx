import { TemplateSectionFull } from "$types/template";
import { Layout } from "@/v2/components/Layout";
import { useClientNavLinkProps } from "@/v2/hooks/useClientNavLinkProps";
import { useTemplate } from "@/v2/hooks/useTemplate";
import { Form } from "@common/Form";
import { SmartForm } from "@common/SmartForm";
import { H1, H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { getFormFieldTypeFromFieldType } from "@shared/utils/template";
import { useForm } from "react-hook-form";
import { TemplateField } from "../../../types/templateField";

export const TemplateForm = () => {
  const { template } = useTemplate();
  const navLinkProps = useClientNavLinkProps();
  return (
    <Layout sidebarProps={navLinkProps}>
      <Column sx={{ p: 3, gap: 3 }}>
        <Column>
          <H1>{template?.name}</H1>
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
    </Layout>
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
    <Form
      onSubmit={() => {
        // console.log("~~~ submit", values);
      }}
    >
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
    </Form>
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

  const templates = [
    {
      type,
      name: String(field.id) as any,
      label: field.label,
      options:
        field.options?.map((option: any) => ({
          label: option.name,
          value: option.score,
        })) ?? [],
    },
  ];
  const { control } = useForm();

  return (
    <SmartForm
      template={templates as any}
      labelPosition={labelPosition}
      control={control}
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
