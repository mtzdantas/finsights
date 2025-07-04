import { ArrowRight, Zap, ShieldCheck, Globe, ChartArea} from "lucide-react";
import { NavLink } from "react-router-dom";
import CardService from '../components/CardServices';

export default function Home() {
  return (
    <>
      <section className="flex justify-between items-center h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-emerald-100 p-24 shadow-2xl">
        <div className="max-w-lg">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#243043] leading-tight">
            Transforme seus
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}dados{" "}
            </span>
            em decisões
          </h1>
          <p className="text-xl text-[#243043] leading-relaxed">
            A plataforma de inteligência financeira que revoluciona como você 
            analisa e interpreta seus dados empresariais.
          </p>
          <div className="my-12 flex justify-between">
            <a 
              href="#services" 
              className="flex items-center justify-center bg-gradient-to-r from-[#243043] to-[#13171d] hover:from-[#19212e] hover:to-[#141b29] text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              O que fazemos?
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#team" 
              className="border-2 border-slate-300 hover:border-slate-400 px-8 py-6 rounded-xl text-lg font-semibold transition-all duration-300 cursor-pointer">
              Conheça nossa equipe
            </a>
          </div>
        </div>
        {/* Image */}
      </section>

      <section id="services" className="flex flex-col bg-slate-100 p-24 text-center items-center justify-center text-[#243043]">
        <h1 className="text-5xl font-bold mb-4">Recursos que fazem a diferença</h1>
        <p className="text-xl mb-20">
          Tudo que você precisa para uma análise financeira completa e profissional.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          <CardService
            titulo="Dashboards Interativos"
            descricao="Explore uma visão completa e personalizável dos seus indicadores financeiros através de gráficos dinâmicos e intuitivos. Tome decisões com base em dados visuais em tempo real."
            icon={<ChartArea />}
          />

          <CardService
            titulo="Análises em Tempo Real"
            descricao="Receba insights automáticos e atualizados instantaneamente sobre receitas, despesas e desempenho de diferentes áreas do seu negócio, permitindo respostas ágeis e embasadas."
            icon={<Zap />}
          />

          <CardService
            titulo="Segurança Avançada"
            descricao="Garanta a proteção total dos seus dados com criptografia de alto nível, autenticação robusta e conformidade com as principais normas de segurança e privacidade."
            icon={<ShieldCheck />}
          />

          <CardService
            titulo="Acesso Global"
            descricao="Acompanhe e gerencie seus dados financeiros de qualquer lugar, a qualquer hora, com total responsividade em dispositivos móveis e ambiente desktop seguro e otimizado."
            icon={<Globe />}
          />
        </div>

        <NavLink
          to={"/dashboard"}
          key={"/dashboard"}
          title={"Dashboard"}
          className="flex items-center justify-center w-md bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
        >
          Comece Agora
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </NavLink>
      </section>
      <section id="team" className="h-screen bg-white p-24 shadow-2xl">
        <h1 className="w-fit pb-2 text-5xl font-bold text-[#243043]">Conheça nossa equipe</h1>
        <p className="w-fit text-xl font-semibold pb-2 mb-18 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Profissionais experientes dedicados a transformar<br/>o futuro das finanças corporativas.
        </p>
      </section>
      <footer className="h-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white flex items-center justify-center text-sm">
        &copy; {new Date().getFullYear()} FinSight. Todos os direitos reservados.
      </footer>
      {/* bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 */}
    </>
  );
}
