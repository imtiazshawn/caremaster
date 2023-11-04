import "@/App.css";

import { PageLayout } from "@components/PageLayout";
import store from "@redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CareWorkers } from "@/pages/CareWorkers";
import EditCareWorkers from "@/pages/EditCareWorkers";
import { Settings } from "@/pages/Settings";
import { QueryClient, QueryClientProvider } from "react-query";
import { Dashboard } from "./pages/DashBoard";
import { EditServiceUser } from "./pages/EditServiceUser";
import { ServiceUsers } from "./pages/ServiceUsers";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route
                path='/'
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
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
