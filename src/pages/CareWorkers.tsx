import { Button } from "@common/Button";
import { Table } from "@common/Table";
import { Text } from "@common/Typography";
import { FlexBox, FullColumn } from "@common/index";
import { GlobalSearch } from "@components/GlobalSearch";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";

import { COLORS } from "@/shared/constants/colors";

import { CareWorkersTableUnit } from "$types/careWorkers";
import getCareWorkerColumns, { ActionType } from "@/columns/column.careWorkers";
import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCareWorkersTableData } from "./utils";

export const CareWorkers = () => {
  const { data, isLoading } = useGetCareWorkersQuery(null);
  const navigate = useNavigate();
  const careWorkers: CareWorkersTableUnit[] = getCareWorkersTableData(
    data ?? [],
  );

  const [isOpenCareWorkerModal, setIsOpenCareWorkerModal] = useState(false);

  const handleActionCallback = (dataId: string, actionType: ActionType) => {
    switch (actionType) {
      case "edit":
        navigate(`/care-workers/${dataId}`);
        break;
      case "delete":
        break;
      default:
        break;
    }
  };
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
      <Table<CareWorkersTableUnit>
        rows={careWorkers}
        columns={getCareWorkerColumns(handleActionCallback)}
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
