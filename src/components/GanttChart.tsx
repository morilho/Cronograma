import React, { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { Task } from '../types/Task';

interface GanttChartProps {
  tasks: Task[];
  onTaskUpdate?: (task: Task) => void;
  onTaskSelect?: (task: Task) => void;
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, onTaskUpdate, onTaskSelect }) => {
  const ganttContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ganttContainer.current) return;

    const initGantt = async () => {
      const ganttModule = await import('dhtmlx-gantt');
      const gantt = ganttModule.default;
      gantt.plugins({ export_api: true });
      
      // Basic configuration
      gantt.config.date_format = "%Y-%m-%d";
      gantt.config.drag_links = false;
      gantt.config.drag_progress = true;
      gantt.config.drag_resize = true;
      gantt.config.grid_width = 680;
      gantt.config.row_height = 45;
      gantt.config.min_column_width = 45;
      gantt.config.scale_height = 60;
      gantt.config.task_height = 30;
      gantt.config.font_width_ratio = 7;
      gantt.config.autosize = "y";
      gantt.config.fit_tasks = true;

      // Working time configuration
      gantt.config.work_time = true;
      gantt.config.skip_off_time = true;
      gantt.setWorkTime({ days: [1, 2, 3, 4, 5] });

      // Timeline scale configuration
      gantt.config.scales = [
        { unit: "month", step: 1, format: "%F %Y" },
        { unit: "day", step: 1, format: "%d %M" }
      ];
      
      gantt.config.scale_height = 50;
      gantt.config.subscales = [];

      // Ensure all dates are visible
      gantt.config.start_date = new Date(Math.min(...tasks.map(t => new Date(t.start_date).getTime())));
      gantt.config.end_date = new Date(Math.max(...tasks.map(t => new Date(t.end_date).getTime())));

      // Add padding to dates
      if (gantt.config.start_date && gantt.config.end_date) {
        const startDate = new Date(gantt.config.start_date);
        const endDate = new Date(gantt.config.end_date);
        
        startDate.setDate(startDate.getDate() - 5); // 1 day padding at start
        endDate.setDate(endDate.getDate() + 10); // 1 day padding at end
        
        gantt.config.start_date = startDate;
        gantt.config.end_date = endDate;
      }

      // Today marker
      const today = new Date();
      gantt.config.show_markers = true;
      if (gantt.addMarker) {
        const marker = gantt.addMarker({
          start_date: today,
          css: "today",
          text: "Hoje",
          title: "Hoje: " + today.toLocaleDateString()
        });
      }

      // Task styling
      gantt.templates.task_class = (start, end, task) => {
        if (task.completed) return "completed-task";
        if (end < today && !task.completed) return "late-task";
        return "";
      };

      // Custom styles
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .gantt_task_line {
          height: 28px !important;
          line-height: 28px !important;
          border-radius: 20px;
          cursor: pointer;
        }
        .gantt_task_line.completed-task {
          background-color: #22c55e;
        }
        .gantt_task_line.late-task {
          background-color: #ef4444;
        }
        .today {
          background: #0ea5e9;
          width: 2px;
        }
        .gantt_marker_content {
          color: #0ea5e9;
          font-weight: bold;
        }
        .gantt_task_content {
          font-size: 14px;
          font-weight: 500;
          padding: 0 8px;
        }
        .gantt_grid_data .gantt_cell {
          font-size: 14px;
          padding: 8px;
        }
        .gantt_grid_head_cell {
          font-weight: 600;
        }
        .gantt_grid {
          background: #fff;
          border-right: 1px solid #e5e7eb;
        }
        .gantt_scale_cell {
          font-weight: 500;
          color: #374151;
        }
        .gantt_scale_line {
          border-top: 1px solid #e5e7eb;
        }
        .gantt_task_scale .gantt_scale_cell {
          border-right: 1px solid #e5e7eb;
        }
        .gantt_grid_scale .gantt_grid_head_cell {
          color: #374151;
          font-weight: 600;
          padding: 8px;
        }
      `;
      document.head.appendChild(styleElement);

      // Grid columns
      gantt.config.columns = [
        { 
          name: "text", 
          label: "Tarefa", 
          tree: true, 
          width: 200,
      template: (task: Task) => {
  return `<span style="font-weight: 500; margin-left: 10px;">${task.text}</span>`;
}

        },
        { 
          name: "responsible", 
          label: "Responsável", 
          align: "left", 
          width: 120,
          template: (task: Task) => {
            return task.responsible || 'Não atribuído';
          }
        },
        {
          name: "start_date",
          label: "Data Início",
          align: "center",
          width: 120,
          template: (task: Task) => {
            return gantt.date.date_to_str("%d/%m/%Y")(task.start_date);
          }
        },
        {
          name: "end_date",
          label: "Data Fim",
          align: "center",
          width: 120,
          template: (task: Task) => {
            return gantt.date.date_to_str("%d/%m/%Y")(task.end_date);
          }
        },
        { 
          name: "completed", 
          label: "Concluída", 
          align: "center", 
          width: 80,
          template: (task: Task) => {
            return `<input type="checkbox" ${task.completed ? 'checked' : ''} onclick="event.stopPropagation(); window.toggleTaskCompletion(${task.id})" style="width: 16px; height: 16px;" />`;
          }
        }
      ];

      // Task click handler
      gantt.attachEvent("onTaskClick", (id: string | number) => {
        const task = gantt.getTask(id);
        onTaskSelect?.(task);
        return true;
      });

      // Task update event handler
      gantt.attachEvent("onAfterTaskUpdate", (id: string | number) => {
        const task = gantt.getTask(id);
        onTaskUpdate?.(task);
      });

      // Task completion handler
      (window as any).toggleTaskCompletion = (taskId: number) => {
        const task = gantt.getTask(taskId);
        task.completed = !task.completed;
        gantt.updateTask(taskId);
        onTaskUpdate?.(task);
      };

      // Task text template
      gantt.templates.task_text = (start: Date, end: Date, task: Task) => {
        return `<span style="padding: 0 8px; font-weight: 500;">${task.text} (${task.responsible || 'Não atribuído'})</span>`;
      };

      // Initialize gantt
      gantt.init(ganttContainer.current);

      
      (window as any).exportGanttToPNG = () => {
        gantt.config.autosize = "x";
        gantt.config.fit_tasks = true;
        gantt.render();
        gantt.setSizes();
        setTimeout(() => {
          gantt.exportToPNG({
            name: "cronograma.png",
            raw: true,
            merge_pages: true,
            landscape: true,
            format: "A4",
            zoom: 1
          });
        }, 1000);
      };

      (window as any).exportGanttToPDF = () => {
        gantt.config.autosize = "x";
        gantt.config.fit_tasks = true;
        gantt.render();
        gantt.setSizes();
        setTimeout(() => {
          gantt.exportToPDF({
            name: "cronograma.pdf",
            raw: true,
            merge_pages: true,
            landscape: true,
            format: "A4",
            zoom: 1
          });
        }, 1000);
      };


      
      (window as any).exportGanttToPNG = () => {
        gantt.config.fit_tasks = true;
        gantt.render();
        setTimeout(() => {
          gantt.exportToPNG({
            name: "cronograma.png",
            locale: "pt",
            raw: true,
            format: "A4",
            landscape: true,
            merge_pages: true,
            zoom: 1
          });
        }, 500);
      };

      (window as any).exportGanttToPDF = () => {
        gantt.config.fit_tasks = true;
        gantt.render();
        setTimeout(() => {
          gantt.exportToPDF({
            name: "cronograma.pdf",
            locale: "pt",
            raw: true,
            format: "A4",
            landscape: true,
            merge_pages: true,
            zoom: 1
          });
        }, 500);
      };


      
      (window as any).exportGanttToPNG = () => {
        gantt.exportToPNG({
          name: "cronograma.png",
          locale: "pt",
          raw: true,
          format: "A4",
          landscape: true,
          merge_pages: true,
          zoom: 1
        });
      };

      (window as any).exportGanttToPDF = () => {
        gantt.exportToPDF({
          name: "cronograma.pdf",
          locale: "pt",
          raw: true,
          format: "A4",
          landscape: true,
          merge_pages: true,
          zoom: 1
        });
      };


      
      (window as any).exportGanttToPDF = () => {
        gantt.exportToPDF({
          name: "cronograma.pdf",
          locale: "pt",
          format: "A4",
          landscape: true,
          header: "<style>body { font-family: Arial; }</style>"
        });
      };


      // Set initial dates if there are tasks
      if (tasks.length > 0) {
        const startDates = tasks.map(task => new Date(task.start_date).getTime());
        const endDates = tasks.map(task => new Date(task.end_date).getTime());
        const minDate = new Date(Math.min(...startDates));
        const maxDate = new Date(Math.max(...endDates));

        // Add padding to dates
        minDate.setDate(minDate.getDate() - 1);
        maxDate.setDate(maxDate.getDate() + 1);

        gantt.config.start_date = minDate;
        gantt.config.end_date = maxDate;
      }

      // Load data
      gantt.clearAll();
      gantt.parse({ data: tasks });

      // Update height on resize
      const updateHeight = () => {
        if (ganttContainer.current) {
          const windowHeight = window.innerHeight;
          const headerHeight = 200;
          const minHeight = 600;
          const newHeight = Math.max(windowHeight - headerHeight, minHeight);
          ganttContainer.current.style.height = `${newHeight}px`;
          gantt.setSizes();
        }
      };

      window.addEventListener('resize', updateHeight);
      updateHeight();

      return () => {
        window.removeEventListener('resize', updateHeight);
        styleElement.remove();
        gantt.clearAll();
      };
    };

    initGantt();
  }, [tasks, onTaskUpdate, onTaskSelect]);

  return (
    <div ref={ganttContainer} className="w-full" style={{ height: '700px' }} />
  );
};

export default GanttChart;
