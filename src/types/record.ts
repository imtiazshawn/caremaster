import { RecordField, RecordFieldDTO } from "$types/recordFields";

export type Record = {
  id: number;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
};

export type RecordDTO = Omit<Record, "id" | "created_at" | "updated_at">;

export type RecordWithFields = Record & {
  fields: RecordField[];
};

export type RecordWithFieldsDTO = RecordDTO & {
  fields: RecordFieldDTO[];
};
