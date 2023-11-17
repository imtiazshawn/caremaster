import { headerClassName } from "@/shared/constants/table";
import { TableColumn } from "@common/Table";

import { CarePlanTableUnit } from "$types/carePlans";
import { formatDate } from "@/Utils";
import IconButton from "@common/IconButton";
import { Box, Row } from "@common/index";

export type ActionType = "edit" | "delete";

const getCarePlansColumns = (
  handleAction: (rowIndex: number, actionType: ActionType) => void,
): TableColumn<CarePlanTableUnit>[] => {
  return [
    {
      flex: 0.25,
      width: 200,
      field: "title",
      headerName: "Title",
      headerClassName,
    },
    {
      flex: 0.25,
      width: 230,
      field: "instruction",
      headerName: "Description",
      headerClassName,
      sortable: false,
    },
    {
      flex: 0.25,
      width: 230,
      field: "category",
      headerName: "Category",
      headerClassName,
      sortable: false,
    },
    {
      flex: 0.25,
      width: 230,
      field: "updated_at",
      headerName: "Modification Date",
      sortable: false,
      headerClassName,
      renderCell: (params) => {
        return (
          <Box sx={{ textAlign: "center" }}>
            {formatDate(params.row.updated_at ?? new Date())}
          </Box>
        );
      },
    },
    {
      width: 230,
      minWidth: 230,
      field: "action",
      headerName: "Action",
      headerClassName,
      sortable: false,
      renderCell: (params) => {
        const dataId = Number.parseInt(params.row.id.toString());
        return (
          <Row>
            <IconButton
              varient='edit'
              onClick={() => handleAction(dataId, "edit")}
            />
            <IconButton
              varient='delete'
              onClick={() => handleAction(dataId, "delete")}
            />
          </Row>
        );
      },
    },
  ];
};

export default getCarePlansColumns;
