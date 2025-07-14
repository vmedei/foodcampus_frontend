'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { VendedorAgendado } from '@/hooks/useSetores'

interface ModalConfirmacaoStatusProps {
    agendamento: VendedorAgendado | null
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

export default function ModalConfirmacaoStatus({
    agendamento,
    isOpen,
    onClose,
    onConfirm,
    loading
}: ModalConfirmacaoStatusProps) {
    if (!isOpen || !agendamento) return null

    const formatarDataHora = (dataIso: string) => {
        return new Date(dataIso).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-warning" />
                    <h3 className="font-bold text-lg">Confirmar Ativação</h3>
                </div>
                
                <div className="space-y-4">
                    <p className="text-base-content/80">
                        Você possui um agendamento ativo no setor <strong>{agendamento.setor?.sigla}</strong> 
                        que está dentro do horário programado.
                    </p>
                    
                    <div className="bg-base-200 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="font-medium">Setor:</span>
                                <span>{agendamento.setor?.sigla} - {agendamento.setor?.nome}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Início:</span>
                                <span>{formatarDataHora(agendamento.dataInicio)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Fim:</span>
                                <span>{formatarDataHora(agendamento.dataFim)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Status atual:</span>
                                <span className="badge badge-primary">{agendamento.status}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="alert alert-info">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">
                            Deseja alterar o status de "AGENDADO" para "ATIVO" para indicar que você está 
                            atualmente trabalhando no setor?
                        </span>
                    </div>
                </div>

                <div className="modal-action">
                    <button 
                        className="btn btn-outline" 
                        onClick={onClose}
                        disabled={loading}
                    >
                        <XCircle className="h-4 w-4" />
                        Cancelar
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Ativando...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-4 w-4" />
                                Ativar Agendamento
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
} 