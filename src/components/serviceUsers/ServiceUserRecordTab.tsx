import { FieldTypeEnum } from "$types/recordFields";
import { ServiceUserRecords } from "$types/serviceUserRecords";
import { headerClassName } from "@/shared/constants/table";
import { Button } from "@common/Button";
import { SegHeader } from "@common/SegHeader";
import { Table, TableColumn } from "@common/Table";
import { Column, FlexBox, Row } from "@common/index";
import SmartModal from "@components/modals/SmartModal";
import { LoadingButton } from "@mui/lab";
import {
  useCreateServiceUserRecordMutation,
  useDeleteServiceUserRecordMutation,
  useGetServiceUserRecordsQuery,
  useUpdateServiceUserRecordMutation,
} from "@reducers/api/serviceUserRecords";
import { useRecords } from "@redux/hooks/useRecords";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FormTemplate } from "../common/SmartForm";

import { RecordWithFields } from "$types/record";
import { formatDate, getOptions } from "@/Utils";
import { ActionType } from "@/columns/column.careWorkers";
import IconButton from "@common/IconButton";
import Loader from "@common/Loader";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useCreateFileUploadMutation } from "@reducers/api/fileUpload";

type RecordSegment = {
  label: string;
  getTableColumns: (
    handleAction: (dataId: string, actionType: ActionType) => void,
  ) => TableColumn<any>[];
  tableRows: any[];
  formTemplate: FormTemplate<any>[];
  defaultValues: FieldValues;
  recordId: number;
  record: RecordWithFields;
  recordValueMap: Record<number, Record<string, number>>;
};

export const getFormFieldTypeFromFieldType = (
  fieldType: FieldTypeEnum,
): FormTemplate<any>["type"] => {
  switch (fieldType) {
    case FieldTypeEnum.TEXT:
      return "text";
    case FieldTypeEnum.NUMBER:
      return "number";
    case FieldTypeEnum.DATE:
      return "date";
    case FieldTypeEnum.IMAGE:
      return "image";
    case FieldTypeEnum.FILE:
      return "file";
    case FieldTypeEnum.CHECKBOX:
      return "multi-checkbox";
    case FieldTypeEnum.RADIO:
      return "radio";
    case FieldTypeEnum.SELECT:
      return "select";
    // case FieldTypeEnum.TEXTAREA:
    //   return "textarea";
    default:
      return "text";
  }
};

