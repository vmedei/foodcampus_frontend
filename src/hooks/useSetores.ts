import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

export interface Setor {
    id: number
    nome: string
    sigla: string
    latitude: number
    longitude: number
    descricao?: string
    endereco?: string
    vendedores?: VendedorAgendado[]
}

export interface VendedorAgendado {
    agendamentoId: number
    vendedorId: number
    nomeFantasia: string
    telefone: string
    descricao: string
    dataInicio: string
    dataFim: string
    status: 'AGENDADO' | 'ATIVO' | 'FINALIZADO' | 'CANCELADO'
    observacoes?: string
}

interface AgendamentoRequest {
    setorId: number
    dataInicio: string
    dataFim: string
    observacoes?: string
}

export function useSetores() {
    const [setores, setSetores] = useState<Setor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const carregarSetores = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/api/v1/setores')
            setSetores(response || [])
        } catch (err: any) {
            setError('Erro ao carregar setores')
            console.error('Erro ao carregar setores:', err)
        } finally {
            setLoading(false)
        }
    }

    const carregarVendedoresPorSetor = async (setorId: number, data?: string) => {
        try {
            const params = data ? { data } : {}
            const response = await api.get(`/api/v1/setores/${setorId}/vendedores`, { params })
            return response as VendedorAgendado[]
        } catch (err: any) {
            console.error(`Erro ao carregar vendedores para setor ${setorId}:`, err)
            return []
        }
    }

    const agendarVendedor = async (agendamento: AgendamentoRequest) => {
        try {
            const response = await api.post('/api/v1/setores/agendamento', agendamento)
            return response
        } catch (err: any) {
            if (err.response?.status === 400) {
                throw new Error(err.response.data.message || 'Dados inválidos para agendamento')
            } else if (err.response?.status === 409) {
                throw new Error('Você já possui um agendamento conflitante nesse horário')
            }
            throw new Error('Erro ao agendar no setor')
        }
    }

    const carregarMeusAgendamentos = async () => {
        try {
            const response = await api.get('/api/v1/setores/meus-agendamentos')
            return response as VendedorAgendado[]
        } catch (err: any) {
            console.error('Erro ao carregar agendamentos:', err)
            throw new Error('Erro ao carregar seus agendamentos')
        }
    }

    useEffect(() => {
        carregarSetores()
    }, [])

    return {
        setores,
        loading,
        error,
        carregarVendedoresPorSetor,
        agendarVendedor,
        carregarMeusAgendamentos,
        recarregar: carregarSetores
    }
} 