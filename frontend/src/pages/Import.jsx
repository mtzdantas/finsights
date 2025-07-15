import { useState } from 'react';
import CardStatus from '../components/CardStatus';
import {FileText, CircleCheckBig, CircleX, Download, Save, Trash, FolderCheck} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import Upload from '../components/Upload';

export default function Import() {
  const { addToast } = useToast();
  const [fileInfo, setFileInfo] = useState(null); 
  const [arquivosSalvos, setArquivosSalvos] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileParsed = (info) => {
    setFileInfo(info);
  };

  const salvarArquivo = async () => {
    if (!fileInfo || !fileInfo.data) return;
    try {
      const dadosParaEnviar = fileInfo.data.map((linha) => ({
        ...linha,
        arquivo_id: fileInfo.fileName,
      }));

      const response = await fetch(`${API_URL}/api/extrato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (response.ok) {
        setArquivosSalvos((prev) => [
          ...prev,
          { ...fileInfo, status: 'ok' }
        ]);
        setFileInfo(null);
        addToast('success', 'Arquivo CSV salvo com sucesso!');
      } else {
        throw new Error('Erro no envio para o backend');
      }
    } catch (error) {
      console.error(error);
      setArquivosSalvos((prev) => [
        ...prev,
        { ...fileInfo, status: 'erro' }
      ]);
      setFileInfo(null);
      addToast('error', 'Erro ao salvar o arquivo CSV!');
    }
  }; 

  const total = arquivosSalvos.length;
  const concluidos = arquivosSalvos.filter(a => a.status === 'ok').length;
  const erros = arquivosSalvos.filter(a => a.status === 'erro').length;

  const removerArquivo = async (index) => {
    const arquivoId = arquivosSalvos[index].fileName;
    try {
      await fetch(`${API_URL}/api/extrato/${arquivoId}`, {
        method: 'DELETE',
      });

      setArquivosSalvos((prev) => prev.filter((_, i) => i !== index));
      addToast('success', 'Arquivo removido com sucesso!');
    } catch (error) {
      console.error(error);
      addToast('error', 'Erro ao remover o arquivo.');
    }
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
          quantidade={total.toString()}
          icon={<FileText className='text-blue-500'/>}
          background='bg-blue-50'
        />
        <CardStatus
          titulo="Concluídos"
          quantidade={concluidos.toString()}
          icon={<CircleCheckBig className='text-emerald-500'/>}
          background='bg-emerald-50'
        />
        <CardStatus
          titulo="Falhas no upload"
          quantidade={erros.toString()}
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
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm font-medium text-emerald-600 truncate max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis"
                  title={fileInfo.fileName}
                >
                  {fileInfo.fileName}
                </span>
                <button
                  onClick={salvarArquivo}
                  title="Salvar arquivo"
                  className="flex items-center font-semibold gap-1 p-2 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
                >
                  <Save size={20} />
                </button>
              </div>
            )}
          </div>
          <Upload onFileParsed={handleFileParsed}/>
        </div>
        <div className='flex-1 bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
          <div className='flex items-center gap-2 mb-6'>
            <FolderCheck/>
            <p className="text-2xl font-semibold text-[#243043]">Arquivos Salvos</p>
          </div>
          {arquivosSalvos.length === 0 ? (
            <p className="text-gray-500">Nenhum arquivo salvo ainda.</p>
          ) : (
            <div className='max-h-64 overflow-y-auto pr-1'>
              <ul className="space-y-2 text-sm">
                {arquivosSalvos.map((arquivo, idx) => (
                  <li 
                  key={idx} 
                  className="flex justify-between border border-gray-200 rounded-lg p-3 bg-white shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-[#243043]">
                        {arquivo.fileName}
                        {arquivo.status === 'ok' ? (
                          <CircleCheckBig size={16} className="text-emerald-500" title="Importado com sucesso"/>
                        ) : (
                          <CircleX size={16} className="text-red-500" title="Erro na importação"/>
                        )}
                      </div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
