import { Button } from "@common/Button";
import { Search } from "@common/Search";
import { Table } from "@common/Table";
import { Typography } from "@mui/material";

import getRecordsColumns, { RecordsTableUnit } from "@/columns/column.records";
import { COLORS } from "@/shared/constants/colors";

import { RecordWithFields } from "$types/record";
import { FlexBox, FullColumn } from "@common/index";
import AddRecordModal from "@components/modals/AddRecordModal";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useDeleteRecordMutation } from "@reducers/api/records";
import { useRecords } from "@redux/hooks/useRecords";
import { useState } from "react";
import { ActionType } from "../columns/column.careWorkers";

export const Records = () => {
  const { records = [], isLoading, refetch } = useRecords();

  const [isOpenRecordModal, setIsOpenRecordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordWithFields | null>(
    null,
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteRecord] = useDeleteRecordMutation();

  const handleActionCallback = (dataId: number, actionType: ActionType) => {
    const record = records.find((record) => record.id === dataId);
    if (record) {
      setSelectedRecord({ ...record });
    }
    if (actionType === "edit") {
      setIsOpenRecordModal(true);
    } else if (actionType === "delete") {
      setIsOpenDeleteModal(true);
    }
  };

  const onCloseHandler = () => {
    setIsOpenRecordModal(false);
    refetch();
  };

  return (
    <FullColumn
      sx={{ background: COLORS.WHITE, p: 2, marginBottom: 2, width: "100%" }}
    >
      <AddRecordModal
        isOpen={isOpenRecordModal}
        onClose={onCloseHandler}
        record={selectedRecord}
      />
      <Typography
        variant='h5'
        sx={{ fontWeight: "bold" }}
      >
        Records
      </Typography>
      <FlexBox sx={{ height: "4em", gap: 2, justifyContent: "flex-end" }}>
        <Search
          sx={{
            borderRadius: ".5rem",
            width: "100%",
            maxWidth: "20rem",
          }}
        />
        <Button
          variant='contained'
          className='rounded-md'
          onClick={() => {
            setSelectedRecord(null);
            setIsOpenRecordModal(true);
          }}
        >
          Add New Record
        </Button>
      </FlexBox>
      <Table<RecordsTableUnit>
        rows={records}
        columns={getRecordsColumns(handleActionCallback)}
        isLoading={isLoading}
        sx={{ width: "100%" }}
      />
      <ConfirmationDialog
        title='Delete Record'
        description='Are you sure you want to delete this record?'
        isOpen={isOpenDeleteModal}
        onCancel={() => {
          setIsOpenDeleteModal(false);
        }}
        onOk={() => {
          deleteRecord(selectedRecord?.id ?? -1).then(() => {
            setIsOpenDeleteModal(false);
            refetch();
          });
        }}
      />
    </FullColumn>
  );
};
