
import React from "react";

const NovaTarefaForm = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Nome da Tarefa</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Grupo</label>
          <input type="text" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Data de Início</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Duração (dias)</label>
          <input type="number" className="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-2">
        <button className="px-4 py-2 border rounded">Cancelar</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Adicionar Tarefa</button>
      </div>
    </div>
  );
};

export default NovaTarefaForm;
