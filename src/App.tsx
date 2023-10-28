import "@/App.css";

import { PageLayout } from "@components/PageLayout";
import store from "@redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/DashBoard";
import { ServiceUsers } from "./pages/ServiceUsers";

function App() {
  return (
    <Provider store={store}>
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
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
