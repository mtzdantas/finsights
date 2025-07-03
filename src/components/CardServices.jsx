const CardService = ({ titulo, descricao, icon }) => {
  return (
    <div className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300 mb-4 text-white">
        {icon }
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#243043]">{titulo}</h3>
      <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-6"></div>
      <p className="text-[#243043]">{descricao}</p>
    </div>
  );
};

export default CardService;