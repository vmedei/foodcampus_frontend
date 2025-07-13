'use client'

import { useAuth } from '@/hooks/useAuth'
import { User, LogOut, MapPin } from 'lucide-react'
import { MapaInterativo } from '@/components/mapa'

export default function HomeCliente() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Home - Cliente</h1>
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

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Informações do Usuário */}
                    <div className="lg:col-span-1">
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
                                
                                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                                    <p className="text-primary font-semibold text-sm">
                                        Explore os setores da UFRN no mapa!
                                    </p>
                                </div>
                                
                                <div className="stats stats-vertical shadow">
                                    <div className="stat">
                                        <div className="stat-title">Setores</div>
                                        <div className="stat-value text-primary">5</div>
                                        <div className="stat-desc">da UFRN</div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-title">Vendedores</div>
                                        <div className="stat-value text-secondary">9</div>
                                        <div className="stat-desc">no total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mapa Interativo */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-primary mb-4">
                                    <MapPin className="h-5 w-5" />
                                    Setores da UFRN
                                </h2>
                                
                                <p className="text-base-content/70 mb-4">
                                    Clique nos marcadores para ver os vendedores próximos a cada setor
                                </p>
                                
                                <div className="rounded-lg overflow-hidden">
                                    <MapaInterativo altura="400px" />
                                </div>
                                
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <div className="badge badge-outline">
                                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                        CT - Centro de Tecnologia
                                    </div>
                                    <div className="badge badge-outline">
                                        <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                                        CCSA - C. C. Sociais Aplicadas
                                    </div>
                                    <div className="badge badge-outline">
                                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                                        CB - Centro de Biociências
                                    </div>
                                    <div className="badge badge-outline">
                                        <div className="w-2 h-2 bg-info rounded-full mr-2"></div>
                                        IMD - Instituto M. Digital
                                    </div>
                                    <div className="badge badge-outline">
                                        <div className="w-2 h-2 bg-warning rounded-full mr-2"></div>
                                        PAC - Praça de Alimentação
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 