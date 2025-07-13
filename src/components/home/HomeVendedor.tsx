'use client'

import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, LogOut } from 'lucide-react'

export default function HomeVendedor() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-base-200">
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
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body text-center">
                        <div className="avatar placeholder mb-4">
                            <div className="bg-secondary text-secondary-content rounded-full w-24">
                                <ShoppingCart className="h-12 w-12" />
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-secondary mb-2">
                            Área do Vendedor
                        </h2>
                        
                        <p className="text-base-content/70 mb-6">
                            Você está logado como <span className="font-semibold text-secondary">{user?.type}</span>
                        </p>
                        
                        <div className="bg-secondary/10 p-6 rounded-lg">
                            <p className="text-secondary font-semibold">
                                Esta é a home do vendedor - em breve terá mais funcionalidades!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 