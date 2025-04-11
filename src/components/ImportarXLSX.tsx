import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Task } from '../types/Task';
import * as XLSX from 'xlsx';

interface ImportarXLSXProps {
  onImport: (tasks: Task[]) => void;
}

const ImportarXLSX: React.FC<ImportarXLSXProps> = ({ onImport }) => {
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const tasks: Task[] = jsonData.map((row: any, index) => ({
        id: index + 1,
        text: row.Task || `Tarefa ${index + 1}`,
        start_date: new Date(row.StartDate || Date.now()),
        end_date: new Date(row.EndDate || Date.now()),
        progress: parseFloat(row.Progress || 0),
        group: row.Group || 'Padrão',
        parent: row.Parent || 0,
        open: true
      }));

      onImport(tasks);
    } catch (error) {
      console.error('Erro ao importar arquivo:', error);
      alert('Erro ao importar arquivo. Por favor, verifique o formato do arquivo.');
    }
  }, [onImport]);

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <label className="flex flex-col items-center justify-center cursor-pointer group">
        <div className="w-16 h-16 bg-[#0046b7] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#0057e3] transition-colors duration-200">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <span className="text-lg font-medium text-gray-700 mb-2">Importar Cronograma</span>
        <span className="text-sm text-gray-500">Clique para fazer upload do arquivo XLSX</span>
        <input
          type="file"
          className="hidden"
          accept=".xlsx"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default ImportarXLSX;