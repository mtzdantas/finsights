import { useState, useRef } from 'react';
import Papa from 'papaparse';
import { useToast } from '../hooks/useToast';
import {Paperclip} from 'lucide-react';

const Upload = ({ onFileParsed }) => {
  const { addToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      addToast('error', 'Por favor, envie um arquivo .csv');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {   
        onFileParsed({
          fileName: file.name,
          data: results.data,
          headers: results.meta.fields || [],
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
          <Paperclip
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
      </div>
    </div>
  );
};

export default Upload;