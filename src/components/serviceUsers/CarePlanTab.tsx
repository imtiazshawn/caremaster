import { CarePlanTableUnit } from "$types/carePlans";
import getCarePlansColumns, { ActionType } from "@/columns/column.carePlans";
import { getCarePlanTableData } from "@/pages/utils";
import IconButton from "@common/IconButton";
import { Table } from "@common/Table";
import { H4 } from "@common/Typography";
import { FlexBox, FullColumn } from "@common/index";
import UpsertCarePlanModal from "@components/modals/UpsertCarePlanModal";
import {
  useDeleteCarePlanMutation,
  useGetCarePlansQuery,
} from "@reducers/api/carePlans";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CarePlanTab = () => {
  const { data, isLoading, refetch } = useGetCarePlansQuery(null);
  const { id: serviceUserId } = useParams<{ id: string }>();
  const carePlans: CarePlanTableUnit[] = getCarePlanTableData(data ?? []);

  const [isOpenCarePlanModal, setIsOpenCarePlanModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deleteCarePlan] = useDeleteCarePlanMutation();
  const handleActionCallback = (dataId: number, actionType: ActionType) => {
    const selectedCarePlanIndex = carePlans.findIndex(
      ({ id }) => id === dataId,
    ) as number;

    switch (actionType) {
      case "edit":
        setSelectedIndex(selectedCarePlanIndex);
        setIsOpenCarePlanModal(true);
        break;
      case "delete":
        deleteCarePlan(carePlans[selectedCarePlanIndex].id).then(() => {
          refetch();
        });
        break;
      default:
        break;
    }
  };
  if (!serviceUserId) {
    return <></>;
  }
  const handleAddCarePlan = () => {
    setSelectedIndex(null);
    setIsOpenCarePlanModal(true);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    setIsOpenCarePlanModal(false);
  };

  return (
    <FullColumn sx={{ gap: "1em" }}>
      <UpsertCarePlanModal
        refetch={refetch}
        initialCarePlan={
          selectedIndex !== null && data != undefined
            ? data[selectedIndex]
            : null
        }
        serviceUserId={serviceUserId}
        isOpen={isOpenCarePlanModal}
        onClose={handleCloseModal}
      />
      <FlexBox sx={{ justifyContent: "space-between" }}>
        <H4>Planned Activity</H4>
        <FlexBox sx={{ gap: "0.5em" }}>
          <IconButton
            varient='add'
            onClick={handleAddCarePlan}
          />
          <IconButton varient='more-horizontal' />
        </FlexBox>
      </FlexBox>
      <Table<CarePlanTableUnit>
        rows={carePlans}
        columns={getCarePlansColumns(handleActionCallback)}
        isLoading={isLoading}
      />
    </FullColumn>
  );
};

export default CarePlanTab;
