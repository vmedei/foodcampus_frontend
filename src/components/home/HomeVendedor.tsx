'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRef } from 'react'
import AgendamentoSetor from '@/components/vendedor/AgendamentoSetor'
import CadastroProduto from '@/components/vendedor/CadastroProduto'
import ListaProdutos, { ListaProdutosRef } from '@/components/vendedor/ListaProdutos'
import MapaSetores from '../mapa/MapaSetores'

export default function HomeVendedor() {
    const { user } = useAuth()

    const listaProdutosRef = useRef<ListaProdutosRef>(null)

    const handleProdutoCriado = () => {
        listaProdutosRef.current?.recarregarProdutos()
    }

    return (
        <div className="bg-base-200">
            <div className="container mx-auto p-10">

                {/* Header */}
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Bem-vindo(a), {user?.name || user?.email}
                </h1>

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
                    </div>
                    {/* Seção de Agendamento */}
                    <div className="w-full">
                        <AgendamentoSetor />
                    </div>

                </div>
            </div>
        </div>
    )
} 