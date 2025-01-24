import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashbaord"; 
import Authentication from "./pages/Authentication"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/auth" element={<Authentication />}/>
      </Routes>
    </BrowserRouter>
  );
}
