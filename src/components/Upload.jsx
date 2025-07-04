import { useState, useRef } from 'react';
import Papa from 'papaparse';
import { useToast } from '../hooks/useToast';
import {FileChartColumn, Paperclip} from 'lucide-react';

const Upload = ({ onFileParsed }) => {
  const { addToast } = useToast();
  const [fileName, setFileName] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      addToast('error', 'Por favor, envie um arquivo .csv');
      return;
    }

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data;
        const fields = results.meta.fields || [];

        setParsedData(parsed);
        setHeaders(fields);

        onFileParsed({
          fileName: file.name,
          data: parsed,
          headers: fields,
        });
      },
      error: (err) => {
        console.error('Erro ao ler o CSV:', err);
        addToast('error', 'Erro ao ler o arquivo CSV.');
      },
    });
  };

  const handleInputChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
      onClick={() => inputRef.current.click()}
      className={`p-16 border-2 border-dashed rounded-lg text-center mx-auto cursor-pointer transition-colors duration-300 ${
        isDragging
          ? 'border-blue-400 bg-blue-50'
          : 'border-gray-300 hover:bg-gray-50'
      }`}
    >
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center text-center text-[#243043] text-lg">
        <div 
          className={`flex w-16 h-16 items-center justify-center rounded-2xl mb-2 transition-colors duration-300 ${
            isDragging ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <FileChartColumn 
            size={30} 
            className={`transition-colors duration-300 ${
              isDragging ? 'text-blue-600' : 'text-[#243043]'
            }`}
          />
        </div>
        
        <span
          className={`font-semibold transition-colors duration-300 ${
            isDragging ? 'text-blue-600' : 'text-[#243043]'
          }`}
        >
          Arraste e solte um arquivo CSV aqui
        </span>
        <span
          className={`transition-colors duration-300 ${
            isDragging ? 'text-blue-500' : 'text-gray-600'
          }`}
        >
          ou clique para selecionar
        </span>

        {fileName && parsedData.length > 0 && (
          <div className="mt-6 flex items-center gap-4 border border-gray-200 bg-white p-4 rounded-lg shadow-sm max-w-md mx-auto">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <Paperclip size={24} />
            </div>
            <div className="text-sm text-[#243043]">
              <p className="font-semibold">{fileName}</p>
              <p className="text-xs text-gray-600">
                {parsedData.length} linha{parsedData.length > 1 ? 's' : ''} • {headers.length} coluna{headers.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;