import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileSpreadsheet, Plus, BookTemplate } from 'lucide-react';
import GanttChart from './components/GanttChart';
import ImportarXLSX from './components/ImportarXLSX';
import ExportarXLSX from './components/ExportarXLSX';
import ExportarPDF from './components/ExportarPDF';
import ExportarPNG from './components/ExportarPNG';
import ModelosCronograma from './components/ModelosCronograma';
import TaskDetails from './components/TaskDetails';
import { Task } from './types/Task';
import { addWorkingDays } from './utils/dateUtils';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<'import' | 'gantt'>('import');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    text: '',
    responsible: '',
    start_date: new Date().toISOString().split('T')[0],
    duration: 1,
    completed: false
  });

  const handleImport = (importedTasks: Task[]) => {
    setTasks(importedTasks);
    setView('gantt');
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskDelete = (taskId: string | number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setSelectedTask(null);
  };

  const handleNewProject = () => {
    const today = new Date();
    const tomorrow = addWorkingDays(today, 1);

    const initialTask: Task = {
      id: 1,
      text: "Nova Tarefa",
      start_date: today,
      end_date: tomorrow,
      progress: 0,
      responsible: '',
      completed: false,
      open: true
    };

    setTasks([initialTask]);
    setView('gantt');
  };

  const handleTemplateSelect = (templateTasks: Task[]) => {
    setTasks(templateTasks);
    setShowTemplates(false);
    setView('gantt');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDate = new Date(newTask.start_date);
    const endDate = addWorkingDays(startDate, parseInt(newTask.duration.toString()));

    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask.text,
      start_date: startDate,
      end_date: endDate,
      progress: 0,
      responsible: newTask.responsible,
      completed: false,
      open: true
    };

    setTasks(prev => [...prev, newTaskObj]);
    setShowNewTaskForm(false);
    setNewTask({
      text: '',
      responsible: '',
      start_date: new Date().toISOString().split('T')[0],
      duration: 1,
      completed: false
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="bg-gradient-to-r from-[#0046b7] to-[#0057e3] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=3276&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6">
              <Calendar className="w-10 h-10 text-[#0046b7]" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Gerador de Cronograma</h1>
            <p className="mt-2 text-lg text-blue-100 max-w-2xl">
              Crie e gerencie seus cronogramas de projeto de forma simples e eficiente
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#f8fafc]"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        {view === 'import' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="mt-8">
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={handleNewProject}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-[#0046b7] hover:bg-[#0057e3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Novo Cronograma
                </button>
                <button
                  onClick={() => setShowTemplates(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-[#00875a] hover:bg-[#006c48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  <BookTemplate className="w-5 h-5 mr-2" />
                  Usar Modelo
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500">ou</span>
                </div>
              </div>
              <div className="mt-8">
                <ImportarXLSX onImport={handleImport} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setView('import')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </button>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNewTaskForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#0046b7] hover:bg-[#0057e3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Tarefa
                </button>
                <ExportarXLSX data={tasks} />
                <ExportarPNG />
                <ExportarPDF />
              </div>
            </div>
            {showNewTaskForm && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Nova Tarefa</h3>
                <form onSubmit={handleAddTask}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome da Tarefa
                      </label>
                      <input
                        type="text"
                        id="text"
                        required
                        value={newTask.text}
                        onChange={(e) => setNewTask(prev => ({ ...prev, text: e.target.value }))}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1">
                        Responsável
                      </label>
                      <input
                        type="text"
                        id="responsible"
                        required
                        value={newTask.responsible}
                        onChange={(e) => setNewTask(prev => ({ ...prev, responsible: e.target.value }))}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Início
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        required
                        value={newTask.start_date}
                        onChange={(e) => setNewTask(prev => ({ ...prev, start_date: e.target.value }))}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Duração (dias)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        required
                        min="1"
                        value={newTask.duration}
                        onChange={(e) => setNewTask(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowNewTaskForm(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-[#0046b7] hover:bg-[#0057e3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      Adicionar Tarefa
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cronograma do Projeto</h2>
              <GanttChart 
                tasks={tasks} 
                onTaskUpdate={handleTaskUpdate}
                onTaskSelect={setSelectedTask}
              />
            </div>
          </div>
        )}

        {showTemplates && (
          <ModelosCronograma
            onSelect={handleTemplateSelect}
            onClose={() => setShowTemplates(false)}
          />
        )}

        {selectedTask && (
          <TaskDetails
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={handleTaskUpdate}
            onDelete={handleTaskDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;