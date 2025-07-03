import { Routes, Route } from "react-router-dom";
import './index.css'
import Sidebar from './components/Sidebar';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Import from "./pages/Import";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
