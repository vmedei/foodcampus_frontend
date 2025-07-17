'use client'

import { useState } from 'react'
import { 
  Package, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Info, 
  X, 
  ClipboardList,
  Filter
} from 'lucide-react'
import { useReservas, Reserva } from '@/hooks/useReservas'

export default function ListaReservas() {
  const { reservas, loading, cancelarReserva, obterProduto, obterAgendamento } = useReservas()
  const [filtroStatus, setFiltroStatus] = useState<'TODOS' | 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA'>('TODOS')
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState<number | null>(null)

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const formatarDataHora = (dataIso: string) => {
    return new Date(dataIso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: Reserva['status']) => {
    switch (status) {
      case 'PENDENTE':
        return 'badge-warning'
      case 'CONFIRMADA':
        return 'badge-success'
      case 'CANCELADA':
        return 'badge-error'
      default:
        return 'badge-neutral'
    }
  }

  const getStatusText = (status: Reserva['status']) => {
    switch (status) {
      case 'PENDENTE':
        return 'PENDENTE'
      case 'CONFIRMADA':
        return 'CONFIRMADA'
      case 'CANCELADA':
        return 'CANCELADA'
      default:
        return status
    }
  }

  const handleCancelarReserva = async (reservaId: number) => {
    try {
      await cancelarReserva(reservaId)
      setMostrarConfirmacao(null)
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error)
    }
  }

  // Filtrar reservas baseado no status
  const reservasFiltradas = filtroStatus === 'TODOS' 
    ? reservas 
    : reservas.filter(reserva => reserva.status === filtroStatus)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (reservas.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="h-16 w-16 text-base-content/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
        <p className="text-base-content/60">
          Você ainda não fez nenhuma reserva. Explore os produtos disponíveis!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6" />
            Minhas Reservas
          </h2>
          <p className="text-base-content/60">
            {reservasFiltradas.length} de {reservas.length} reservas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-base-content/60" />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value as any)}
            className="select select-bordered select-sm"
          >
            <option value="TODOS">Todas</option>
            <option value="PENDENTE">Pendentes</option>
            <option value="CONFIRMADA">Confirmadas</option>
            <option value="CANCELADA">Canceladas</option>
          </select>
        </div>
      </div>

      {/* Lista de reservas */}
      <div className="space-y-4">
        {reservasFiltradas.map((reserva) => {
          const produto = obterProduto(reserva.produto_id)
          const agendamento = obterAgendamento(reserva.agendamento_id)

          return (
            <div key={reserva.id} className="card bg-base-100 shadow-sm">
              <div className="card-body p-6">
                {/* Header da reserva */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`badge ${getStatusColor(reserva.status)}`}>
                      {getStatusText(reserva.status)}
                    </span>
                    <span className="text-sm text-base-content/60">
                      #{reserva.id}
                    </span>
                  </div>
                  
                  {reserva.status === 'PENDENTE' && (
                    <button
                      onClick={() => setMostrarConfirmacao(reserva.id)}
                      className="btn btn-ghost btn-sm text-error"
                    >
                      <X className="h-4 w-4" />
                      Cancelar
                    </button>
                  )}
                </div>

                {/* Informações do produto */}
                {produto && (
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        {produto.nome}
                      </h3>
                      <p className="text-sm text-base-content/70 mb-2">
                        {produto.descricao}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          {formatarPreco(produto.preco)} cada
                        </span>
                        <span className="text-base-content/70">
                          Quantidade: {reserva.quantidade}
                        </span>
                        <span className="font-semibold text-primary">
                          Total: {formatarPreco(produto.preco * reserva.quantidade)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Informações do agendamento */}
                {agendamento && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Local: {agendamento.setor_nome}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        Data: {formatarDataHora(agendamento.data_inicio)} - {formatarDataHora(agendamento.data_fim)}
                      </span>
                    </div>
                    <div className="text-base-content/70">
                      Vendedor: {agendamento.vendedor_nome}
                    </div>
                  </div>
                )}

                {/* Observações */}
                {reserva.observacoes && (
                  <div className="flex items-start gap-2 mt-3 p-3 bg-base-200 rounded-lg">
                    <Info className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">Observações:</span>
                      <p className="text-sm text-base-content/70">{reserva.observacoes}</p>
                    </div>
                  </div>
                )}

                {/* Data de criação */}
                <div className="text-xs text-base-content/50 mt-3 pt-3 border-t">
                  Reserva criada em: {formatarDataHora(reserva.criado_em)}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de confirmação de cancelamento */}
      {mostrarConfirmacao && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Cancelar Reserva</h3>
            <p className="mb-6">
              Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setMostrarConfirmacao(null)}
                className="btn btn-ghost"
              >
                Não, manter
              </button>
              <button
                onClick={() => handleCancelarReserva(mostrarConfirmacao)}
                className="btn btn-error"
              >
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 