import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Zap, Brain, Globe, ChartArea} from "lucide-react";
import Lottie from "lottie-react";
import CardService from '../components/CardServices';
import CardEquipe from '../components/CardEquipe';

import animacaoCapa from "../assets/capaAnimation.json";
import mateusFoto from '../assets/perfilmateus.jpg';
import fabricioFoto from '../assets/perfilfabricio.gif';
import daniloFoto from '../assets/perfildanilo.jpg';

export default function Home() {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      const totalFrames = lottieRef.current.getDuration(true);
      const ateFrame = totalFrames * 0.6;
      lottieRef.current.playSegments([0, ateFrame], true);
    }
  }, []);

  return (
    <>
      <section className="flex justify-between items-center h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-emerald-100 p-24 shadow-2xl">
        <div className="max-w-lg">
          <h1 className="text-5xl lg:text-7xl font-bold text-[#243043] leading-tight">
            Transforme seus
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
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
        <Lottie
          lottieRef={lottieRef}
          animationData={animacaoCapa}
          loop={false}
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </section>

      <section id="services" className="flex flex-col bg-slate-100 px-24 h-screen text-center items-center justify-center text-[#243043]">
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
            titulo="Inteligência Artificial"
            descricao="Aproveite o poder da IA para identificar padrões e automatizar análises financeiras. Obtenha recomendações inteligentes que potencializam a tomada de decisões estratégicas."
            icon={<Brain />}
          />

          <CardService
            titulo="Análises em Tempo Real"
            descricao="Receba insights automáticos e atualizados instantaneamente sobre receitas, despesas e desempenho de diferentes áreas do seu negócio, permitindo respostas ágeis e embasadas."
            icon={<Zap />}
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

      <section id="team" className="flex flex-col h-screen bg-white text-[#243043] justify-center p-24">
        <h1 className="w-fit pb-2 text-4xl md:text-5xl font-bold text-[#243043]">
          Conheça nossa equipe 
        </h1>
        <p className="w-fit text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-24">
          Profissionais experientes dedicados a transformar<br />o futuro das finanças corporativas.
        </p>
        <div className="flex gap-12">
          <CardEquipe
            foto={mateusFoto}
            nome="Mateus Dantas"
            funcao="Full Stack Developer"
            bio="Desenvolvedor de Software com experiência como
              freelancer, atuando na criação de soluções inteligentes.
              Tenho paixão por resolver problemas com tecnologia e
              utilizo um conjunto diversificado de ferramentas e
              linguagens para entregar aplicações eficientes,
              escaláveis e bem estruturadas. Possuo familiaridade
              com todo o ciclo de desenvolvimento, do planejamento
              à implementação, e estou sempre em busca de novos
              conhecimentos e boas práticas para aprimorar a
              qualidade dos projetos."
            redes={{
              linkedin: "https://linkedin.com/in/mtzdantas",
              github: "https://github.com/mtzdantas",
              instagram: "https://instagram.com/mtzdantas"
            }}
          />
          
          <CardEquipe
            foto={daniloFoto}
            nome="Danilo Gabriel"
            funcao="AI Developer"
            bio="Danilo Gabriel de Medeiros Brito é estudante de Bacharelado em Sistemas de Informação pela Universidade Federal do Rio Grande do Norte (UFRN), campus Caicó. Aos 20 anos, já possui experiência com linguagens como Python, C, Dart (com Flutter) e desenvolvimento web. Tem interesse especial na área de Inteligência Artificial, com iniciativas envolvendo a criação de agentes inteligentes simples. Atualmente, dedica-se ao aprofundamento técnico e ao desenvolvimento de projetos na área."
            redes={{
              github: "https://github.com/DaniloMano",
            }}
          />

          <CardEquipe
            foto={fabricioFoto}
            nome="Fabrício Vale"
            funcao="Tech Leader"
            bio="Possui Graduação (2001), Mestrado (2005) e Doutorado (2018) em Ciência da Computação pela Universidade Federal de Campina Grande. Atualmente é professor da Universidade Federal do Rio Grande do Norte. Tem experiência profissional na área de desenvolvimento de software, tendo trabalhado para grandes empresas no exterior e no Brasil, e com pesquisa em computação aplicada à Educação, com ênfase em programação para dispositivos móveis. Atua também como músico, compositor, e roteirista/produtor/diretor audiovisual, integrando tecnologias e inteligência artificial fora do âmbito da computação em si."
            redes={{
              instagram: "https://instagram.com/fabriciovale79",
            }}
          />
        </div>
      </section>
      <footer className="w-full h-fit p-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white flex items-center justify-center text-sm">
        &copy; {new Date().getFullYear()} FinSight. Todos os direitos reservados.
      </footer>
    </>
  );
}
