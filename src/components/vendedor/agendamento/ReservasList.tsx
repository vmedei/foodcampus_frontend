import { Calendar, Package, MapPin, ClipboardList, Info, DollarSign } from 'lucide-react'
import { Reserva, Produto, Setor, Agendamento, produtosMock, setoresMock, agendamentosMock } from './mockReservas'
import { useState } from 'react'

interface ReservasListProps {
  reservas: Reserva[]
}

const statusColors: Record<Reserva['status'], string> = {
  PENDENTE: 'badge-warning',
  CONFIRMADA: 'badge-success',
  CANCELADA: 'badge-error',
}

function formatarDataHora(dataIso: string) {
  return new Date(dataIso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatarPreco(preco: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

function getProduto(produtoId: number): Produto | undefined {
  return produtosMock.find(p => p.id === produtoId)
}

function getSetor(agendamentoId: number): Setor | undefined {
  const agendamento = agendamentosMock.find(a => a.id === agendamentoId)
  if (!agendamento) return undefined
  return setoresMock.find(s => s.id === agendamento.setor_id)
}

function getAgendamento(agendamentoId: number): Agendamento | undefined {
  return agendamentosMock.find(a => a.id === agendamentoId)
}

export default function ReservasList({ reservas }: ReservasListProps) {
  const [mostrarApenasAtivas, setMostrarApenasAtivas] = useState(false)

  // Filtrar reservas baseado no estado
  const reservasFiltradas = mostrarApenasAtivas 
    ? reservas.filter(reserva => 
        reserva.status === 'PENDENTE' || reserva.status === 'CONFIRMADA'
      )
    : reservas

  if (!reservas.length) {
    return (
      <div className="text-center py-8 text-base-content/70">
        <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Nenhuma reserva encontrada</p>
        <p className="text-sm">Nenhuma reserva foi feita ainda.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Minhas Reservas
        </h3>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-base-content/60">
            {reservasFiltradas.length} de {reservas.length} reservas
          </span>
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Apenas ativas / pendentes</span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={mostrarApenasAtivas}
              onChange={e => setMostrarApenasAtivas(e.target.checked)}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {reservasFiltradas.map(reserva => {
          const produto = getProduto(reserva.produto_id)
          const setor = getSetor(reserva.agendamento_id)
          const agendamento = getAgendamento(reserva.agendamento_id)
          
          return (
            <div key={reserva.id} className="card bg-base-200 shadow-sm">
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`badge ${statusColors[reserva.status]}`}>{reserva.status}</span>
                  <span className="text-xs text-base-content/60">#{reserva.id}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  {produto && (
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      <span className="font-medium">{produto.nome}</span>
                      <span className="text-base-content/70">({reserva.quantidade_produto}x)</span>
                    </div>
                  )}
                  
                  {produto && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>Preço: {formatarPreco(produto.preco)}</span>
                      <span className="text-base-content/70">
                        Total: {formatarPreco(produto.preco * reserva.quantidade_produto)}
                      </span>
                    </div>
                  )}
                  
                  {setor && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Setor: {setor.sigla} - {setor.nome}</span>
                    </div>
                  )}
                  
                  {agendamento && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        Agendamento: {formatarDataHora(agendamento.data_inicio)} - {formatarDataHora(agendamento.data_fim)}
                      </span>
                    </div>
                  )}
                  
                  {reserva.observacoes && reserva.observacoes.trim() && (
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5" />
                      <span className="text-base-content/70">{reserva.observacoes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 