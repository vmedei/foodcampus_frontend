'use client'

import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, LogOut } from 'lucide-react'
import AgendamentoSetor from '@/components/vendedor/AgendamentoSetor'

export default function HomeVendedor() {
    const { user, logout } = useAuth()

    return (
        <div className="bg-base-200">
            <div className="container mx-auto px-4 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Home do Vendedor</h1>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Informações do Vendedor */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body text-center">
                                <div className="avatar placeholder mb-4">
                                    <div className="bg-secondary text-secondary-content rounded-full w-20">
                                        <ShoppingCart className="h-10 w-10" />
                                    </div>
                                </div>
                                
                                <h2 className="text-xl font-bold text-secondary mb-2">
                                    Área do Vendedor
                                </h2>
                                
                                <p className="text-base-content/70 mb-4">
                                    Você está logado como <span className="font-semibold text-secondary">{user?.type}</span>
                                </p>
                                
                                <div className="bg-secondary/10 p-4 rounded-lg">
                                    <p className="text-secondary font-semibold text-sm">
                                        Gerencie seus agendamentos nos setores da UFRN
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Agendamento */}
                    <div className="lg:col-span-2">
                        <AgendamentoSetor />
                    </div>
                </div>
            </div>
        </div>
    )
} 