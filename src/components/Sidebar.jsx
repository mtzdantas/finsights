import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TrendingUp, Home, FileUp, ChartNoAxesCombined, ChevronLeft, ChevronRight } from "lucide-react";

const menuItems = [
  { name: "Home", icon: Home, key: "/", path: "/" },
  { name: "Dashboards", icon: ChartNoAxesCombined, key: "/dashboard", path: "/dashboard" },
  { name: "Importar dados", icon: FileUp, key: "/import", path: "/import" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="fixed flex">
        <div className={`h-screen bg-white text-[#243043] flex flex-col p-4 overflow-hidden transition-[width] duration-400 ease-in-out shadow-lg ${isOpen ? 'w-68' : 'w-18'}`}>
          <div className="flex items-center gap-3 border-b border-gray-300 pb-4 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp 
                size={20}
                className="w-6 h-6 text-white"
              />
            </div>
            {isOpen && (
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">FinSight</h2>
                <p className="text-xs text-slate-500 font-medium">Inteligência Financeira</p>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-4">
            {menuItems.map(({ icon: Icon, ...item }) => (
              <NavLink
                to={item.path}
                key={item.key}
                title={isOpen ? undefined : item.name}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded transition-colors ${
                    isActive ? "bg-[#243043] text-white" : "hover:bg-gray-200 text-[#243043]"
                  } ${isOpen ? "justify-start" : "justify-center"}`
                }
              >
                <Icon size={20}/>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute
              top-1/2
              -right-4
              transform
              -translate-y-1/2
              bg-white
              border
              border-gray-300
              rounded-full
              p-1
              shadow-md
              hover:bg-gray-100
              focus:outline-none
              focus:ring-2
              transition
              z-10
            `}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
      <div className={`w-${isOpen ? '68' : '18'} transition-all duration-400 ease-in-out`}>
        
      </div>
    </>
  );
}
