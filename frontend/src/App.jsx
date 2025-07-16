import { Routes, Route } from "react-router-dom";
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';
import { DashboardProvider } from "./contexts/DashboardContext";
import './index.css'
import Sidebar from './components/Sidebar';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Import from "./pages/Import";

function App() {
  return (
    <ToastProvider>
      <DashboardProvider>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto scroll-smooth">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/import" element={<Import />} />
            </Routes>
          </main>
        </div>
      </DashboardProvider>
      <ToastContainer />
    </ToastProvider>
  )
}

export default App
