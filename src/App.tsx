import "@/App.css";

import { PageLayout } from "@components/PageLayout";
import store from "@redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/DashBoard";

function App() {
  return (
    <Provider store={store}>
      <PageLayout>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
      </PageLayout>
    </Provider>
  );
}

export default App;
