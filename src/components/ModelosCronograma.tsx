import React from 'react';
import { Task } from '../types/Task';

interface ModelosCronogramaProps {
  onSelect: (tasks: Task[]) => void;
  onClose: () => void;
}

const ModelosCronograma: React.FC<ModelosCronogramaProps> = ({ onSelect, onClose }) => {
  const modelos = [
    {
      id: 'projeto-ti',
      nome: 'Projeto de TI',
      descricao: 'Modelo para projetos de implementação de software',
      tasks: [
        {
          id: 1,
          text: 'Kickoff',
          start_date: new Date(),
          end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
          progress: 0,
          group: 'Planejamento',
          open: true
        },
        {
          id: 2,
          text: 'Levantamento de Requisitos',
          start_date: new Date(new Date().setDate(new Date().getDate() + 1)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 5)),
          progress: 0,
          group: 'Planejamento',
          open: true
        },
        {
          id: 3,
          text: 'Desenvolvimento',
          start_date: new Date(new Date().setDate(new Date().getDate() + 5)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 15)),
          progress: 0,
          group: 'Execução',
          open: true
        },
        {
          id: 4,
          text: 'Testes',
          start_date: new Date(new Date().setDate(new Date().getDate() + 15)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 20)),
          progress: 0,
          group: 'Qualidade',
          open: true
        },
        {
          id: 5,
          text: 'Implantação',
          start_date: new Date(new Date().setDate(new Date().getDate() + 20)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 22)),
          progress: 0,
          group: 'Entrega',
          open: true
        }
      ]
    },
    {
      id: 'projeto-marketing',
      nome: 'Campanha de Marketing',
      descricao: 'Modelo para campanhas de marketing digital',
      tasks: [
        {
          id: 1,
          text: 'Planejamento da Campanha',
          start_date: new Date(),
          end_date: new Date(new Date().setDate(new Date().getDate() + 3)),
          progress: 0,
          group: 'Planejamento',
          open: true
        },
        {
          id: 2,
          text: 'Criação de Conteúdo',
          start_date: new Date(new Date().setDate(new Date().getDate() + 3)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 8)),
          progress: 0,
          group: 'Produção',
          open: true
        },
        {
          id: 3,
          text: 'Lançamento da Campanha',
          start_date: new Date(new Date().setDate(new Date().getDate() + 8)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 9)),
          progress: 0,
          group: 'Execução',
          open: true
        },
        {
          id: 4,
          text: 'Monitoramento',
          start_date: new Date(new Date().setDate(new Date().getDate() + 9)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 14)),
          progress: 0,
          group: 'Acompanhamento',
          open: true
        }
      ]
    },
    {
      id: 'implantacao-itsm',
      nome: 'Implantação ITSM',
      descricao: 'Modelo para implementação de gestão de serviços de TI',
      tasks: [
        {
          id: 1,
          text: 'Análise e Diagnóstico',
          start_date: new Date(),
          end_date: new Date(new Date().setDate(new Date().getDate() + 5)),
          progress: 0,
          group: 'Planejamento',
          open: true
        },
        {
          id: 2,
          text: 'Definição de Processos ITIL',
          start_date: new Date(new Date().setDate(new Date().getDate() + 5)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 10)),
          progress: 0,
          group: 'Processos',
          open: true
        },
        {
          id: 3,
          text: 'Configuração do Catálogo de Serviços',
          start_date: new Date(new Date().setDate(new Date().getDate() + 10)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 15)),
          progress: 0,
          group: 'Configuração',
          open: true
        },
        {
          id: 4,
          text: 'Implementação Central de Serviços',
          start_date: new Date(new Date().setDate(new Date().getDate() + 15)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 20)),
          progress: 0,
          group: 'Implementação',
          open: true
        },
        {
          id: 5,
          text: 'Configuração Gestão de Incidentes',
          start_date: new Date(new Date().setDate(new Date().getDate() + 20)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 25)),
          progress: 0,
          group: 'Configuração',
          open: true
        },
        {
          id: 6,
          text: 'Configuração Gestão de Mudanças',
          start_date: new Date(new Date().setDate(new Date().getDate() + 25)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
          progress: 0,
          group: 'Configuração',
          open: true
        },
        {
          id: 7,
          text: 'Integração com Ferramentas',
          start_date: new Date(new Date().setDate(new Date().getDate() + 30)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 35)),
          progress: 0,
          group: 'Integração',
          open: true
        },
        {
          id: 8,
          text: 'Treinamento da Equipe',
          start_date: new Date(new Date().setDate(new Date().getDate() + 35)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 40)),
          progress: 0,
          group: 'Capacitação',
          open: true
        },
        {
          id: 9,
          text: 'Período de Testes',
          start_date: new Date(new Date().setDate(new Date().getDate() + 40)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 45)),
          progress: 0,
          group: 'Qualidade',
          open: true
        },
        {
          id: 10,
          text: 'Go-Live e Acompanhamento',
          start_date: new Date(new Date().setDate(new Date().getDate() + 45)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 50)),
          progress: 0,
          group: 'Produção',
          open: true
        }
      ]
    },
    {
      id: 'implantacao-iga',
      nome: 'Implantação IGA',
      descricao: 'Modelo para implementação de Identity Governance and Administration',
      tasks: [
        {
          id: 1,
          text: 'Análise de Requisitos e Escopo',
          start_date: new Date(),
          end_date: new Date(new Date().setDate(new Date().getDate() + 5)),
          progress: 0,
          group: 'Planejamento',
          open: true
        },
        {
          id: 2,
          text: 'Mapeamento de Processos de Identidade',
          start_date: new Date(new Date().setDate(new Date().getDate() + 5)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 10)),
          progress: 0,
          group: 'Análise',
          open: true
        },
        {
          id: 3,
          text: 'Definição de Políticas de Acesso',
          start_date: new Date(new Date().setDate(new Date().getDate() + 10)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 15)),
          progress: 0,
          group: 'Governança',
          open: true
        },
        {
          id: 4,
          text: 'Configuração do Ambiente',
          start_date: new Date(new Date().setDate(new Date().getDate() + 15)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 20)),
          progress: 0,
          group: 'Implementação',
          open: true
        },
        {
          id: 5,
          text: 'Integração com AD/LDAP',
          start_date: new Date(new Date().setDate(new Date().getDate() + 20)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 25)),
          progress: 0,
          group: 'Integração',
          open: true
        },
        {
          id: 6,
          text: 'Implementação de Workflows',
          start_date: new Date(new Date().setDate(new Date().getDate() + 25)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 30)),
          progress: 0,
          group: 'Automação',
          open: true
        },
        {
          id: 7,
          text: 'Configuração de Certificações de Acesso',
          start_date: new Date(new Date().setDate(new Date().getDate() + 30)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 35)),
          progress: 0,
          group: 'Governança',
          open: true
        },
        {
          id: 8,
          text: 'Implementação de Self-Service',
          start_date: new Date(new Date().setDate(new Date().getDate() + 35)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 40)),
          progress: 0,
          group: 'Implementação',
          open: true
        },
        {
          id: 9,
          text: 'Configuração de Relatórios e Dashboards',
          start_date: new Date(new Date().setDate(new Date().getDate() + 40)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 45)),
          progress: 0,
          group: 'Monitoramento',
          open: true
        },
        {
          id: 10,
          text: 'Treinamento de Usuários e Gestores',
          start_date: new Date(new Date().setDate(new Date().getDate() + 45)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 50)),
          progress: 0,
          group: 'Capacitação',
          open: true
        },
        {
          id: 11,
          text: 'Go-Live e Suporte Pós-Implantação',
          start_date: new Date(new Date().setDate(new Date().getDate() + 50)),
          end_date: new Date(new Date().setDate(new Date().getDate() + 55)),
          progress: 0,
          group: 'Produção',
          open: true
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Modelos de Cronograma</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fechar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {modelos.map((modelo) => (
            <div
              key={modelo.id}
              className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => onSelect(modelo.tasks)}
            >
              <h3 className="text-lg font-medium text-gray-900">{modelo.nome}</h3>
              <p className="text-sm text-gray-500 mt-1">{modelo.descricao}</p>
              <div className="mt-2 text-sm text-gray-600">
                {modelo.tasks.length} tarefas
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelosCronograma;