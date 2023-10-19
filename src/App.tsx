import "@/App.css";

import { TestRedux } from "@components/TestRedux";
import store from "@redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="text-gray-200">Starts here</div>
      <TestRedux />
    </Provider>
  );
}

export default App;
