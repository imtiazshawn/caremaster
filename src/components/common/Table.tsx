import { SxProps } from "@mui/material";
import {
  DataGrid,
  GridActionsColDef,
  GridEventListener,
  GridSingleSelectColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { GridBaseColDef } from "@mui/x-data-grid/models/colDef/gridColDef";

export type TableColumn<R extends GridValidRowModel = any, V = any, F = V> =
  | GridBaseColDef<R, V, F>
  | GridActionsColDef<R, V, F>
  | GridSingleSelectColDef<R, V, F>;

export type TableProps<TItem extends GridValidRowModel> = {
  rows: TItem[];
  columns: TableColumn<TItem>[];
  isLoading?: boolean;
  sx?: SxProps;
  onRowClick?: GridEventListener<"rowClick"> | undefined;
  initialPageSize?: number;
};

export function Table<TItem extends GridValidRowModel>({
  rows,
  columns,
  isLoading = false,
  onRowClick,
  sx,
  initialPageSize = 5,
}: TableProps<TItem>) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      loading={isLoading}
      autoHeight
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: initialPageSize } },
      }}
      pageSizeOptions={[5, 10, 15, 25]}
      sx={{
        width: "100%",
        "& .MuiDataGrid-root, .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none",
          },
        ...sx,
      }}
      onRowClick={onRowClick}
    />
  );
}
