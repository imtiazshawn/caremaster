import { authApi } from "@reducers/api/authApi";
import { carePlanCategoriesApi } from "@reducers/api/carePlanCategories";
import { carePlansApi } from "@reducers/api/carePlans";
import { careWorkersApi } from "@reducers/api/careWorkers";
import { fileUploadApi } from "@reducers/api/fileUpload";
import { recordFieldsApi } from "@reducers/api/recordFields";
import { recordValuesApi } from "@reducers/api/recordValue";
import { recordsApi } from "@reducers/api/records";
import { serviceUserRecordsApi } from "@reducers/api/serviceUserRecords";
import { serviceUsersApi } from "@reducers/api/serviceUsers";
import { authReducer } from "@reducers/authSlice";
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [serviceUsersApi.reducerPath]: serviceUsersApi.reducer,
  [careWorkersApi.reducerPath]: careWorkersApi.reducer,
  [carePlanCategoriesApi.reducerPath]: carePlanCategoriesApi.reducer,
  [carePlansApi.reducerPath]: carePlansApi.reducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
  [recordFieldsApi.reducerPath]: recordFieldsApi.reducer,
  [serviceUserRecordsApi.reducerPath]: serviceUserRecordsApi.reducer,
  [recordValuesApi.reducerPath]: recordValuesApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      serviceUsersApi.middleware,
      careWorkersApi.middleware,
      carePlanCategoriesApi.middleware,
      carePlansApi.middleware,
      recordsApi.middleware,
      recordFieldsApi.middleware,
      serviceUserRecordsApi.middleware,
      recordValuesApi.middleware,
      fileUploadApi.middleware,
    ]),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
