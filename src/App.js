import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientCreate from "./ClientCreate"
import ClientDashboard from "./ClientDashboard"
import ClientEdit from "./ClientEdit"

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientDashboard />}></Route>
          <Route path="/client/create" element={<ClientCreate />}></Route>
          <Route path="/client/edit/:id" element={<ClientEdit />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
