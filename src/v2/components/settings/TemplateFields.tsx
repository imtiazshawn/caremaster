import { FieldTypeEnum, recordFieldTypes } from "$types/recordFields";
import { TemplateFieldDTO } from "$types/templateField";
import { FieldOptions } from "@/v2/components/settings/fields/FieldOptions";
import { Button } from "@common/Button";
import Select from "@common/Select";
import { Switch } from "@common/Switch";
import TextField from "@common/TextField";
import { H4 } from "@common/Typography";
import { Column, FlexBox, Grid } from "@common/index";
import { Delete } from "@mui/icons-material";

type FieldArrayProps = {
  fields: TemplateFieldDTO[];
  setFields: React.Dispatch<React.SetStateAction<TemplateFieldDTO[]>>;
  section: number;
  template: number;
};

export const FieldArray: React.FC<FieldArrayProps> = ({
  section,
  template,
  fields,
  setFields,
}) => {
  return (
    <Column sx={{ gap: 3, width: "100%" }}>
      <Grid sx={{ lineHeight: "20px", gridTemplateColumns: "60px 1fr 1fr" }}>
        <div></div>
        <H4 flex={1}>Field Name</H4>
        <H4 flex={1}>Field Type</H4>
      </Grid>
      {fields.length === 0 && (
        <FlexBox sx={{ justifyContent: "center" }}>
          <H4>No fields</H4>
        </FlexBox>
      )}
      {fields.map((field, index) => {
        return (
          <Grid
            key={index}
            sx={{
              height: "2em",
              width: "100%",
              gap: 2,
              gridTemplateColumns: "45px 1fr 1fr",
            }}
          >
            <Switch
              checked={field.show_on_table}
              onChange={(e) => {
                const newFields = [...fields];
                newFields[index] = {
                  ...newFields[index],
                  show_on_table: e.target.checked,
                };
                setFields(newFields);
              }}
            />
            <TextField
              value={field.label}
              variant='outlined'
              onChange={(e) => {
                const newFields = [...fields];
                // newFields[index].label = e.target.value;
                newFields[index] = {
                  ...newFields[index],
                  label: e.target.value,
                };
                setFields(newFields);
              }}
              fullWidth
            />
            <FlexBox
              key={index}
              sx={{
                height: "2em",
                width: "100%",
                gap: 2,
                alignItems: "cetner",
              }}
            >
              <Select
                fullWidth
                value={field.field_type}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index] = {
                    ...newFields[index],
                    field_type: e.target.value as FieldTypeEnum,
                  };
                  setFields(newFields);
                }}
                options={recordFieldTypes.map((type) => ({
                  label: type.toLocaleUpperCase(),
                  value: type,
                }))}
              />
              {(fields[index].field_type === FieldTypeEnum.SELECT ||
                fields[index].field_type === FieldTypeEnum.RADIO ||
                fields[index].field_type === FieldTypeEnum.CHECKBOX) && (
                <FieldOptions
                  field={field}
                  setField={(newField) => {
                    const newFields = [...fields];
                    newFields[index] = { ...newField };
                    setFields(newFields);
                  }}
                />
              )}
              <Delete
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  const newFields = [...fields];
                  newFields.splice(index, 1);
                  setFields(newFields);
                }}
              />
            </FlexBox>
          </Grid>
        );
      })}
      <FlexBox sx={{ justifyContent: "flex-end" }}>
        <Button
          variant='outlined'
          onClick={() => {
            setFields([
              ...fields,
              {
                label: "",
                field_type: FieldTypeEnum.TEXT,
                show_on_table: true,
                section,
                template,
              },
            ]);
          }}
        >
          Add Field
        </Button>
      </FlexBox>
    </Column>
  );
};
