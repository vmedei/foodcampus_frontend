'use client'

import { useAuth } from '@/hooks/useAuth'
import { User, LogOut } from 'lucide-react'

export default function HomeCliente() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Home do Cliente</h1>
                        <p className="text-base-content/70">Bem-vindo(a), {user?.email}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="btn btn-outline btn-error"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>

                {/* Main Content */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body text-center">
                        <div className="avatar placeholder mb-4">
                            <div className="bg-primary text-primary-content rounded-full w-24">
                                <User className="h-12 w-12" />
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-primary mb-2">
                            Área do Cliente
                        </h2>
                        
                        <p className="text-base-content/70 mb-6">
                            Você está logado como <span className="font-semibold text-primary">{user?.type}</span>
                        </p>
                        
                        <div className="bg-primary/10 p-6 rounded-lg">
                            <p className="text-primary font-semibold">
                                Esta é a home do cliente - em breve terá mais funcionalidades!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 