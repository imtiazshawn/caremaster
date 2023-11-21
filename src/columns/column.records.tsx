import { ActionType } from "@/columns/column.careWorkers";
import { headerClassName } from "@/shared/constants/table";
import IconButton from "@common/IconButton";
import { TableColumn } from "@common/Table";
import { Row } from "@common/index";

export type RecordsTableUnit = {
  id: number;
  name: string;
  description?: string;
  is_active?: boolean;
};

const getRecordsColumns = (
  handleAction: (dataId: number, actionType: ActionType) => void,
): TableColumn<RecordsTableUnit>[] => {
  return [
    {
      flex: 0.25,
      width: 200,
      field: "name",
      headerName: "Name",
      headerClassName,
    },
    {
      flex: 0.25,
      width: 230,
      field: "description",
      headerName: "Description",
      headerClassName,
      sortable: false,
    },
    {
      flex: 0.25,
      width: 230,
      field: "is_active",
      headerName: "Active",
      headerClassName,
      sortable: false,
      type: "boolean",
    },
    {
      maxWidth: 230,
      field: "action",
      headerName: "Action",
      headerClassName,
      sortable: false,
      renderCell: (params) => {
        const dataId = params.row.id;
        return (
          <Row>
            <IconButton
              variant='edit'
              onClick={() => handleAction(dataId, "edit")}
            />
            <IconButton
              variant='delete'
              onClick={() => handleAction(dataId, "delete")}
            />
          </Row>
        );
      },
    },
  ];
};

export default getRecordsColumns;
