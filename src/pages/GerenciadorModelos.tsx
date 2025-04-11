import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

interface Template {
  id: string;
  nome: string;
  descricao: string;
  tasks: {
    id: number;
    text: string;
    group: string;
    duration: number;
  }[];
}

const GerenciadorModelos = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Template>({
    id: '',
    nome: '',
    descricao: '',
    tasks: []
  });
  const [newTask, setNewTask] = useState({
    text: '',
    group: '',
    duration: 1
  });

  const handleAddTemplate = () => {
    if (newTemplate.nome.trim() === '') return;

    const template: Template = {
      ...newTemplate,
      id: Date.now().toString(),
      tasks: []
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      id: '',
      nome: '',
      descricao: '',
      tasks: []
    });
    setShowForm(false);
  };

  const handleAddTask = (templateId: string) => {
    if (newTask.text.trim() === '') return;

    const task = {
      id: Date.now(),
      ...newTask
    };

    setTemplates(prev =>
      prev.map(template =>
        template.id === templateId
          ? { ...template, tasks: [...template.tasks, task] }
          : template
      )
    );

    setNewTask({
      text: '',
      group: '',
      duration: 1
    });
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(template => template.id !== templateId));
  };

  const handleDeleteTask = (templateId: string, taskId: number) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === templateId
          ? { ...template, tasks: template.tasks.filter(task => task.id !== taskId) }
          : template
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Modelos</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Modelo
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Novo Modelo</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome do Modelo</label>
              <input
                type="text"
                value={newTemplate.nome}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, nome: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={newTemplate.descricao}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, descricao: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddTemplate}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Modelo
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{template.nome}</h3>
                <p className="text-sm text-gray-500">{template.descricao}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingTemplate(template)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tarefas</h4>
              <div className="space-y-2">
                {template.tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.text}</p>
                      <p className="text-sm text-gray-500">
                        Grupo: {task.group} | Duração: {task.duration} dias
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(template.id, task.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nome da Tarefa"
                    value={newTask.text}
                    onChange={(e) => setNewTask(prev => ({ ...prev, text: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Grupo"
                    value={newTask.group}
                    onChange={(e) => setNewTask(prev => ({ ...prev, group: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Duração (dias)"
                    value={newTask.duration}
                    onChange={(e) => setNewTask(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <button
                    onClick={() => handleAddTask(template.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciadorModelos;