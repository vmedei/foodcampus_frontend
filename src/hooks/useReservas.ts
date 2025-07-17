import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

export interface Reserva {
  id: number
  cliente_id: number
  agendamento_id: number
  produto_id: number
  quantidade: number
  criado_em: string
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA'
  observacoes?: string
}

export interface ProdutoReserva {
  id: number
  nome: string
  descricao: string
  preco: number
  base64Image: string
  vendedor_id: number
}

export interface AgendamentoReserva {
  id: number
  setor_id: number
  data_inicio: string
  data_fim: string
  vendedor_id: number
  vendedor_nome: string
  setor_nome: string
}

// Mock de produtos para reserva
const produtosMock: ProdutoReserva[] = [
  {
    id: 1,
    nome: 'X-Burger',
    descricao: 'Hambúrguer artesanal com queijo e salada',
    preco: 15.9,
    base64Image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2Q==',
    vendedor_id: 1
  },
  {
    id: 2,
    nome: 'Refrigerante',
    descricao: 'Refrigerante 350ml',
    preco: 5.5,
    base64Image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2Q==',
    vendedor_id: 1
  },
  {
    id: 3,
    nome: 'Batata Frita',
    descricao: 'Porção de batata frita crocante',
    preco: 8.9,
    base64Image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2Q==',
    vendedor_id: 2
  }
]

// Mock de agendamentos para reserva
const agendamentosMock: AgendamentoReserva[] = [
  {
    id: 201,
    setor_id: 1,
    data_inicio: '2024-06-02T08:00:00.000Z',
    data_fim: '2024-06-02T18:00:00.000Z',
    vendedor_id: 1,
    vendedor_nome: 'Lanchonete do João',
    setor_nome: 'Centro de Tecnologia'
  },
  {
    id: 202,
    setor_id: 2,
    data_inicio: '2024-06-03T10:00:00.000Z',
    data_fim: '2024-06-03T16:00:00.000Z',
    vendedor_id: 2,
    vendedor_nome: 'Cantina da Maria',
    setor_nome: 'Centro de Ciências da Saúde'
  }
]

// Mock inicial de reservas
const reservasIniciais: Reserva[] = [
  {
    id: 1,
    cliente_id: 1,
    agendamento_id: 201,
    produto_id: 1,
    quantidade: 2,
    criado_em: '2024-06-01T10:00:00.000Z',
    status: 'CONFIRMADA',
    observacoes: 'Sem cebola'
  },
  {
    id: 2,
    cliente_id: 1,
    agendamento_id: 201,
    produto_id: 2,
    quantidade: 1,
    criado_em: '2024-06-01T11:00:00.000Z',
    status: 'PENDENTE'
  }
]

export const useReservas = () => {
  const { user } = useAuth()
  const [reservas, setReservas] = useState<Reserva[]>(reservasIniciais)
  const [loading, setLoading] = useState(false)

  // Simular carregamento de reservas do cliente
  const carregarReservas = async () => {
    setLoading(true)
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Filtrar reservas do cliente atual (mock)
    const reservasCliente = reservasIniciais.filter(
      reserva => reserva.cliente_id === 1 // Mock - usar cliente ID 1
    )
    setReservas(reservasCliente)
    setLoading(false)
  }

  // Criar nova reserva
  const criarReserva = async (dados: {
    agendamento_id: number
    produto_id: number
    quantidade: number
    observacoes?: string
  }) => {
    setLoading(true)
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const novaReserva: Reserva = {
      id: Math.max(...reservas.map(r => r.id)) + 1,
      cliente_id: 1, // Mock - usar cliente ID 1
      agendamento_id: dados.agendamento_id,
      produto_id: dados.produto_id,
      quantidade: dados.quantidade,
      criado_em: new Date().toISOString(),
      status: 'PENDENTE',
      observacoes: dados.observacoes
    }
    
    setReservas(prev => [...prev, novaReserva])
    setLoading(false)
    
    return novaReserva
  }

  // Cancelar reserva
  const cancelarReserva = async (reservaId: number) => {
    setLoading(true)
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setReservas(prev => 
      prev.map(reserva => 
        reserva.id === reservaId 
          ? { ...reserva, status: 'CANCELADA' as const }
          : reserva
      )
    )
    
    setLoading(false)
  }

  // Obter produto por ID
  const obterProduto = (produtoId: number) => {
    return produtosMock.find(p => p.id === produtoId)
  }

  // Obter agendamento por ID
  const obterAgendamento = (agendamentoId: number) => {
    return agendamentosMock.find(a => a.id === agendamentoId)
  }

  // Obter produtos disponíveis
  const obterProdutosDisponiveis = () => {
    return produtosMock
  }

  // Obter agendamentos disponíveis
  const obterAgendamentosDisponiveis = () => {
    return agendamentosMock
  }

  useEffect(() => {
    if (user) {
      carregarReservas()
    }
  }, [user])

  return {
    reservas,
    loading,
    carregarReservas,
    criarReserva,
    cancelarReserva,
    obterProduto,
    obterAgendamento,
    obterProdutosDisponiveis,
    obterAgendamentosDisponiveis
  }
} 