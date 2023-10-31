import { Button } from "@common/Button";
import { Table } from "@common/Table";
import { Text } from "@common/Typography";
import { FlexBox, FullColumn } from "@common/index";
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
    <FullColumn sx={{ background: COLORS.WHITE, p: 2, marginBottom: 2 }}>
      <Text
        variant='h5'
        sx={{ fontWeight: "bold" }}
      >
        Care Workers
      </Text>
      <FlexBox sx={{ height: "3em", gap: 2 }}>
        <GlobalSearch />
        <Button
          variant='contained'
          className='rounded-md'
        >
          Add New Care Worker
        </Button>
      </FlexBox>
      <Table<ColumnWorkersTableUnit>
        rows={careWorkers}
        columns={careWorkerColumns}
        isLoading={isLoading}
      />
      <FlexBox sx={{ justifyContent: "space-between" }}>
        <FlexBox>
          <Button variant='outlined'>Archive</Button>
        </FlexBox>
        <FlexBox>
          <Button variant='contained'>Print</Button>
          <Button variant='contained'>Download Excel</Button>
        </FlexBox>
      </FlexBox>
    </FullColumn>
  );
};
