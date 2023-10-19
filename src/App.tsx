import "@/App.css";
import { Provider } from "react-redux";
import store from "@redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="text-gray-200">Starts here</div>
    </Provider>
  );
}

export default App;
