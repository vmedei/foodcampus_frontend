export interface Reserva {
  id: number
  cliente_id: number
  agendamento_id: number
  produto_id: number
  quantidade_produto: number
  observacoes?: string
  status: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA'
  criado_em: string // ISO string
}

export interface Produto {
  id: number
  vendedor_id: number
  nome: string
  descricao: string
  preco: number
  base_64image: string
  ativo: boolean
}

export interface Setor {
  id: number
  sigla: string
  nome: string
}

export interface Agendamento {
  id: number
  setor_id: number
  data_inicio: string
  data_fim: string
  observacoes?: string
}

// Mock de produtos
export const produtosMock: Produto[] = [
  {
    id: 1,
    vendedor_id: 1,
    nome: 'X-Burger',
    descricao: 'Hambúrguer artesanal com queijo e salada',
    preco: 15.9,
    base_64image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2Q==',
    ativo: true
  },
  {
    id: 2,
    vendedor_id: 1,
    nome: 'Refrigerante',
    descricao: 'Refrigerante 350ml',
    preco: 5.5,
    base_64image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2Q==',
    ativo: true
  },
  {
    id: 3,
    vendedor_id: 1,
    nome: 'Batata Frita',
    descricao: 'Porção de batata frita crocante',
    preco: 8.9,
    base_64image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2Q==',
    ativo: true
  }
]

// Mock de setores
export const setoresMock: Setor[] = [
  {
    id: 1,
    sigla: 'CCET',
    nome: 'Centro de Ciências Exatas e da Terra'
  },
  {
    id: 2,
    sigla: 'CCS',
    nome: 'Centro de Ciências da Saúde'
  },
  {
    id: 3,
    sigla: 'CCHLA',
    nome: 'Centro de Ciências Humanas, Letras e Artes'
  }
]

// Mock de agendamentos
export const agendamentosMock: Agendamento[] = [
  {
    id: 201,
    setor_id: 1,
    data_inicio: '2024-06-02T00:00:00.000Z',
    data_fim: '2024-06-08T00:00:00.000Z',
    observacoes: 'Promoção de lanches'
  },
  {
    id: 202,
    setor_id: 2,
    data_inicio: '2024-06-13T00:00:00.000Z',
    data_fim: '2024-06-19T00:00:00.000Z',
    observacoes: 'Cardápio especial'
  },
  {
    id: 203,
    setor_id: 3,
    data_inicio: '2024-06-29T00:00:00.000Z',
    data_fim: '2024-06-22T00:00:00.000Z',
    observacoes: 'Jantar'
  }
]

// Mock de reservas atualizado
export const reservasMock: Reserva[] = [
  {
    id: 1,
    cliente_id: 101,
    agendamento_id: 201,
    produto_id: 1,
    quantidade_produto: 2,
    observacoes: 'Sem cebola',
    status: 'CONFIRMADA',
    criado_em: '2024-06-01T00:00:00.000Z'
  },
  {
    id: 2,
    cliente_id: 102,
    agendamento_id: 201,
    produto_id: 2,
    quantidade_produto: 3,
    observacoes: '',
    status: 'PENDENTE',
    criado_em: '2024-06-02T00:00:00.000Z'
  },
  {
    id: 3,
    cliente_id: 103,
    agendamento_id: 202,
    produto_id: 3,
    quantidade_produto: 1,
    observacoes: 'Extra sal',
    status: 'CANCELADA',
    criado_em: '2024-06-03T00:00:00.000Z'
  },
  {
    id: 4,
    cliente_id: 104,
    agendamento_id: 202,
    produto_id: 1,
    quantidade_produto: 1,
    observacoes: '',
    status: 'CONFIRMADA',
    criado_em: '2024-06-04T00:00:00.000Z'
  },
  {
    id: 5,
    cliente_id: 105,
    agendamento_id: 203,
    produto_id: 2,
    quantidade_produto: 2,
    observacoes: 'Sem gelo',
    status: 'PENDENTE',
    criado_em: '2024-06-05T00:00:00.000Z'
  }
] 