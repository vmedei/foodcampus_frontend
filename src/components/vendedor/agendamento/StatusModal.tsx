'use client'

import { useState } from 'react'
import { ChevronDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface StatusOption {
    value: string
    label: string
    color: string
    description: string
    icon: React.ReactNode
}

interface StatusModalProps {
    currentStatus: string
    agendamentoId: number
    onStatusChange: (agendamentoId: number, newStatus: string) => void
    loading?: boolean
}

const statusOptions: StatusOption[] = [
    {
        value: 'AGENDADO',
        label: 'Agendado',
        color: 'badge-primary',
        description: 'Agendamento confirmado, aguardando início',
        icon: <CheckCircle className="h-4 w-4" />
    },
    {
        value: 'ATIVO',
        label: 'Ativo',
        color: 'badge-success',
        description: 'Trabalhando ativamente no setor',
        icon: <CheckCircle className="h-4 w-4" />
    },
    {
        value: 'FINALIZADO',
        label: 'Finalizado',
        color: 'badge-neutral',
        description: 'Agendamento concluído com sucesso',
        icon: <CheckCircle className="h-4 w-4" />
    },
    {
        value: 'CANCELADO',
        label: 'Cancelado',
        color: 'badge-error',
        description: 'Agendamento cancelado',
        icon: <XCircle className="h-4 w-4" />
    }
]

export default function StatusModal({
    currentStatus,
    agendamentoId,
    onStatusChange,
    loading = false
}: StatusModalProps) {
    const [showModal, setShowModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    const currentOption = statusOptions.find(option => option.value === currentStatus)

    const handleStatusClick = () => {
        if (!loading) {
            setShowModal(true)
        }
    }

    const handleStatusChange = (newStatus: string) => {
        setSelectedStatus(newStatus)
        setShowModal(false)
        if (newStatus !== currentStatus) {
            onStatusChange(agendamentoId, newStatus)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedStatus(null)
    }

    if (loading) {
        return (
            <span className="badge badge-ghost opacity-50">
                Atualizando...
            </span>
        )
    }

    return (
        <>
            <button
                className={`badge ${currentOption?.color} cursor-pointer hover:scale-105 transition-all duration-200 flex items-center gap-1`}
                onClick={handleStatusClick}
                disabled={loading}
            >
                {currentOption?.label}
                <ChevronDown className="h-3 w-3" />
            </button>

            {/* Modal de seleção de status */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="h-6 w-6 text-primary" />
                            <h3 className="font-bold text-lg">Alterar Status</h3>
                        </div>
                        
                        <div className="space-y-3">
                            <p className="text-base-content/80 text-sm">
                                Selecione o novo status para este agendamento:
                            </p>
                            
                            <div className="space-y-2">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        className={`w-full p-3 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                                            option.value === currentStatus 
                                                ? 'border-primary bg-primary/10' 
                                                : 'border-base-300 hover:border-primary/50 hover:bg-base-100'
                                        }`}
                                        onClick={() => handleStatusChange(option.value)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`badge ${option.color}`}>
                                                {option.label}
                                            </span>
                                            <span className="text-sm text-base-content/70">
                                                {option.description}
                                            </span>
                                        </div>
                                        {option.value === currentStatus && (
                                            <CheckCircle className="h-5 w-5 text-primary" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="modal-action">
                            <button 
                                className="btn btn-outline" 
                                onClick={handleCloseModal}
                            >
                                <XCircle className="h-4 w-4" />
                                Cancelar
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={handleCloseModal}></div>
                </div>
            )}
        </>
    )
} 