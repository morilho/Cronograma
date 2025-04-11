import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { Task } from '../types/Task';
import * as XLSX from 'xlsx';

interface ExportarXLSXProps {
  data: Task[];
}

const ExportarXLSX: React.FC<ExportarXLSXProps> = ({ data }) => {
  const handleExport = async () => {
    try {
      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      
      // Transform data for export
      const exportData = [
        // Header row
        ['Task', 'StartDate', 'EndDate', 'Progress', 'Group', 'Parent'],
        // Data rows
        ...data.map(task => [
          task.text,
          task.start_date.toISOString().split('T')[0],
          task.end_date.toISOString().split('T')[0],
          task.progress || 0,
          task.group || 'Default',
          task.parent || 0
        ])
      ];

      // Create worksheet from data
      const worksheet = XLSX.utils.aoa_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 30 }, // Task
        { wch: 15 }, // StartDate
        { wch: 15 }, // EndDate
        { wch: 10 }, // Progress
        { wch: 15 }, // Group
        { wch: 10 }  // Parent
      ];
      worksheet['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');

      // Generate and download file
      XLSX.writeFile(workbook, 'cronograma.xlsx');
    } catch (error) {
      console.error('Erro ao exportar arquivo:', error);
      alert('Erro ao exportar arquivo. Por favor, tente novamente.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <FileSpreadsheet className="w-5 h-5 mr-2" />
      Exportar para Excel
    </button>
  );
};

export default ExportarXLSX;