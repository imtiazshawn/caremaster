import { Button } from "@common/Button";
import { Search } from "@common/Search";
import { Table } from "@common/Table";
import { Text } from "@common/Typography";
import { FlexBox, FullColumn } from "@common/index";
import {
  useDeleteCareWorkerMutation,
  useGetCareWorkersQuery,
} from "@reducers/api/careWorkers";

import { COLORS } from "@/shared/constants/colors";

import { CareWorkersTableUnit } from "$types/careWorkers";
import getCareWorkerColumns, { ActionType } from "@/columns/column.careWorkers";
import { PageLayout } from "@components/layout/PageLayout";
import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCareWorkersTableData } from "./utils";

export const CareWorkers = () => {
  const { data, isLoading, refetch } = useGetCareWorkersQuery(null);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const careWorkers: CareWorkersTableUnit[] = getCareWorkersTableData(
    data ?? [],
  );
  const [selectedCareWorkerId, setSelectedCareWorkerId] = useState<string>("");
  const [deleteCareWorker] = useDeleteCareWorkerMutation();

  const [isOpenCareWorkerModal, setIsOpenCareWorkerModal] = useState(false);

  const handleActionCallback = (dataId: string, actionType: ActionType) => {
    switch (actionType) {
      case "edit":
        navigate(`/care-workers/${dataId}`);
        break;
      case "delete":
        setSelectedCareWorkerId(dataId);
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const filteredCareWorkers = careWorkers.filter((careWorker) => {
    const searchKeyLowerCase = searchKey.toLowerCase();
    return JSON.stringify(careWorker)
      .toLowerCase()
      .includes(searchKeyLowerCase);
  });

  return (
    <PageLayout>
      <FullColumn sx={{ background: COLORS.WHITE, p: 2, marginBottom: 2 }}>
        <AddCareWorkerModal
          isOpen={isOpenCareWorkerModal}
          onClose={() => setIsOpenCareWorkerModal(false)}
        />
        <ConfirmationDialog
          isOpen={showDeleteModal}
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onOk={async () => {
            setShowDeleteModal(false);
            await deleteCareWorker(selectedCareWorkerId);
            refetch();
          }}
          title='Delete Care Worker'
          description='Are you sure you want to delete this care worker?'
        />
        <Text
          variant='h5'
          sx={{ fontWeight: "bold" }}
        >
          Care Workers
        </Text>
        <FlexBox sx={{ height: "3em", gap: 2 }}>
          <Search
            onChange={(value) => {
              setSearchKey(value);
            }}
            sx={{
              maxWidth: "300px",
            }}
          />
          <Button
            variant='contained'
            className='rounded-md'
            onClick={() => setIsOpenCareWorkerModal(true)}
          >
            Add Care Worker
          </Button>
        </FlexBox>
        <Table<CareWorkersTableUnit>
          rows={filteredCareWorkers}
          columns={getCareWorkerColumns(handleActionCallback)}
          isLoading={isLoading}
          sx={{
            overflow: "auto",
          }}
          onRowClick={(row) => navigate(`/care-workers/${row.id}`)}
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
    </PageLayout>
  );
};
