import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileSpreadsheet, Plus, BookTemplate } from 'lucide-react';
import GanttChart from '../components/GanttChart';
import ImportarXLSX from '../components/ImportarXLSX';
import ExportarXLSX from '../components/ExportarXLSX';
import ExportarPDF from '../components/ExportarPDF';
import ModelosCronograma from '../components/ModelosCronograma';
import { Task } from '../types/Task';

function GerenciadorCronograma() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<'import' | 'gantt'>('import');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [newTask, setNewTask] = useState({
    text: '',
    group: '',
    start_date: new Date().toISOString().split('T')[0],
    duration: 1
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

  const handleNewProject = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const initialTask: Task = {
      id: 1,
      text: "Nova Tarefa",
      start_date: today,
      end_date: tomorrow,
      progress: 0,
      group: "Novo Grupo",
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
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + parseInt(newTask.duration.toString()));

    const newTaskObj: Task = {
      id: Date.now(),
      text: newTask.text,
      start_date: startDate,
      end_date: endDate,
      progress: 0,
      group: newTask.group,
      open: true
    };

    setTasks(prev => [...prev, newTaskObj]);
    setShowNewTaskForm(false);
    setNewTask({
      text: '',
      group: '',
      start_date: new Date().toISOString().split('T')[0],
      duration: 1
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {view === 'import' ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <Calendar className="w-12 h-12 mx-auto text-blue-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Importar Cronograma</h2>
            <p className="mt-2 text-gray-600">Faça upload do seu arquivo XLSX para gerar o cronograma</p>
          </div>
          <div className="mt-8">
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={handleNewProject}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Novo Cronograma
              </button>
              <button
                onClick={() => setShowTemplates(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <BookTemplate className="w-5 h-5 mr-2" />
                Usar Modelo
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500">ou</span>
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
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNewTaskForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Tarefa
              </button>
              <ExportarXLSX data={tasks} />
              <ExportarPDF />
            </div>
          </div>
          {showNewTaskForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                      Grupo
                    </label>
                    <input
                      type="text"
                      id="group"
                      required
                      value={newTask.group}
                      onChange={(e) => setNewTask(prev => ({ ...prev, group: e.target.value }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewTaskForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Adicionar Tarefa
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Cronograma do Projeto</h2>
            <GanttChart tasks={tasks} onTaskUpdate={handleTaskUpdate} />
          </div>
        </div>
      )}

      {showTemplates && (
        <ModelosCronograma
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </main>
  );
}

export default GerenciadorCronograma;