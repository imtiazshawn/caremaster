import { Switch } from "@mui/material";
import { useForm } from "react-hook-form";

import { RecordWithFields, RecordWithFieldsDTO } from "$types/record";

import { Button } from "@common/Button";
import { LoadingButton } from "@common/LoadingButton";
import { Modal } from "@common/Modal";
import Select from "@common/Select";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import TextField from "@common/TextField";
import { H3 } from "@common/Typography";
import { Column, FlexBox } from "@common/index";
import { recordFieldsApi } from "@reducers/api/recordFields";
import { recordsApi, useCreateRecordMutation } from "@reducers/api/records";
import { useAppDispatch } from "@redux/store";
import React, { useEffect } from "react";
import { FieldTypeEnum, recordFieldTypes } from "../../types/recordFields";

const defaultValues: RecordWithFieldsDTO = {
  name: "",
  description: "",
  is_active: true,
  fields: [
    {
      label: "",
      field_type: FieldTypeEnum.TEXT,
      show_on_table: true,
    },
  ],
};

type Props = {
  record?: RecordWithFields | null;
  isOpen: boolean;
  onClose?: () => void;
  onProceed?: () => void;
};

type RecordFieldsArrayProps = {
  record: RecordWithFieldsDTO;
  fields: RecordWithFieldsDTO["fields"];
  setFields: React.Dispatch<
    React.SetStateAction<RecordWithFieldsDTO["fields"]>
  >;
};

const RecordFieldsArray: React.FC<RecordFieldsArrayProps> = ({
  fields,
  setFields,
}) => {
  return (
    <Column sx={{ gap: 3, width: "100%" }}>
      <FlexBox sx={{ lineHeight: "20px" }}>
        <H3 flex={1}>Field Name</H3>
        <H3 flex={1}>Field Type</H3>
      </FlexBox>
      {fields.map((field, index) => {
        return (
          <FlexBox
            key={index}
            sx={{ height: "2em", width: "100%", gap: 2 }}
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
              sx={{ height: "2em", width: "100%", gap: 2 }}
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
                <TextField
                  value={field.options}
                  variant='outlined'
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index] = {
                      ...newFields[index],
                      options: e.target.value,
                    };
                    setFields(newFields);
                  }}
                  fullWidth
                />
              )}
            </FlexBox>
          </FlexBox>
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

const AddRecordModal: React.FC<Props> = ({ isOpen, onClose, record }) => {
  const { handleSubmit, control, reset } = useForm<RecordWithFieldsDTO>({
    defaultValues: defaultValues,
    // TODO: add validation
    // resolver: yupResolver(recordSchema),
  });

  const [createRecord] = useCreateRecordMutation();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const recordWithFields = record ?? defaultValues;
  const [fields, setFields] = React.useState<RecordWithFieldsDTO["fields"]>(
    recordWithFields.fields,
  );
  const recordFormTemplate: FormTemplate<RecordWithFieldsDTO>[] = [
    {
      type: "text",
      label: "Name",
      name: "name",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
    },
    {
      type: "custom",
      component: (
        <RecordFieldsArray
          record={recordWithFields}
          fields={fields}
          setFields={setFields}
        />
      ),
    },
  ];

  const onCloseHandler = () => {
    reset({ ...defaultValues });
    onClose?.();
  };

  const handleFormSubmit = async (values: any) => {
    delete values.fields;
    let recordId = record?.id;
    setIsLoading(true);

    if (!recordId) {
      recordId = await createRecord(values).then((response) => {
        // TODO: handle error
        // @ts-ignore
        if (response.error) {
          return -1;
        }
        // @ts-ignore
        return response.data as number;
      });
    } else {
      await dispatch(
        recordsApi.endpoints.updateRecord.initiate({
          id: recordId,
          ...values,
        }),
      );
    }
    setIsLoading(false);

    if (!recordId) {
      return;
    }

    Promise.all(
      fields.map(async (field) => {
        // TODO (Ovishek):
        // 1. need to fix this type
        // 2. move this to api files
        // @ts-ignore
        const fieldValues = field as any;
        if (!fieldValues.id) {
          await dispatch(
            recordFieldsApi.endpoints.createRecordField.initiate({
              record: recordId!,
              ...field,
            }),
          );
          return;
        }

        await dispatch(
          recordFieldsApi.endpoints.updateRecordField.initiate({
            record: recordId!,
            id: fieldValues.id,
            ...field,
          }),
        );
      }),
    );

    onCloseHandler();
  };

  useEffect(() => {
    if (record) {
      setFields(record.fields);
      reset({ ...record });
    } else {
      setFields([
        {
          label: "",
          field_type: FieldTypeEnum.TEXT,
          show_on_table: true,
        },
      ]);
    }
  }, [record, reset]);

  const submitText = record ? "Update Record" : "Create Record";

  return (
    <Modal
      title='Add a record configuration for service users'
      onCloseHandler={onCloseHandler}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Column>
          <SmartForm
            template={recordFormTemplate}
            control={control}
            labelPosition='top'
          />
          <FlexBox sx={{ justifyContent: "flex-end" }}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isLoading}
            >
              {submitText}
            </LoadingButton>
          </FlexBox>
        </Column>
      </form>
    </Modal>
  );
};

export default AddRecordModal;
