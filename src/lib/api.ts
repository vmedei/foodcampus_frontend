// Configuração da API do Food Campus Backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://foodcampusbackend-production.up.railway.app'
  : 'http://localhost:8080'

const API_VERSION = '/api/v1'

// ========================
// TIPOS E INTERFACES
// ========================

// Tipos de usuário
export type UserType = 'cliente' | 'vendedor'

// Tipos de cliente  
export type ClienteType = 'aluno' | 'professor' | 'funcionario'

// Request Types
export interface LoginRequest {
  email: string
  password: string
}

export interface CreateUserRequest {
  email: string
  password: string
}

export interface CreateCustomerRequest {
  name: string
  cpf: string
  phone: string
  tipo: ClienteType
  user: CreateUserRequest
}

export interface CreateSellerRequest {
  name: string
  fantasyName: string
  cpf: string
  cnpj: string
  phone: string
  description: string
  user: CreateUserRequest
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  base64Image: string
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  base64Image: string;
}

// Response Types
export interface UserResponse {
  email: string
  type: UserType
  name: string
}

export interface AuthenticatedUserResponse {
  response: string
  user: UserResponse
  token: string
}

export interface ApiResponse<T = any> {
  user?: T
  message?: string
  error?: string
}

// ========================
// CONFIGURAÇÃO DE HEADERS
// ========================

const getHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  return headers
}

// ========================
// UTILITÁRIOS
// ========================

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new ApiError(
      error.message || `Erro HTTP ${response.status}`,
      response.status,
      error
    )
  }
  
  return await response.json()
}

// ========================
// FUNÇÕES DE API
// ========================

// Autenticação
export const authAPI = {
  /**
   * Realiza login do usuário
   * @param credentials - Email e senha do usuário
   * @returns Promise com dados do usuário autenticado e token
   */
  login: async (credentials: LoginRequest): Promise<ApiResponse<AuthenticatedUserResponse>> => {
    const response = await fetch(`${API_BASE_URL}${API_VERSION}/auth`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    })
    
    return handleResponse<ApiResponse<AuthenticatedUserResponse>>(response)
  },

  /**
   * Valida se o token ainda é válido
   * @param token - Token JWT
   * @returns Promise com validação
   */
  validateToken: async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_VERSION}/auth/validate`, {
        method: 'GET',
        headers: getHeaders(token),
      })
      return response.ok
    } catch {
      return false
    }
  }
}

// Cadastro de Clientes
export const customerAPI = {
  /**
   * Cadastra um novo cliente
   * @param customerData - Dados do cliente
   * @returns Promise com dados do cliente criado
   */
  create: async (customerData: CreateCustomerRequest): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_VERSION}/customers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(customerData),
    })
    
    return handleResponse<ApiResponse>(response)
  }
}

// Cadastro de Vendedores
export const sellerAPI = {
  /**
   * Cadastra um novo vendedor
   * @param sellerData - Dados do vendedor
   * @returns Promise com dados do vendedor criado
   */
  create: async (sellerData: CreateSellerRequest): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_VERSION}/sellers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(sellerData),
    })
    
    return handleResponse<ApiResponse>(response)
  },

  /**
   * Lista todos os vendedores
   * @returns Promise com lista de vendedores
   */
  getAll: async (): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_VERSION}/sellers`, {
      method: 'GET',
      headers: getHeaders(),
    })
    
    return handleResponse<ApiResponse>(response)
  }
}

