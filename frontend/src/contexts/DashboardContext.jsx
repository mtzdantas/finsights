import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [arquivosData, setArquivosData] = useState(null);

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData, arquivosData, setArquivosData }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
