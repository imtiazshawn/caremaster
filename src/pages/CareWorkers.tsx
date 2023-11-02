import { Button } from "@common/Button";
import { Table } from "@common/Table";
import { Text } from "@common/Typography";
import { FlexBox, FullColumn } from "@common/index";
import { GlobalSearch } from "@components/GlobalSearch";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";

import careWorkerColumns from "@/columns/column.careWorkers";
import { COLORS } from "@/shared/constants/colors";

import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import { useState } from "react";
import { getCareWorkersTableData } from "./utils";

export type ColumnWorkersTableUnit = {
  id: number | string;
  name: string;
  role: string;
  created_at: Date;
  date_of_birth: Date;
  phone: string;
  email: string;
  status: boolean | string;
};

export const CareWorkers = () => {
  const { data, isLoading } = useGetCareWorkersQuery(null);

  const careWorkers: ColumnWorkersTableUnit[] = getCareWorkersTableData(
    data?.response.data ?? [],
  );

  const [isOpenCareWorkerModal, setIsOpenCareWorkerModal] = useState(false);
  return (
    <FullColumn sx={{ background: COLORS.WHITE, p: 2, marginBottom: 2 }}>
      <AddCareWorkerModal
        isOpen={isOpenCareWorkerModal}
        onClose={() => setIsOpenCareWorkerModal(false)}
      />
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
          onClick={() => setIsOpenCareWorkerModal(true)}
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
