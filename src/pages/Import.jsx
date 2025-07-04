import { useState } from 'react';
import CardStatus from '../components/CardStatus';
import {FileText, CircleCheckBig, CircleX, Download, Save, Trash} from 'lucide-react';
import Upload from '../components/Upload';

export default function Import() {
  const [fileInfo, setFileInfo] = useState(null); 
  const [arquivosSalvos, setArquivosSalvos] = useState([]);

  const handleFileParsed = (info) => {
    setFileInfo(info);
  };

  const salvarArquivo = () => {
    if (fileInfo) {
      setArquivosSalvos((prev) => [...prev, fileInfo]);
      setFileInfo(null);
    }
  };

  const removerArquivo = (index) => {
    setArquivosSalvos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-24 justify-center">
      <div className="flex flex-col gap-2 mb-12">
        <h1 className="text-4xl font-bold text-[#243043]">Importação de Dados</h1>
        <p className="text-[#243043] text-lg">Faça upload e gerencie seus arquivos CSV para análise</p>
      </div>

      <div className='grid grid-cols-3 lg:grid-cols-3 gap-2 mb-6'>
        <CardStatus
          titulo="Upload de arquivos"
          quantidade="201"
          icon={<FileText className='text-blue-500'/>}
          background='bg-blue-50'
        />
        <CardStatus
          titulo="Concluídos"
          quantidade="195"
          icon={<CircleCheckBig className='text-emerald-500'/>}
          background='bg-emerald-50'
        />
        <CardStatus
          titulo="Falhas no upload"
          quantidade="6"
          icon={<CircleX className='text-red-500'/>}
          background='bg-red-50'
        />
      </div>
      
      <div className='flex gap-6'>
        <div className='bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
          <div className='flex justify-between mb-6'>
            <div className='flex gap-2 items-center'>
              <Download/>
              <p className='text-2xl font-semibold text-[#243043]'>Novo Upload</p>
            </div>
            {fileInfo && (
              <button
                onClick={salvarArquivo}
                title="Salvar arquivo"
                className="flex items-center font-semibold gap-1 p-2 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
              >
                <Save size={20} />
              </button>
            )}
          </div>
          <Upload onFileParsed={handleFileParsed}/>
        </div>
        <div className='flex-1 bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
          <p className="text-2xl font-semibold text-[#243043] mb-4">Arquivos Salvos</p>
          {arquivosSalvos.length === 0 ? (
            <p className="text-gray-500">Nenhum arquivo salvo ainda.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {arquivosSalvos.map((arquivo, idx) => (
                <li 
                  key={idx} 
                  className="flex justify-between border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                >
                  <div>
                    <div className="font-semibold text-[#243043]">{arquivo.fileName}</div>
                    <div className="text-gray-600 text-xs">
                      {arquivo.data.length} linha{arquivo.data.length > 1 ? 's' : ''} • {arquivo.headers.length} coluna{arquivo.headers.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  <button
                    onClick={() => removerArquivo(idx)}
                    title="Remover arquivo"
                    className="p-2 rounded-full text-red-500 hover:bg-red-100 transition"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
