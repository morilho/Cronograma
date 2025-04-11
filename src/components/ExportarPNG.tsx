import React from 'react';
import { Image } from 'lucide-react';
import html2canvas from 'html2canvas';

const ExportarPNG: React.FC = () => {
  const handleExport = async () => {
    try {
      const ganttContainer = document.querySelector('.gantt_container');
      if (!ganttContainer) {
        throw new Error('Elemento do Gantt não encontrado');
      }

      // Get the grid and task area elements
      const gridArea = document.querySelector('.gantt_grid') as HTMLElement;
      const taskArea = document.querySelector('.gantt_task') as HTMLElement;
      
      if (!gridArea || !taskArea) {
        throw new Error('Elementos do Gantt não encontrados');
      }

      // Store original states
      const originalGridScroll = gridArea.scrollTop;
      const originalTaskScroll = taskArea.scrollLeft;
      const originalContainerStyle = (ganttContainer as HTMLElement).style.cssText;
      const originalGridStyle = gridArea.style.cssText;
      const originalTaskStyle = taskArea.style.cssText;

      // Calculate total dimensions
      const totalWidth = gridArea.scrollWidth + taskArea.scrollWidth;
      const totalHeight = Math.max(
        ganttContainer.scrollHeight,
        gridArea.scrollHeight,
        taskArea.scrollHeight
      );

      // Set temporary styles for capture
      (ganttContainer as HTMLElement).style.width = `${totalWidth}px`;
      (ganttContainer as HTMLElement).style.height = `${totalHeight}px`;
      gridArea.style.height = `${totalHeight}px`;
      taskArea.style.height = `${totalHeight}px`;
      taskArea.style.width = `${taskArea.scrollWidth}px`;

      // Reset scroll positions
      gridArea.scrollTop = 0;
      taskArea.scrollLeft = 0;

      // Configure html2canvas with higher quality settings
      const canvas = await html2canvas(ganttContainer as HTMLElement, {
        scale: 3, // Higher resolution for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: totalWidth,
        height: totalHeight,
        windowWidth: totalWidth,
        windowHeight: totalHeight,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector('.gantt_container') as HTMLElement;
          const clonedGrid = clonedDoc.querySelector('.gantt_grid') as HTMLElement;
          const clonedTask = clonedDoc.querySelector('.gantt_task') as HTMLElement;
          
          if (clonedContainer && clonedGrid && clonedTask) {
            clonedContainer.style.width = `${totalWidth}px`;
            clonedContainer.style.height = `${totalHeight}px`;
            clonedGrid.style.height = `${totalHeight}px`;
            clonedTask.style.height = `${totalHeight}px`;
            clonedTask.style.width = `${taskArea.scrollWidth}px`;
            
            // Ensure all content is visible
            clonedGrid.style.overflow = 'visible';
            clonedTask.style.overflow = 'visible';
            clonedContainer.style.overflow = 'visible';
            
            // Remove any transform styles that might affect rendering
            clonedContainer.style.transform = 'none';
            clonedGrid.style.transform = 'none';
            clonedTask.style.transform = 'none';
          }
        }
      });

      // Restore original styles and scroll positions
      (ganttContainer as HTMLElement).style.cssText = originalContainerStyle;
      gridArea.style.cssText = originalGridStyle;
      taskArea.style.cssText = originalTaskStyle;
      gridArea.scrollTop = originalGridScroll;
      taskArea.scrollLeft = originalTaskScroll;

      // Create download link
      const link = document.createElement('a');
      link.download = 'cronograma.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erro ao exportar PNG:', error);
      alert('Erro ao exportar PNG. Por favor, tente novamente.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#0046b7] hover:bg-[#0057e3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
    >
      <Image className="w-5 h-5 mr-2" />
      Exportar PNG
    </button>
  );
};

export default ExportarPNG;