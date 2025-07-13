'use client'

import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, User, MapPin, Heart, Clock, Star } from 'lucide-react'

export default function DashboardCliente() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Dashboard do Cliente</h1>
                        <p className="text-base-content/70">Bem-vindo(a) de volta, {user?.email}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="btn btn-outline btn-error"
                    >
                        Sair
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Pedidos</p>
                                    <p className="text-2xl font-bold text-primary">12</p>
                                </div>
                                <ShoppingCart className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Favoritos</p>
                                    <p className="text-2xl font-bold text-secondary">8</p>
                                </div>
                                <Heart className="h-8 w-8 text-secondary" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Avaliações</p>
                                    <p className="text-2xl font-bold text-accent">25</p>
                                </div>
                                <Star className="h-8 w-8 text-accent" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Localização</p>
                                    <p className="text-sm font-semibold text-info">UFRN</p>
                                </div>
                                <MapPin className="h-8 w-8 text-info" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-primary">
                                    <Clock className="h-5 w-5" />
                                    Pedidos Recentes
                                </h2>
                                
                                <div className="space-y-4">
                                    {[1, 2, 3].map((pedido) => (
                                        <div key={pedido} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary text-primary-content rounded-full w-12">
                                                        <span className="text-lg">V{pedido}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Vendedor {pedido}</p>
                                                    <p className="text-sm text-base-content/70">
                                                        Sanduíche + Suco • R$ 15,00
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="badge badge-success">Entregue</div>
                                                <p className="text-xs text-base-content/70 mt-1">
                                                    Hoje, 12:30
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-primary">
                                    <User className="h-5 w-5" />
                                    Dados do Usuário
                                </h2>
                                
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-base-content/70">Email</p>
                                        <p className="font-semibold">{user?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Tipo</p>
                                        <div className="badge badge-primary">{user?.type}</div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/70">Status</p>
                                        <div className="badge badge-success">Ativo</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-primary">Ações Rápidas</h2>
                                
                                <div className="space-y-2">
                                    <button className="btn btn-primary w-full">
                                        <ShoppingCart className="h-4 w-4" />
                                        Buscar Comida
                                    </button>
                                    <button className="btn btn-outline btn-primary w-full">
                                        <Heart className="h-4 w-4" />
                                        Meus Favoritos
                                    </button>
                                    <button className="btn btn-outline btn-primary w-full">
                                        <User className="h-4 w-4" />
                                        Meu Perfil
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 