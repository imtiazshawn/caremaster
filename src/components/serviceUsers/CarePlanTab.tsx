import { CarePlanTaskTableUnit } from "$types/carePlanTasks";
import getCarePlanTasksColumns, {
  ActionType,
} from "@/columns/column.carePlanTasks";
import { getCarePlanTaskTableData } from "@/pages/utils";
import IconButton from "@common/IconButton";
import { Table } from "@common/Table";
import { H4 } from "@common/Typography";
import { FlexBox, FullColumn } from "@common/index";
import UpsertCarePlanTaskModal from "@components/modals/UpsertCarePlanTaskModal";
import {
  useDeleteCarePlanTaskMutation,
  useGetCarePlanTasksQuery,
} from "@reducers/api/carePlanTasks";
import { useServiceUserId } from "@redux/hooks/useServiceUserId";
import { useState } from "react";

const CarePlanTaskTab = () => {
  const serviceUserId = useServiceUserId();
  const { data, isLoading, refetch } = useGetCarePlanTasksQuery(serviceUserId);
  const carePlanTasks: CarePlanTaskTableUnit[] = getCarePlanTaskTableData(
    data ?? [],
  );

  const [isOpenCarePlanTaskModal, setIsOpenCarePlanTaskModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deleteCarePlanTask] = useDeleteCarePlanTaskMutation();
  const handleActionCallback = (dataId: number, actionType: ActionType) => {
    const selectedCarePlanTaskIndex = carePlanTasks.findIndex(
      ({ id }) => id === dataId,
    ) as number;

    switch (actionType) {
      case "edit":
        setSelectedIndex(selectedCarePlanTaskIndex);
        setIsOpenCarePlanTaskModal(true);
        break;
      case "delete":
        deleteCarePlanTask(carePlanTasks[selectedCarePlanTaskIndex].id).then(
          () => {
            refetch();
          },
        );
        break;
      default:
        break;
    }
  };
  if (!serviceUserId) {
    return <></>;
  }
  const handleAddCarePlanTask = () => {
    setSelectedIndex(null);
    setIsOpenCarePlanTaskModal(true);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    setIsOpenCarePlanTaskModal(false);
  };

  return (
    <FullColumn sx={{ gap: "1em" }}>
      <UpsertCarePlanTaskModal
        refetch={refetch}
        initialCarePlanTask={
          selectedIndex !== null && data != undefined
            ? data[selectedIndex]
            : null
        }
        // @ts-ignore
        serviceUserId={serviceUserId}
        isOpen={isOpenCarePlanTaskModal}
        onClose={handleCloseModal}
      />
      <FlexBox sx={{ justifyContent: "space-between" }}>
        <H4>Planned Activity</H4>
        <FlexBox sx={{ gap: "0.5em" }}>
          <IconButton
            variant='add'
            onClick={handleAddCarePlanTask}
          />
          <IconButton variant='more-horizontal' />
        </FlexBox>
      </FlexBox>
      <Table<CarePlanTaskTableUnit>
        rows={carePlanTasks}
        columns={getCarePlanTasksColumns(handleActionCallback)}
        isLoading={isLoading}
        sx={{
          ".MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
            height: "3rem !important",
          },
          ".MuiDataGrid-columnHeaders": {
            height: "3rem !important",
            minHeight: "3rem !important",
          },
        }}
      />
    </FullColumn>
  );
};

export default CarePlanTaskTab;
