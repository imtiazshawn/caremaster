import { recordFieldsApi } from "@reducers/api/recordFields";
import { useAppDispatch } from "@redux/store";
import { useEffect, useState } from "react";
import { RecordWithFields } from "../../types/record";
import { useGetRecordsQuery } from "../reducers/api/records";
export const useRecords = () => {
  const { data, isLoading, refetch } = useGetRecordsQuery(null);
  const [records, setRecords] = useState<RecordWithFields[] | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!data) {
      return;
    }
    Promise.all(
      data.map(async (record) => {
        const { data: fields = [] } = await dispatch(
          recordFieldsApi.endpoints.getRecordFields.initiate(record.id, {
            forceRefetch: true,
          }),
        );
        const recordWithFields: RecordWithFields = { ...record, fields };
        return recordWithFields;
      }),
    ).then((recordsWithFields) => {
      setRecords(recordsWithFields);
    });
  }, [data, dispatch]);

  return { records: records ?? [], isLoading: isLoading || !records, refetch };
};
