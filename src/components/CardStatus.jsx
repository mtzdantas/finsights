const CardStatus = ({ titulo, quantidade, icon, background }) => {
  return (
    <div className="bg-white/80 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center text-center">
      <div className={`w-16 h-16 ${background} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 text-white mr-4`}>
        {icon }
      </div>
      <p className="text-2xl font-bold text-[#243043] mr-2">{quantidade}</p>
      <h3 className="font-semibold text-[#243043]">{titulo}</h3>
    </div>
  );
};

export default CardStatus;