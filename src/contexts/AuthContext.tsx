"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { 
  authAPI, 
  authUtils, 
  useApiError, 
  LoginRequest, 
  UserResponse
} from '@/lib/api'

interface AuthState {
  isAuthenticated: boolean
  user: UserResponse | null
  token: string | null
  loading: boolean
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  })

  const router = useRouter()
  const { handleApiError } = useApiError()

  // Inicializar estado na montagem do componente
  useEffect(() => {
    const initAuth = () => {
      const token = authUtils.getToken()
      const user = authUtils.getUser()
      setState({
        isAuthenticated: !!token,
        user: user,
        token: token,
        loading: false
      })
    }
    initAuth()
  }, [])

  // Função de login
  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      const response = await authAPI.login(credentials)
      if (response.user) {
        const authData = response.user
        // Salvar dados no localStorage
        authUtils.saveToken(authData.token)
        authUtils.saveUser(authData.user)
        // Atualizar estado
        setState({
          isAuthenticated: true,
          user: authData.user,
          token: authData.token,
          loading: false
        })
        // Redirecionar para home
        router.push('/home')
      } else {
        throw new Error('Resposta inválida do servidor')
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }))
      const errorMessage = handleApiError(error)
      throw new Error(errorMessage)
    }
  }

  // Função de logout
  const logout = (): void => {
    authUtils.logout()
    setState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    })
    router.push('/')
  }

  // Verificar autenticação
  const checkAuth = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      const token = authUtils.getToken()
      if (!token) {
        setState(prev => ({ ...prev, loading: false }))
        return
      }
      // Validar token no servidor (se implementado)
      const isValid = await authAPI.validateToken(token)
      if (!isValid) {
        logout()
        return
      }
      const user = authUtils.getUser()
      setState({
        isAuthenticated: true,
        user: user,
        token: token,
        loading: false
      })
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error)
      logout()
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 