import { Template, TemplateSectionFull } from "$types/template";
import { TemplateField, TemplateFieldDTO } from "$types/templateField";
import { FieldArray } from "@/v2/components/settings/TemplateFields";
import { Button } from "@common/Button";
import ShowShortMessage from "@common/ShortMessage";
import { H1, H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import AddSectionModal from "@components/modals/AddSectionModal";
import AddTemplateModal from "@components/modals/AddTemplateModal";
import { ExpandMore } from "@mui/icons-material";
import {
  useCreateTemplateFieldMutation,
  useDeleteTemplateFieldMutation,
  useUpdateTemplateFieldMutation,
} from "@reducers/api/templateFields";
import { useGetTemplateQuery } from "@reducers/api/templates";
import { useEffect, useState } from "react";

type Props = {
  template: Template;
};

const useSaveFields = (
  fields: TemplateFieldDTO[],
  sectionFields: TemplateField[],
) => {
  const [updateField] = useUpdateTemplateFieldMutation();
  const [deleteField] = useDeleteTemplateFieldMutation();
  const [createField] = useCreateTemplateFieldMutation();

  const onSaveFields = async () => {
    const deletedIds = sectionFields
      .filter((f) => !fields.some((f2: any) => f2.id === f.id))
      .map((f) => f.id);

    await Promise.all(
      deletedIds.map((id) => {
        return deleteField(id);
      }),
    );

    await Promise.all(
      fields.map(async (field: any) => {
        if (field.id) {
          await updateField({
            ...field,
            options:
              typeof field.options === "string"
                ? field.options
                : JSON.stringify(field.options),
          });
        } else {
          if (field.section === 0) {
            delete field.section;
          }
          await createField({
            ...field,
            ...(field.options
              ? {
                  options:
                    typeof field.options === "string"
                      ? field.options
                      : JSON.stringify(field.options),
                }
              : null),
          });
        }
      }),
    );

    ShowShortMessage("Fields saved");
  };
  return onSaveFields;
};

export const TemplatePanel: React.FC<Props> = ({ template: { id } }) => {
  const { data: template } = useGetTemplateQuery(id);
  const [isEditTemplateModalOpen, setIsEditTemplateModalOpen] = useState(false);
  const [fields, setFields] = useState<TemplateFieldDTO[]>([]);

  const onSaveFields = useSaveFields(fields, template?.fields || []);

  useEffect(() => {
    if (template) {
      setFields(template.fields);
    }
  }, [template]);

  if (!template) {
    return null;
  }

  return (
    <Column sx={{ width: "100%", mb: 10 }}>
      <FlexBox sx={{ justifyContent: "space-between" }}>
        <H1>{template.description}</H1>
        <Button
          variant='outlined'
          onClick={() => setIsEditTemplateModalOpen(true)}
        >
          Edit
        </Button>
      </FlexBox>
      <AddTemplateModal
        template={template}
        isOpen={isEditTemplateModalOpen}
        onClose={() => setIsEditTemplateModalOpen(false)}
        category={template.category}
      />
      <FlexBox
        sx={{
          justifyContent: "space-between",
        }}
      >
        <H3>Fields {fields.length > 0 ? "" : "(no fields)"}</H3>
        {fields.length > 0 && (
          <Button
            variant='contained'
            onClick={() => {
              onSaveFields();
            }}
          >
            Save
          </Button>
        )}
      </FlexBox>
      <FieldArray
        setFields={(fields) => setFields(fields)}
        fields={fields}
        section={0}
        template={template.id}
      />{" "}
      <SectionArray
        sections={template.sections}
        templateId={template.id}
        sectionId={null}
        depth={0}
      />
    </Column>
  );
};

type SectionProps = {
  section: TemplateSectionFull;
  depth: number;
};

const SectionComponent: React.FC<SectionProps> = ({ section, depth }) => {
  const [fields, setFields] = useState<TemplateFieldDTO[]>(section.fields);
  const [open, setOpen] = useState(true);
  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);

  useEffect(() => {
    setFields(section.fields);
  }, [section.fields]);

  const isOdd = depth % 2 === 1;

  const evenColor = "rgba(0,0,0,.07)";
  const oddColor = "white";

  const onSaveFields = useSaveFields(fields, section.fields || []);

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
          onClick={() => setOpen((o) => !o)}
        >
          <H3>{section.name}</H3>
          <ExpandMore />
        </FlexBox>
        <Button
          variant='outlined'
          onClick={() => {
            setIsEditSectionModalOpen(true);
          }}
        >
          Edit
        </Button>
      </FlexBox>
      <AddSectionModal
        section={section}
        isOpen={isEditSectionModalOpen}
        onClose={() => setIsEditSectionModalOpen(false)}
        parent={section.parent}
        template={section.template}
      />
      <Column
        sx={{
          display: open ? "flex" : "none",
        }}
      >
        <FlexBox
          sx={{
            justifyContent: "space-between",
          }}
        >
          <H3>Fields {fields.length > 0 ? "" : "(no fields)"}</H3>
          {fields.length > 0 && (
            <Button
              variant='contained'
              onClick={() => {
                onSaveFields();
              }}
            >
              Save
            </Button>
          )}
        </FlexBox>
        <FieldArray
          setFields={(fields) => setFields(fields)}
          fields={fields}
          section={section.id}
          template={section.template}
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
  templateId,
  sectionId,
}: {
  sections: TemplateSectionFull[] | undefined;
  depth: number;
  templateId: number;
  sectionId: number | null;
}) => {
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  return (
    <Column
      sx={{
        ml: depth > 0 ? 3 : 0,
      }}
    >
      {depth < 2 && (
        <FlexBox sx={{ justifyContent: "flex-end" }}>
          <Button
            variant='contained'
            onClick={() => setIsAddSectionModalOpen(true)}
          >
            + New Section
          </Button>
        </FlexBox>
      )}
      <AddSectionModal
        isOpen={isAddSectionModalOpen}
        onClose={() => setIsAddSectionModalOpen(false)}
        template={templateId}
        parent={sectionId}
      />
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
