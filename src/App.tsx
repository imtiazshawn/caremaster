import "@/App.css";

import store from "@redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Apply } from "@/pages/Apply";
import { CareWorkers } from "@/pages/CareWorkers";
import EditCareWorkers from "@/pages/EditCareWorkers";
import { EditServiceUser } from "@/pages/EditServiceUser";
import { ServiceUsers } from "@/pages/ServiceUsers";
import { Settings } from "@/pages/Settings";
import ProvideReference from "@components/ProvideReference";
import Finished from "@components/apply/Finished";
import InitialForm from "@components/apply/InitialForm";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/DashBoard";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path=''
              element={<Dashboard />}
            />
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
              path='/care-worker/apply/*'
              element={<Apply />}
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
  );
}

export default App;
