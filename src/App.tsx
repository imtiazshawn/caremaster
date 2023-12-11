import "@/App.css";

import store from "@redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CareWorkers } from "@/pages/CareWorkers";
import EditCareWorkers from "@/pages/EditCareWorkers";
import { EditServiceUser } from "@/pages/EditServiceUser";
import { ServiceUsers } from "@/pages/ServiceUsers";
import { Settings } from "@/pages/SettingsOld";
import { Apply } from "@/pages/apply/Apply";
import { ApplicantScreening } from "@/pages/apply/Screening";
import V2EditCareWorkers from "@/pages/v2/CareWorkers";
import { v2Routes } from "@/v2/components/routers/routers";
import ProvideReference from "@components/ProvideReference";
import Finished from "@components/apply/Finished";
import InitialForm from "@components/apply/InitialForm";
import { ErrorFallbackComponent } from "@components/error/ErrorFallbackComponent";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/DashBoard";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              {...v2Routes}
              {/* <Route
                path=''
                element={<Dashboard />}
              /> */}
              <Route
                path='/dashboard'
                element={<Dashboard />}
              />
              <Route
                path='/service-users'
                element={<ServiceUsers />}
              />
              <Route
                path='/service-users/:id'
                element={<EditServiceUser />}
              />
              <Route
                path='/care-workers'
                element={<CareWorkers />}
              />
              <Route
                path='/settings'
                element={<Settings />}
              />
              <Route
                path='/care-workers/:id'
                element={<EditCareWorkers />}
              />
              <Route
                path='/v2/care-workers'
                element={<V2EditCareWorkers />}
              />
              <Route
                path='/care-worker/apply/*'
                element={<Apply />}
              />
              <Route
                path='/care-worker/screening/*'
                element={<ApplicantScreening />}
              />

              <Route
                path='/care-worker/apply/initiate'
                element={<InitialForm />}
              />
              <Route
                path='/care-worker/apply/finished'
                element={<Finished />}
              />
              <Route
                path='/care-worker/apply/reference-verification/*'
                element={<ProvideReference />}
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
