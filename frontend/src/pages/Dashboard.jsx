import { useEffect, useState } from "react";
import axios from "axios";
import { useDashboard } from "../contexts/DashboardContext";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { CalendarRange, ChartPie, TrendingUp, TrendingDown, CalendarCheck, Landmark, HandCoins, Loader} from 'lucide-react';
import CardStatus from '../components/CardStatus';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { dashboardData, setDashboardData, arquivosData, setArquivosData } = useDashboard();
  const [loading, setLoading] = useState(!dashboardData || !arquivosData);

  useEffect(() => {
    if (!dashboardData || !arquivosData) {
      Promise.all([
        axios.get(`${API_URL}/api/extrato/dashboard`),
        axios.get(`${API_URL}/api/extrato/arquivos`),
      ])
        .then(([dashRes, arqRes]) => {
          setDashboardData(dashRes.data);
          setArquivosData(arqRes.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados:", err);
          setLoading(false);
        });
    } else {
      // Já tem dados, só tira loading
      setLoading(false);
    }
  }, [API_URL, dashboardData, arquivosData, setDashboardData, setArquivosData]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-14 h-14 text-blue-600 animate-spin" />
      </div>
    );

  function detectarBanco(fileName) {
    if (fileName.toLowerCase().includes("nu_")) return "Nubank";
    if (fileName.toLowerCase().includes("extrato conta corrente")) return "Banco do Brasil";
    return "Outro";
  }

  const bancosUnicos = new Set(arquivosData.map((a) => detectarBanco(a.fileName)));
  const totalBancos = bancosUnicos.size;
  const totalTransacoes = arquivosData.reduce((acc, arquivo) => acc + arquivo.total_linhas, 0);

  const { total_entradas, total_saidas, categoria_gasto, resumo_por_mes } = dashboardData;

  const pieData = {
    labels: categoria_gasto.map((c) => c.categoria),
    datasets: [
      {
        data: categoria_gasto.map((c) => c.total),
        backgroundColor: ["#009969", "#0075D7", "#4000BF", "#FF006A", "#243043"],
      },
    ],
  };

  const barData = {
    labels: resumo_por_mes.map((m) => m.mes),
    datasets: [
      {
        label: "Entradas",
        data: resumo_por_mes.map((m) => m.entradas),
        backgroundColor: "#009969",
      },
      {
        label: "Saídas",
        data: resumo_por_mes.map((m) => m.saidas),
        backgroundColor: "#0075D7",
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 px-24 justify-center">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-bold text-[#243043]">Dashboard</h1>
        <p className="text-[#243043] text-lg">Visualize todos seus dados em um único lugar</p>
      </div>

      {/* Cards com os valores principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CardStatus
          titulo="Entradas"
          quantidade={total_entradas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
          icon={<TrendingUp className='text-emerald-500'/>}
          background="bg-emerald-50"
        />
        <CardStatus
          titulo="Saídas"
          quantidade={total_saidas.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })}
          icon={<TrendingDown className='text-red-500'/>}
          background="bg-red-50"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-6">
          {/* Barras - Resumo por mês */}
          <div className="flex flex-col h-fit bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <CalendarRange/>
              <h2 className="text-2xl font-semibold text-[#243043]">Resumo por Mês</h2>
            </div>
            <Bar data={barData} />
          </div>
          <CardStatus
            titulo={`${resumo_por_mes.length === 1 ? "Mês importado" : "Meses importados"}`}
            quantidade={resumo_por_mes.length}
            icon={<CalendarCheck className='text-blue-500'/>}
            background="bg-blue-50"
          />
        </div>

        {/* Pizza - Gastos por categoria */}
        <div className="flex flex-col bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ">
          <div className="flex items-center gap-2 mb-4">
            <ChartPie/>
            <h2 className="text-2xl font-semibold text-[#243043]">Gastos por Categoria</h2>
          </div>
          <Pie data={pieData} />
        </div>

        <div className="flex flex-col gap-6">
          <CardStatus
            titulo={`${totalTransacoes === 1 ? "Transação analisada" : "Transações analisadas"}`}
            quantidade={totalTransacoes}
            icon={<HandCoins className='text-amber-500'/>}
            background="bg-amber-50"
          />
          <CardStatus
            titulo={`${totalBancos === 1 ? "Banco acessado" : "Bancos acessados"}`}
            quantidade={totalBancos}
            icon={<Landmark className='text-purple-500'/>}
            background="bg-purple-50"
          />
        </div>
      </div>
    </div>
  );
}
