export type ProfileSectionProps<
  TData extends Record<string, unknown>,
  UData extends Record<string, unknown>,
> = {
  data: TData;
  isDataLoading: boolean;
  update: (value: UData) => Promise<unknown>;
  isUpdateLoading: boolean;
  refetch: () => Promise<unknown>;
  nextUrl: string;
};