export const ServiceUserRecordTab = () => {
  const { id: serviceUserId } = useParams<{ id: string }>();

  const { records = [], isLoading } = useRecords();

  const {
    data: serviceUserRecords = [],
    refetch,
    isLoading: isLoadingServiceUserRecords,
  } = useGetServiceUserRecordsQuery((serviceUserId || 0) as number);

  const groupedRecordValues = serviceUserRecords.reduce(
    (acc, record) => {
      const key = record.record.id;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(record);
      return acc;
    },
    {} as Record<number, ServiceUserRecords[]>,
  );

  const recordSegments: RecordSegment[] = records
    .map((record) => {
      const recordValues = groupedRecordValues[record.id] ?? [];

      const recordSegment: RecordSegment = {
        label: record.name,
        recordId: record.id,
        record: record,
        getTableColumns: (handleAction) => [
          ...record.fields.map((field) => ({
            flex: 0.25,
            width: 200,
            field: field.label,
            headerName: field.label.toLocaleUpperCase(),
            headerClassName,
            renderCell: (params: any) => {
              if (
                (field.field_type === FieldTypeEnum.FILE ||
                  field.field_type === FieldTypeEnum.IMAGE) &&
                params.value
              ) {
                return (
                  <a
                    href={params.value}
                    target='_blank'
                    rel='noreferrer'
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    {field.field_type === FieldTypeEnum.FILE
                      ? "Download"
                      : "Preview"}
                  </a>
                );
              }
              if (field.field_type === FieldTypeEnum.CHECKBOX) {
                return (
                  <FlexBox sx={{ gap: "5px" }}>
                    {params.value
                      .map((v: boolean, index: number) => {
                        const value = field.options?.split(",")?.[index];
                        if (!value || !v) {
                          return null;
                        }
                        return value.trim();
                      })
                      .filter(Boolean)
                      .join(", ")}
                  </FlexBox>
                );
              }

              if (field.field_type === FieldTypeEnum.DATE) {
                const date = new Date(params.value);
                return formatDate(date);
              }

              return params.value;
            },
          })),
          {
            maxWidth: 230,
            field: "action",
            headerName: "Action",
            headerClassName,
            sortable: false,
            renderCell: (params) => {
              const dataId = params.row.id.toString();
              return (
                <Row>
                  <IconButton
                    varient='edit'
                    onClick={() => handleAction(dataId, "edit")}
                  />
                  <IconButton
                    varient='delete'
                    onClick={() => handleAction(dataId, "delete")}
                  />
                </Row>
              );
            },
          },
        ],
        recordValueMap: recordValues.reduce(
          (acc, recordValue) => {
            acc[recordValue.id] = recordValue.values.reduce(
              (acc, value) => {
                acc[value.field_label] = value.id;
                return acc;
              },
              {} as Record<string, number>,
            );
            return acc;
          },
          {} as Record<number, Record<string, number>>,
        ),
        tableRows: recordValues.map((recordValue) => ({
          id: recordValue.id,
          ...recordValue.values.reduce(
            (acc, values) => {
              const { value, value_type, field_label } = values;

              if (value_type === FieldTypeEnum.CHECKBOX) {
                acc[field_label] = value
                  .split(",")
                  .map((v) => v.trim() === "true");
              } else {
                acc[field_label] = value;
              }
              return acc;
            },
            {} as Record<string, any>,
          ),
        })),
        formTemplate: record.fields.map(
          (field) =>
            ({
              type: getFormFieldTypeFromFieldType(field.field_type),
              name: field.label,
              label: field.label,
              options: getOptions(field.options),
            }) as FormTemplate<any>,
        ),
        defaultValues: record.fields.reduce(
          (acc, field) => {
            acc[field.label] = "";
            return acc;
          },
          {} as Record<string, any>,
        ),
      };
      return recordSegment;
    })
    .filter((v) => v !== null && v !== undefined) as RecordSegment[];

  const [expandedSegment, setExpandedSegment] = useState<string | undefined>(
    recordSegments[0]?.label,
  );

  const firstSegment = recordSegments[0]?.label;
  useEffect(() => {
    setExpandedSegment(firstSegment);
  }, [firstSegment]);

  const changeExpandSegment = (segment: string | undefined) => {
    setExpandedSegment(segment);
  };

  if (isLoading || isLoadingServiceUserRecords) {
    return <Loader />;
  }

  return (
    <Column sx={{ gap: "1em" }}>
      <LoadingButton
        sx={{
          alignSelf: "flex-end",
        }}
        type='submit'
        variant='contained'
        loading={isLoading}
      >
        Save
      </LoadingButton>
      {recordSegments.map(
        (
          {
            tableRows,
            formTemplate,
            getTableColumns,
            label,
            defaultValues,
            recordId,
            record,
            recordValueMap,
          },
          index,
        ) => (
          <Column key={index}>
            <SegHeader
              currentSegment={label}
              expandedSegment={expandedSegment}
              changeExpandSegment={changeExpandSegment}
            />

            <RecordDetails
              label={label}
              tableRows={tableRows}
              formTemplate={formTemplate}
              getTableColumns={getTableColumns}
              defaultValues={defaultValues}
              recordId={recordId}
              record={record}
              isHidden={expandedSegment !== label}
              onSaveOrUpdateFinished={() => {
                refetch();
              }}
              recordValueMap={recordValueMap}
            />
          </Column>
        ),
      )}
    </Column>
  );
};

