import { headerClassName } from "@/shared/constants/table";
import { TableColumn } from "@common/Table";

import { Screening } from "$types/careWorkers";
import IconButton from "@common/IconButton";
import { H5 } from "@common/Typography";
import { Row } from "@common/index";

export type ActionType = "accept" | "remove";

// questionIds: string[],
// handleAction: (unique_id: string, actionType: ActionType) => void,
const getScreeningColumns = (): TableColumn<Screening>[] => {
  return [
    {
      flex: 0.25,
      width: 200,
      field: "name",
      headerName: "Name",
      headerClassName,
      renderCell: ({ row }) => {
        const picUrl = row.photo;

        return (
          <Row>
            {picUrl ? (
              <img
                src={picUrl}
                alt={row.user.name}
                width={40}
              />
            ) : null}
            <H5>{`${row.user.name}`}</H5>
          </Row>
        );
      },
    },
    {
      flex: 0.25,
      width: 200,
      field: "phone",
      headerName: "Mobile Number",
      headerClassName,
      sortable: false,
      renderCell: ({ row }) => {
        return <H5>{`${row.user.phone}`}</H5>;
      },
    },
    {
      flex: 0.25,
      width: 200,
      field: "email",
      headerName: "Email Address",
      headerClassName,
      sortable: false,
      renderCell: ({ row }) => {
        return <H5>{`${row.user.email}`}</H5>;
      },
    },
    {
      width: 100,
      field: "action",
      headerName: "Action",
      headerClassName,
      sortable: false,
      renderCell: () => {
        // const unique_id = params.row.id;
        return (
          <Row>
            <IconButton
              variant='check'
              onClick={(e) => {
                e.stopPropagation();
                // handleAction(unique_id, "accept");
              }}
            />
            <IconButton
              variant='close'
              onClick={(e) => {
                e.stopPropagation();
                // handleAction(unique_id, "remove");
              }}
            />
          </Row>
        );
      },
    },
  ];
};

export default getScreeningColumns;
