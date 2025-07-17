'use client'

import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuth = useAuthContext

// Hook específico para proteger rotas
export const useAuthGuard = (requiredRole?: 'cliente' | 'vendedor') => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth?mode=login')
        return
      }
      
      if (requiredRole && user?.type !== requiredRole) {
        router.push('/auth?mode=login')
        return
      }
    }
  }, [isAuthenticated, user, loading, requiredRole, router])

  return {
    isAuthenticated,
    user,
    loading,
    hasRequiredRole: requiredRole ? user?.type === requiredRole : true
  }
}

// Hook para dados do usuário logado
export const useUser = () => {
  const { user, isAuthenticated } = useAuth()
  
  return {
    user,
    isAuthenticated,
    isCliente: user?.type === 'cliente',
    isVendedor: user?.type === 'vendedor'
  }
} 