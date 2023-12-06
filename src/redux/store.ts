import { acceptApplicantApi } from "@reducers/api/acceptApplicant";
import { applicantsApi } from "@reducers/api/applicants";
import { authApi } from "@reducers/api/authApi";
import { carePlanCategoriesApi } from "@reducers/api/carePlanCategories";
import { carePlanTasksApi } from "@reducers/api/carePlanTasks";
import { careWorkerQuestionsApi } from "@reducers/api/careWorkerQuestions";
import { careWorkersApi } from "@reducers/api/careWorkers";
import { eventsApi } from "@reducers/api/eventApi";
import { fileUploadApi } from "@reducers/api/fileUpload";
import { recordFieldsApi } from "@reducers/api/recordFields";
import { recordValuesApi } from "@reducers/api/recordValue";
import { recordsApi } from "@reducers/api/records";
import { serviceUserRecordsApi } from "@reducers/api/serviceUserRecords";
import { serviceUsersApi } from "@reducers/api/serviceUsers";
import { templateCategoriesApi } from "@reducers/api/templateCategories";
import { templateFieldsApi } from "@reducers/api/templateFields";
import { templateSectionsApi } from "@reducers/api/templateSections";
import { templateValuesApi } from "@reducers/api/templateValues";
import { templatesApi } from "@reducers/api/templates";
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
  [carePlanTasksApi.reducerPath]: carePlanTasksApi.reducer,
  [careWorkerQuestionsApi.reducerPath]: careWorkerQuestionsApi.reducer,
  [applicantsApi.reducerPath]: applicantsApi.reducer,
  [acceptApplicantApi.reducerPath]: acceptApplicantApi.reducer,
  [recordsApi.reducerPath]: recordsApi.reducer,
  [recordFieldsApi.reducerPath]: recordFieldsApi.reducer,
  [serviceUserRecordsApi.reducerPath]: serviceUserRecordsApi.reducer,
  [recordValuesApi.reducerPath]: recordValuesApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
  [templatesApi.reducerPath]: templatesApi.reducer,
  [templateSectionsApi.reducerPath]: templateSectionsApi.reducer,
  [templateFieldsApi.reducerPath]: templateFieldsApi.reducer,
  [templateCategoriesApi.reducerPath]: templateCategoriesApi.reducer,
  [templateValuesApi.reducerPath]: templateValuesApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      serviceUsersApi.middleware,
      careWorkersApi.middleware,
      carePlanCategoriesApi.middleware,
      carePlanTasksApi.middleware,
      careWorkerQuestionsApi.middleware,
      applicantsApi.middleware,
      acceptApplicantApi.middleware,
      recordsApi.middleware,
      recordFieldsApi.middleware,
      serviceUserRecordsApi.middleware,
      recordValuesApi.middleware,
      fileUploadApi.middleware,
      eventsApi.middleware,
      templatesApi.middleware,
      templateSectionsApi.middleware,
      templateFieldsApi.middleware,
      templateCategoriesApi.middleware,
      templateValuesApi.middleware,
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
