import { headerClassName } from "@/shared/constants/table";
import { TableColumn } from "@common/Table";

import { Applicant } from "$types/applicants";
import { getApplicationStatus } from "@/helper/apply";
import IconButton from "@common/IconButton";
import { H5 } from "@common/Typography";
import { Row } from "@common/index";

export type ActionType = "accept" | "remove";

const getAppliedColumns = (
  questionIds: string[],
  handleAction: (unique_id: string, actionType: ActionType) => void,
): TableColumn<Applicant>[] => {
  return [
    {
      flex: 0.25,
      width: 200,
      field: "first_name",
      headerName: "Name",
      headerClassName,
      renderCell: ({ row }) => {
        const picUrl = row.documents?.passport_size_photo;

        return (
          <Row sx={{ alignItems: "center" }}>
            {picUrl ? (
              <img
                src={picUrl}
                alt={row.first_name}
                width={30}
              />
            ) : null}
            <H5>{`${row.first_name} ${row.surname ?? ""}`}</H5>
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
    },
    {
      flex: 0.25,
      width: 200,
      field: "email",
      headerName: "Email Address",
      headerClassName,
      sortable: false,
    },
    {
      flex: 0.25,
      width: 230,
      field: "status",
      headerName: "Completed",
      headerClassName,
      sortable: true,
      renderCell: ({ row }) => {
        const { completedCount, total } = getApplicationStatus(
          row,
          questionIds,
        );

        const percentage = completedCount / total;
        let color = "bg-red-500";
        let width = "w-0";

        if (percentage == 1) {
          color = "bg-lime-600";
        } else if (percentage >= 0.2) {
          color = "bg-orange-500";
        }
        width = `w-${(24 * completedCount) / total}`;

        return (
          <Row>
            <H5>{`${completedCount}/${total}`}</H5>
            <div className='h4 w-24 border border-sky-500'>
              <div className={`h-full ${width} ${color}`}></div>
            </div>
          </Row>
        );
      },
    },
    {
      width: 100,
      field: "action",
      headerName: "Action",
      headerClassName,
      sortable: false,
      renderCell: (params) => {
        const unique_id = params.row.unique_id;
        return (
          <Row>
            <IconButton
              variant='check'
              onClick={(e) => {
                e.stopPropagation();
                handleAction(unique_id, "accept");
              }}
            />
            <IconButton
              variant='close'
              onClick={(e) => {
                e.stopPropagation();
                handleAction(unique_id, "remove");
              }}
            />
          </Row>
        );
      },
    },
  ];
};

export default getAppliedColumns;
