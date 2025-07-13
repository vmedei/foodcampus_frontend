'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { HomeCliente, HomeVendedor } from '@/components/home'

export default function HomePage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth?mode=login')
        }
    }, [user, loading, router])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/70">Carregando...</p>
                </div>
            </div>
        )
    }

    // Not authenticated
    if (!user) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-error mb-4">Acesso Negado</h1>
                    <p className="text-base-content/70 mb-6">Você precisa estar logado para acessar esta página.</p>
                    <button 
                        onClick={() => router.push('/auth?mode=login')}
                        className="btn btn-primary"
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        )
    }

    // Render home based on user type
    switch (user.type) {
        case 'cliente':
            return <HomeCliente />
        case 'vendedor':
            return <HomeVendedor />
        default:
            return (
                <div className="min-h-screen bg-base-200 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-error mb-4">Tipo de Usuário Inválido</h1>
                        <p className="text-base-content/70 mb-6">Tipo de usuário não reconhecido: {user.type}</p>
                        <button 
                            onClick={() => router.push('/')}
                            className="btn btn-primary"
                        >
                            Voltar ao Início
                        </button>
                    </div>
                </div>
            )
    }
} 