// Cadastro de Produtos
export const productAPI = {
  /**
   * Cadastra um novo produto
   * @param productData - Dados do produto
   * @returns Promise com dados do produto criado
   */
  create: async (productData: CreateProductRequest): Promise<ApiResponse> => {
    const token = authUtils.getToken()
    const response = await fetch(`${API_BASE_URL}${API_VERSION}/products`, {
      method: 'POST',
      headers: getHeaders(token || undefined),
      body: JSON.stringify(productData),
    })
    
    return handleResponse<ApiResponse>(response)
  },

  /**
   * Lista todos os produtos ou filtra por vendedor
   * @param storeCode - Código da loja (opcional)
   * @returns Promise com lista de produtos
   */
  getAll: async (storeCode?: string): Promise<{products: ProductResponse[]}> => {
    const token = authUtils.getToken()
    const url = new URL(`${API_BASE_URL}${API_VERSION}/products`)
    
    if (storeCode) {
      url.searchParams.append('storeCode', storeCode)
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getHeaders(token || undefined),
    })
    
    return handleResponse<{products: ProductResponse[]}>(response)
  },
  remove: async (id: number): Promise<{ message: string }> => {
    const token = authUtils.getToken()
    const response = await fetch(`${API_BASE_URL}${API_VERSION}/products/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token || undefined),
    })
    return handleResponse<{ message: string }>(response)
  }
}

// ========================
// UTILITÁRIOS DE AUTENTICAÇÃO
// ========================

export const authUtils = {
  /**
   * Salva o token no localStorage
   * @param token - Token JWT
   */
  saveToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodcampus_token', token)
    }
  },

  /**
   * Recupera o token do localStorage
   * @returns Token JWT ou null
   */
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('foodcampus_token')
    }
    return null
  },

  /**
   * Remove o token do localStorage
   */
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('foodcampus_token')
    }
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns true se há token salvo
   */
  isAuthenticated: (): boolean => {
    return !!authUtils.getToken()
  },

  /**
   * Salva dados do usuário no localStorage
   * @param user - Dados do usuário
   */
  saveUser: (user: UserResponse): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodcampus_user', JSON.stringify(user))
    }
  },

  /**
   * Recupera dados do usuário do localStorage
   * @returns Dados do usuário ou null
   */
  getUser: (): UserResponse | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('foodcampus_user')
      return userData ? JSON.parse(userData) : null
    }
    return null
  },

  /**
   * Remove dados do usuário do localStorage
   */
  removeUser: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('foodcampus_user')
    }
  },

  /**
   * Logout completo - remove token e dados do usuário
   */
  logout: (): void => {
    authUtils.removeToken()
    authUtils.removeUser()
  }
}

// ========================
// CONSTANTES DE CONFIGURAÇÃO
// ========================

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,
  ENDPOINTS: {
    AUTH: '/auth',
    CUSTOMERS: '/customers',
    SELLERS: '/sellers',
    PRODUCTS: '/products',
  }
}

// ========================
// HOOK DE ERRO PERSONALIZADO
// ========================

export const useApiError = () => {
  const handleApiError = (error: unknown): string => {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          return 'Credenciais inválidas. Verifique seu email e senha.'
        case 403:
          return 'Acesso negado. Dados inválidos ou usuário já existe.'
        case 404:
          return 'Recurso não encontrado.'
        case 500:
          return 'Erro interno do servidor. Tente novamente mais tarde.'
        default:
          return error.message || 'Erro desconhecido'
      }
    }
    
    return 'Erro de conexão. Verifique sua internet e tente novamente.'
  }

  return { handleApiError }
}

// ========================
// INSTÂNCIA GENÉRICA DE API
// ========================

export const api = {
  get: async <T = any>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const token = authUtils.getToken()
    const url = new URL(`${API_BASE_URL}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getHeaders(token || undefined),
    })
    
    return handleResponse<T>(response)
  },

  post: async <T = any>(endpoint: string, data?: any): Promise<T> => {
    const token = authUtils.getToken()
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(token || undefined),
      body: data ? JSON.stringify(data) : undefined,
    })
    
    return handleResponse<T>(response)
  },

  put: async <T = any>(endpoint: string, data?: any): Promise<T> => {
    const token = authUtils.getToken()
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(token || undefined),
      body: data ? JSON.stringify(data) : undefined,
    })
    
    return handleResponse<T>(response)
  },

  delete: async <T = any>(endpoint: string): Promise<T> => {
    const token = authUtils.getToken()
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(token || undefined),
    })
    
    return handleResponse<T>(response)
  }
}

// Export default para facilitar importação
export default {
  auth: authAPI,
  customer: customerAPI,
  seller: sellerAPI,
  utils: authUtils,
  config: API_CONFIG,
  ApiError
} 