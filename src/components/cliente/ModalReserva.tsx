'use client'

import { useState } from 'react'
import { X, Package, Calendar, MapPin, DollarSign, Plus, Minus } from 'lucide-react'
import { useReservas, ProdutoReserva, AgendamentoReserva } from '@/hooks/useReservas'

interface ModalReservaProps {
  isOpen: boolean
  onClose: () => void
  produto?: ProdutoReserva
  agendamento?: AgendamentoReserva
}

export default function ModalReserva({ isOpen, onClose, produto, agendamento }: ModalReservaProps) {
  const { criarReserva, loading } = useReservas()
  const [quantidade, setQuantidade] = useState(1)
  const [observacoes, setObservacoes] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!produto || !agendamento) {
      setErro('Dados do produto ou agendamento não encontrados')
      return
    }

    if (quantidade <= 0) {
      setErro('Quantidade deve ser maior que zero')
      return
    }

    try {
      await criarReserva({
        agendamento_id: agendamento.id,
        produto_id: produto.id,
        quantidade,
        observacoes: observacoes.trim() || undefined
      })

      setSucesso('Reserva criada com sucesso!')
      
      // Resetar formulário
      setQuantidade(1)
      setObservacoes('')
      
      // Fechar modal após 2 segundos
      setTimeout(() => {
        onClose()
        setSucesso('')
      }, 2000)
    } catch (error) {
      setErro('Erro ao criar reserva. Tente novamente.')
    }
  }

  const handleClose = () => {
    if (!loading) {
      setQuantidade(1)
      setObservacoes('')
      setErro('')
      setSucesso('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Fazer Reserva</h3>
          <button 
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle"
            disabled={loading}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {produto && agendamento && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Informações do Produto */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{produto.nome}</h4>
                </div>
                <p className="text-sm text-base-content/70 mb-2">
                  {produto.descricao}
                </p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-bold">{formatarPreco(produto.preco)}</span>
                </div>
              </div>
            </div>

            {/* Informações do Agendamento */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">{agendamento.setor_nome}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    {formatarDataHora(agendamento.data_inicio)} - {formatarDataHora(agendamento.data_fim)}
                  </span>
                </div>
                <div className="text-sm text-base-content/70">
                  Vendedor: {agendamento.vendedor_nome}
                </div>
              </div>
            </div>

            {/* Quantidade */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Quantidade</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
                  className="btn btn-outline btn-sm btn-circle"
                  disabled={loading}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-bold min-w-[3rem] text-center">
                  {quantidade}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantidade(prev => prev + 1)}
                  className="btn btn-outline btn-sm btn-circle"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="text-right">
              <span className="text-sm text-base-content/70">Total: </span>
              <span className="text-lg font-bold text-primary">
                {formatarPreco(produto.preco * quantidade)}
              </span>
            </div>

            {/* Observações */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Observações (opcional)</span>
              </label>
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="Ex: Sem cebola, extra sal, etc."
                rows={3}
                disabled={loading}
              />
            </div>

            {/* Mensagens de erro/sucesso */}
            {erro && (
              <div className="alert alert-error">
                <span>{erro}</span>
              </div>
            )}

            {sucesso && (
              <div className="alert alert-success">
                <span>{sucesso}</span>
              </div>
            )}

            {/* Botões */}
            <div className="modal-action">
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-ghost"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Confirmar Reserva'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 