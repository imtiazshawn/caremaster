import { Record } from "$types/record";
import { FieldTypeEnum } from "$types/recordFields";

type ServiceUser = {
  id: number;
  name: string;
};

type RecordValue = {
  id: number;
  value: string;
  value_type: string;
  record: number;
  record_field: number;
};

type ServiceUserRecordValues = RecordValue & {
  field_label: string;
  created_at: Date;
  updated_at: Date;
};

export type ServiceUserRecords = {
  id: number;
  service_user: ServiceUser;
  record: Omit<Record, "is_active">;
  values: ServiceUserRecordValues[];
};

export type RecordValueCreate = {
  record_field: number;
  value: string;
  value_type: string;
};

export type CreateServiceUserRecord = {
  service_user: number;
  record: number;
  values: RecordValueCreate[];
};

export type UpdateRecordValue = {
  id: number;
  value: string;
  value_type: FieldTypeEnum;
  record: number;
  record_field: number;
};
