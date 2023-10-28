import { CustomFlexBox, FullColumn } from "@components/common";
import { Button } from "@components/common/Button";
import { Table } from "@components/common/Table";
import { Text } from "@components/common/Text";
import { GlobalSearch } from "@components/GlobalSearch";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";

import careWorkerColumns from "@/columns/column.careWorkers";
import { COLORS } from "@/shared/constants/colors";

import { getCareWorkersTableData } from "./utils";

export type ColumnWorkersTableUnit = {
  id: number | string;
  name: string;
  role: string;
  created_at: string;
  date_of_birth: string;
  mobile: string;
  status: boolean | string;
};

export const CareWorkers = () => {
  const { data, isLoading } = useGetCareWorkersQuery(null);

  const careWorkers: ColumnWorkersTableUnit[] = getCareWorkersTableData(
    data?.response.data ?? [],
  );

  return (
    <FullColumn
      sx={{ gap: 2, background: COLORS.WHITE, p: 2, marginBottom: 2 }}
    >
      <Text
        variant='h5'
        sx={{ fontWeight: "bold" }}
      >
        Care Workers
      </Text>
      <CustomFlexBox sx={{ height: "3em", gap: 2 }}>
        <GlobalSearch />
        <Button
          variant='contained'
          className='rounded-md'
        >
          Add New Care Worker
        </Button>
      </CustomFlexBox>
      <Table<ColumnWorkersTableUnit>
        rows={careWorkers}
        columns={careWorkerColumns}
        isLoading={isLoading}
      />
      <CustomFlexBox sx={{ gap: 2, justifyContent: "space-between" }}>
        <CustomFlexBox sx={{ gap: 2 }}>
          <Button variant='outlined'>Archive</Button>
        </CustomFlexBox>
        <CustomFlexBox sx={{ gap: 2 }}>
          <Button variant='contained'>Print</Button>
          <Button variant='contained'>Download Excel</Button>
        </CustomFlexBox>
      </CustomFlexBox>
    </FullColumn>
  );
};
