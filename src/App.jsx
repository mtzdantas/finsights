import { Routes, Route } from "react-router-dom";
import './index.css'
import Sidebar from './components/Sidebar';
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Import from "./screens/Import";

function Home() {
  return <div><h1 className="text-3xl font-bold">Home</h1><p>Conteúdo da Home</p></div>;
}

function Dashboard() {
  return <div><h1 className="text-3xl font-bold">Dashboard</h1><p>Conteúdo do Dashboard</p></div>;
}

function Import() {
  return <div><h1 className="text-3xl font-bold">Importar Dados</h1><p>Conteúdo da importação</p></div>;
}

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
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
