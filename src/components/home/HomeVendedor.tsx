'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRef } from 'react'
import { ShoppingCart, LogOut } from 'lucide-react'
import AgendamentoSetor from '@/components/vendedor/AgendamentoSetor'
import CadastroProduto from '@/components/vendedor/CadastroProduto'
import ListaProdutos, { ListaProdutosRef } from '@/components/vendedor/ListaProdutos'

export default function HomeVendedor() {
    const { user, logout } = useAuth()

    const listaProdutosRef = useRef<ListaProdutosRef>(null)

    const handleProdutoCriado = () => {
        listaProdutosRef.current?.recarregarProdutos()
    }

    return (
        <div className="bg-base-200">
            <div className="container mx-auto p-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Bem-vindo(a), {user?.name || user?.email}</h1>
                    <button
                        onClick={logout}
                        className="btn btn-outline btn-error"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Seção de Produtos */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div className="w-full">
                            <CadastroProduto onProdutoCriado={handleProdutoCriado} />
                        </div>
                        <div className="w-full">
                            <ListaProdutos ref={listaProdutosRef} />
                        </div>
                        {/* Seção de Agendamento */}
                        <div className="w-full">
                            <AgendamentoSetor />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
} 