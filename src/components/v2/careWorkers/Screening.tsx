import { Screening } from "$types/careWorkers";
import getScreeningColumns from "@/columns/column.careWorker.screening";
import { Table } from "@common/Table";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useNavigate } from "react-router-dom";

const ScreeningTab = () => {
  const { data: careWorkers, isLoading: isCareWorkersLoading } =
    useGetCareWorkersQuery(null);

  const navigate = useNavigate();
  return (
    <div>
      <Table<Screening>
        rows={careWorkers ?? []}
        columns={getScreeningColumns()}
        isLoading={isCareWorkersLoading}
        onRowClick={(row) => navigate(`/care-workers/${row.id}`)}
        initialPageSize={10}
      />
    </div>
  );
};

export default ScreeningTab;
