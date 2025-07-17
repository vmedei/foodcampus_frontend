'use client'

import { useState, useEffect } from 'react'
import { useSetores, Setor, VendedorAgendado } from '@/hooks/useSetores'
import { Calendar, Clock, MapPin, List, Eye } from 'lucide-react'
import StatusModal from './StatusModal'

interface MeusAgendamentosProps {
    agendamentos: VendedorAgendado[]
    setores: Setor[]
    loading: boolean
    onAgendamentosChange: (agendamentos: VendedorAgendado[]) => void
}

export default function MeusAgendamentos({ 
    agendamentos, 
    setores, 
    loading, 
    onAgendamentosChange 
}: MeusAgendamentosProps) {
    const { atualizarStatusAgendamento } = useSetores()
    const [loadingStatus, setLoadingStatus] = useState<number | null>(null)
    const [mensagemStatus, setMensagemStatus] = useState<string | null>(null)
    const [mostrarApenasAtivos, setMostrarApenasAtivos] = useState(false)

    // Filtrar agendamentos baseado no estado
    const agendamentosFiltrados = mostrarApenasAtivos 
        ? agendamentos.filter(agendamento => 
            agendamento.status === 'AGENDADO' || agendamento.status === 'ATIVO'
          )
        : agendamentos

    const formatarDataHora = (dataIso: string) => {
        return new Date(dataIso).toLocaleString('pt-BR', {            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusBadge = (status: string, agendamentoId: number) => {
        const isLoading = loadingStatus === agendamentoId

        if (isLoading) {
            return <span className="badge badge-ghost opacity-50">Atualizando...</span>
        }

        return (
            <StatusModal
                currentStatus={status}
                agendamentoId={agendamentoId}
                onStatusChange={handleAtualizarStatus}
                loading={isLoading}
            />
        )
    }

    const getNomeSetor = (setorId: number) => {
        const setor = setores.find(s => s.id === setorId)
        return setor ? `${setor.sigla} - ${setor.nome}` : 'Setor não encontrado'
    }

    const handleAtualizarStatus = async (agendamentoId: number, novoStatus: string) => {
        setLoadingStatus(agendamentoId)
        try {
            await atualizarStatusAgendamento(agendamentoId, novoStatus)
            
            // Atualizar o agendamento na lista local
            const agendamentosAtualizados = agendamentos.map(agendamento => 
                agendamento.agendamentoId === agendamentoId 
                    ? { ...agendamento, status: novoStatus as any }
                    : agendamento
            )
            
            onAgendamentosChange(agendamentosAtualizados)
            
            // Mostrar mensagem de sucesso
            const statusText = novoStatus === 'ATIVO' ? 'ativado' : 'finalizado'
            setMensagemStatus(`Agendamento ${statusText} com sucesso!`)
            
            // Limpar mensagem após 3 segundos
            setTimeout(() => setMensagemStatus(null), 3000)
        } catch (error: any) {
            console.error('Erro ao atualizar status:', error)
            setMensagemStatus('Erro ao atualizar status do agendamento')
            setTimeout(() => setMensagemStatus(null), 3000)
        } finally {
            setLoadingStatus(null)
        }
    }

    return (
        <div className="p-4">          {/* Mensagem de status */}
            {mensagemStatus && (
                <div className="alert alert-info mb-4">
                    <span>{mensagemStatus}</span>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <List className="h-5 w-5" />
                    Meus Agendamentos
                </h3>
                
                <div className="flex items-center gap-4">
                    <span className="text-xs text-base-content/60">
                        {agendamentosFiltrados.length} de {agendamentos.length} agendamentos
                    </span>
                    <label className="label cursor-pointer gap-2">
                        <span className="label-text text-sm">Apenas ativos</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary toggle-sm"
                            checked={mostrarApenasAtivos}
                            onChange={e => setMostrarApenasAtivos(e.target.checked)}
                        />
                    </label>
                </div>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : agendamentosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-base-content/70">
                    <Calendar className="h-12 w-12 mx-auto mb-4">
                        <p>Nenhum agendamento encontrado</p>
                    </Calendar>
                    <p className="text-sm">
                        {mostrarApenasAtivos 
                            ? 'Não há agendamentos ativos ou agendados'
                            : 'Crie seu primeiro agendamento usando o formulário ao lado'
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {agendamentosFiltrados.map((agendamento) => (
                        <div key={agendamento.agendamentoId} className="card bg-base-200 shadow-sm">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium">{agendamento.nomeFantasia}</h4>
                                    {getStatusBadge(agendamento.status, agendamento.agendamentoId)}
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span>Setor: {getNomeSetor(agendamento.setor?.id || 0)}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>
                                            {formatarDataHora(agendamento.dataInicio)} - {formatarDataHora(agendamento.dataFim)}
                                        </span>
                                    </div>
                                    
                                    {agendamento.observacoes && (
                                        <div className="flex items-start gap-2">
                                            <Eye className="h-4 w-4 text-primary mt-0.5" />
                                            <span className="text-base-content/70">
                                                {agendamento.observacoes}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 