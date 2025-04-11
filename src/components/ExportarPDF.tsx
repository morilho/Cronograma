import React from 'react';
import { FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportarPDF: React.FC = () => {
  const handleExport = async () => {
    try {
      // Get the gantt container and ensure it exists
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

      // Store original scroll positions and styles
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

      // Configure html2canvas options
      const canvas = await html2canvas(ganttContainer as HTMLElement, {
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
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

      // Calculate PDF dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const aspectRatio = imgWidth / imgHeight;

      // Create PDF with appropriate dimensions
      let pdf;
      const maxPdfWidth = 297; // A4 landscape width in mm
      const maxPdfHeight = 210; // A4 landscape height in mm

      if (aspectRatio > maxPdfWidth / maxPdfHeight) {
        // If wider than tall, fit to width
        const pdfWidth = maxPdfWidth;
        const pdfHeight = pdfWidth / aspectRatio;
        pdf = new jsPDF('l', 'mm', [pdfWidth, pdfHeight]);
      } else {
        // If taller than wide, fit to height
        const pdfHeight = maxPdfHeight;
        const pdfWidth = pdfHeight * aspectRatio;
        pdf = new jsPDF('l', 'mm', [pdfWidth, pdfHeight]);
      }

      // Add the image to PDF with maximum quality
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

      // Save the PDF
      pdf.save('cronograma.pdf');
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Por favor, tente novamente.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#0046b7] hover:bg-[#0057e3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
    >
      <FileDown className="w-5 h-5 mr-2" />
      Exportar PDF
    </button>
  );
};

export default ExportarPDF;