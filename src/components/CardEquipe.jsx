import { useState } from "react";
import { Github, Instagram, Linkedin } from "lucide-react";

const CardEquipe = ({ foto, nome, funcao, bio, redes }) => {
  const [virado, setVirado] = useState(false);

  const primeiroNome = nome.split(" ")[0];
  const restanteNome = nome.split(" ").slice(1).join(" ");

  return (
    <div className="w-70 max-w-xs h-[400px] perspective">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          virado ? "rotate-y-180" : ""
        }`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full bg-gradient-to-b from-blue-500 to-emerald-500 rounded-xl shadow-lg hover:shadow-2xl backface-hidden flex flex-col items-center justify-between p-6 transition-all duration-300">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <img
                src={foto}
                alt={`${nome}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-center text-white">
              <h2 className="text-xl font-semibold">
                <span className="font-bold">{primeiroNome}</span> {restanteNome}
              </h2>
              <p className="text-sm italic">{funcao}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center gap-4 mt-4 text-white text-xl">
              {redes.linkedin && (
                <a
                  href={redes.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Linkedin />
                </a>
              )}
              {redes.github && (
                <a
                  href={redes.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Github />
                </a>
              )}
              {redes.instagram && (
                <a
                  href={redes.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Instagram />
                </a>
              )}
            </div>

            <button
              onClick={() => setVirado(true)}
              className="mt-4 w-full bg-white text-blue-700 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Ver mais
            </button>
          </div>
        </div>

        {/* Verso */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg hover:shadow-2xl backface-hidden rotate-y-180 flex flex-col justify-between p-6 transition-all duration-300">
          <div className="overflow-y-auto max-h-[240px] pr-1">
            <h3 className="text-lg font-bold text-[#243043] mb-2">Biografia</h3>
            <p className="text-sm text-gray-700">{bio}</p>
          </div>
          <button
            onClick={() => setVirado(false)}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full mt-4 w-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEquipe;