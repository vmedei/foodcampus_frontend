'use client'

import { useAuth } from '@/hooks/useAuth'
import { Package, ShoppingCart, User, TrendingUp, DollarSign, Eye, Plus, Edit } from 'lucide-react'

export default function DashboardVendedor() {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Dashboard do Vendedor</h1>
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
                                    <p className="text-sm text-base-content/70">Produtos</p>
                                    <p className="text-2xl font-bold text-primary">18</p>
                                </div>
                                <Package className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Pedidos</p>
                                    <p className="text-2xl font-bold text-secondary">32</p>
                                </div>
                                <ShoppingCart className="h-8 w-8 text-secondary" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Vendas</p>
                                    <p className="text-2xl font-bold text-accent">R$ 1.240</p>
                                </div>
                                <DollarSign className="h-8 w-8 text-accent" />
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/70">Visualizações</p>
                                    <p className="text-2xl font-bold text-info">456</p>
                                </div>
                                <Eye className="h-8 w-8 text-info" />
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
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="card-title text-primary">
                                        <ShoppingCart className="h-5 w-5" />
                                        Pedidos Recentes
                                    </h2>
                                    <button className="btn btn-sm btn-primary">
                                        Ver Todos
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {[1, 2, 3].map((pedido) => (
                                        <div key={pedido} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="avatar placeholder">
                                                    <div className="bg-secondary text-secondary-content rounded-full w-12">
                                                        <span className="text-lg">C{pedido}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Cliente {pedido}</p>
                                                    <p className="text-sm text-base-content/70">
                                                        2x Sanduíche + 1x Suco • R$ 30,00
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="badge badge-warning">Preparando</div>
                                                <p className="text-xs text-base-content/70 mt-1">
                                                    Há 15 min
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Products */}
                        <div className="card bg-base-100 shadow-lg mt-6">
                            <div className="card-body">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="card-title text-primary">
                                        <Package className="h-5 w-5" />
                                        Meus Produtos
                                    </h2>
                                    <button className="btn btn-sm btn-primary">
                                        <Plus className="h-4 w-4" />
                                        Adicionar
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {[1, 2, 3].map((produto) => (
                                        <div key={produto} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                                    <Package className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">Produto {produto}</p>
                                                    <p className="text-sm text-base-content/70">R$ 15,00</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="badge badge-success">Disponível</div>
                                                <button className="btn btn-sm btn-ghost">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
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
                                <h2 className="card-title text-primary">
                                    <TrendingUp className="h-5 w-5" />
                                    Vendas Hoje
                                </h2>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Pedidos</span>
                                        <span className="font-semibold">8</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Faturamento</span>
                                        <span className="font-semibold text-success">R$ 240,00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Ticket Médio</span>
                                        <span className="font-semibold">R$ 30,00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-primary">Ações Rápidas</h2>
                                
                                <div className="space-y-2">
                                    <button className="btn btn-primary w-full">
                                        <Plus className="h-4 w-4" />
                                        Novo Produto
                                    </button>
                                    <button className="btn btn-outline btn-primary w-full">
                                        <Package className="h-4 w-4" />
                                        Gerenciar Produtos
                                    </button>
                                    <button className="btn btn-outline btn-primary w-full">
                                        <TrendingUp className="h-4 w-4" />
                                        Relatórios
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