const RecordDetails: React.FC<{
  tableRows: any[];
  formTemplate: FormTemplate<any>[];
  getTableColumns: (
    handleAction: (dataId: string, actionType: ActionType) => void,
  ) => TableColumn<any>[];
  defaultValues: FieldValues;
  label: string;
  recordId: number;
  record: RecordWithFields;
  isHidden: boolean;
  onSaveOrUpdateFinished: () => void;
  recordValueMap: Record<number, Record<string, number>>;
}> = ({
  label,
  tableRows,
  formTemplate,
  getTableColumns,
  defaultValues,
  recordId,
  record,
  isHidden,
  onSaveOrUpdateFinished,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [createServiceUserRecord] = useCreateServiceUserRecordMutation();
  const [updateServiceUserRecord] = useUpdateServiceUserRecordMutation();
  const [deleteServiceUserRecord] = useDeleteServiceUserRecordMutation();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [lastDataId, setLastDataId] = useState<string>("");

  const { id: serviceUserId } = useParams<{ id: string }>();
  const [createFileUpload] = useCreateFileUploadMutation();

  const handleAction = (dataId: string, actionType: ActionType) => {
    if (actionType === "edit") {
      const record = tableRows.find((v) => String(v.id) === dataId);
      setSelectedRecord({ ...record });
      setIsOpen(true);
    } else {
      setLastDataId(dataId);
      setIsOpenDeleteDialog(true);
    }
  };

  return (
    <Column sx={{ display: isHidden ? "none" : "flex" }}>
      <Table
        columns={getTableColumns(handleAction)}
        rows={tableRows}
      />
      <ConfirmationDialog
        isOpen={isOpenDeleteDialog}
        onCancel={() => {
          setIsOpenDeleteDialog(false);
        }}
        onOk={async () => {
          setIsOpenDeleteDialog(false);
          await deleteServiceUserRecord(lastDataId);
          onSaveOrUpdateFinished();
        }}
        title='Delete Record'
        okText='Confirm'
        description='Are you sure you want to delete this record?'
      />
      <FlexBox sx={{ justifyContent: "flex-end" }}>
        <Button
          variant='contained'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New Record
        </Button>
      </FlexBox>
      <SmartModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        selectedValues={selectedRecord}
        defaultValues={defaultValues}
        isLoading={false}
        formTemplate={formTemplate}
        title={label}
        handleFormSubmit={async (values) => {
          const updatedValues = { ...values };
          await Promise.all(
            record.fields.map(async (field) => {
              if (
                (field.field_type === FieldTypeEnum.IMAGE ||
                  field.field_type === FieldTypeEnum.FILE) &&
                typeof values[field.label] !== "string"
              ) {
                const { data: fileUrl } = (await createFileUpload(
                  values[field.label],
                )) as any;
                updatedValues[field.label] = fileUrl;
              }
              if (field.field_type === FieldTypeEnum.CHECKBOX) {
                updatedValues[field.label] = updatedValues[field.label]
                  .map((v: boolean) => v.toString())
                  .join(",");
              }
            }),
          );

          if (!serviceUserId) {
            return;
          }

          if (selectedRecord) {
            await updateServiceUserRecord({
              service_user_record: Number(selectedRecord.id),
              values: record.fields.map((field) => ({
                record_field: field.id,
                value: updatedValues[field.label] ?? "",
                value_type: field.field_type ?? FieldTypeEnum.TEXT,
              })),
            });
            setSelectedRecord(null);
          } else {
            await createServiceUserRecord({
              service_user: Number(serviceUserId),
              record: recordId,
              values: record.fields.map((field) => ({
                record_field: field.id,
                value: updatedValues[field.label] ?? "",
                value_type: field.field_type ?? FieldTypeEnum.TEXT,
              })),
            });
          }
          onSaveOrUpdateFinished();
          setIsOpen(false);
        }}
      />
    </Column>
  );
};
