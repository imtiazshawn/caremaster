import {
  DataGrid,
  GridActionsColDef,
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
};

export function Table<TItem extends GridValidRowModel>({
  rows,
  columns,
  isLoading = false,
}: TableProps<TItem>) {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      loading={isLoading}
      sx={{
        width: "100%",
      }}
    />
  );
}
