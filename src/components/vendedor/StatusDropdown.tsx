'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface StatusOption {
    value: string
    label: string
    color: string
    description: string
}

interface StatusDropdownProps {
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
        description: 'Agendamento confirmado, aguardando início'
    },
    {
        value: 'ATIVO',
        label: 'Ativo',
        color: 'badge-success',
        description: 'Trabalhando ativamente no setor'
    },
    {
        value: 'FINALIZADO',
        label: 'Finalizado',
        color: 'badge-neutral',
        description: 'Agendamento concluído com sucesso'
    },
    {
        value: 'CANCELADO',
        label: 'Cancelado',
        color: 'badge-error',
        description: 'Agendamento cancelado'
    }
]

export default function StatusDropdown({
    currentStatus,
    agendamentoId,
    onStatusChange,
    loading = false
}: StatusDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const currentOption = statusOptions.find(option => option.value === currentStatus)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleStatusChange = (newStatus: string) => {
        if (newStatus !== currentStatus && !loading) {
            onStatusChange(agendamentoId, newStatus)
        }
        setIsOpen(false)
    }

    if (loading) {
        return (
            <span className="badge badge-ghost opacity-50">
                Atualizando...
            </span>
        )
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className={`badge ${currentOption?.color} cursor-pointer hover:scale-105 transition-all duration-200 flex items-center gap-1`}
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
            >
                {currentOption?.label}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 min-w-48 bg-base-100 border border-base-300 rounded-lg shadow-lg">
                    <div className="p-2 space-y-1">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`w-full text-left px-3 py-2 rounded-md hover:bg-base-200 transition-colors flex items-center justify-between ${
                                    option.value === currentStatus ? 'bg-base-200' : ''
                                }`}
                                onClick={() => handleStatusChange(option.value)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`badge ${option.color} badge-sm`}>
                                        {option.label}
                                    </span>
                                    <span className="text-xs text-base-content/70">
                                        {option.description}
                                    </span>
                                </div>
                                {option.value === currentStatus && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 