// TODO: We have to adapt this response for Failure! Obviously we will not get status="success" each and every time.
export type ApiResponse<TData> = {
  status: "success";
  response: {
    totalData: number;
    data: TData[];
    totalPage: number;
    previous: {
      page: number;
      limit: number;
    };
    next: {
      page: number;
      limit: number;
    };
  };
};
