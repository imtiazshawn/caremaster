import { recordFieldsApi } from "@reducers/api/recordFields";
import { useAppDispatch } from "@redux/store";
import { useQuery } from "react-query";
import { RecordWithFields } from "../../types/record";
import { useGetRecordsQuery } from "../reducers/api/records";
export const useRecords = () => {
  const { data, isLoading, refetch } = useGetRecordsQuery(null);
  const dispatch = useAppDispatch();
  const { data: recordsWithFields, isLoading: isLoadingRecordsWithFields } =
    useQuery(
      `recordsWithFields${data?.map((record) => record.id).join(",")}`,
      async () => {
        if (!data) {
          return data;
        }
        return await Promise.all(
          data.map(async (record) => {
            const { data: fields = [] } = await dispatch(
              recordFieldsApi.endpoints.getRecordFields.initiate(record.id, {
                forceRefetch: true,
              }),
            );
            const recordWithFields: RecordWithFields = { ...record, fields };
            return recordWithFields;
          }),
        );
      },
      {
        enabled: true,
      },
    );
  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   Promise.all(
  //     data.map(async (record) => {
  //       const { data: fields = [] } = await dispatch(
  //         recordFieldsApi.endpoints.getRecordFields.initiate(record.id, {
  //           forceRefetch: true,
  //         }),
  //       );
  //       const recordWithFields: RecordWithFields = { ...record, fields };
  //       return recordWithFields;
  //     }),
  //   ).then((recordsWithFields) => {
  //     setRecords(recordsWithFields);
  //   });
  // }, [data, dispatch]);

  return {
    records: recordsWithFields,
    isLoading: isLoading || isLoadingRecordsWithFields,
    refetch,
  };
};
