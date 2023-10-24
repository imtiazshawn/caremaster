import "@/App.css";

import { PageLayout } from "@components/PageLayout";
import store from "@redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/DashBoard";

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
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
