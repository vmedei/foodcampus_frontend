'use client'

import { useAuth } from '@/hooks/useAuth'
import { MapPin, Info } from 'lucide-react'
import { MapaSetores } from '@/components/mapa'
import { useState } from 'react'
import { Setor, VendedorAgendado } from '@/hooks/useSetores'

export default function HomeCliente() {
    const { user } = useAuth()

    const [setorSelecionado, setSetorSelecionado] = useState<Setor | null>(null)

    const handleSetorSelecionado = (setor: Setor) => {
        setSetorSelecionado(setor)
    }

    const handleVendedorClick = (vendedor: VendedorAgendado) => {
        // A funcionalidade de visualizar produtos agora é tratada internamente no MapaSetores
        console.log('Vendedor selecionado:', vendedor)
    }

    return (
        <div className="bg-base-200 min-h-screen">
            <div className="container mx-auto px-4 py-6">

                {/* Header */}
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Bem-vindo(a), {user?.name || user?.email}
                </h1>

                {/* Mapa Principal */}
                <div className="card bg-base-100 shadow-lg">

                    <div className="card-body">

                        <h2 className="card-title text-primary">
                            <MapPin className="h-5 w-5" />
                            Setores da UFRN
                        </h2>

                        <div className="rounded-b-xl overflow-hidden">
                            <MapaSetores
                                altura="500px"
                                dataFiltro={new Date().toISOString().split('T')[0]}
                                onVendedorClick={handleVendedorClick}
                                setorSelecionado={setorSelecionado}
                                onSetorSelecionado={handleSetorSelecionado}
                                mostrarSeletorSetores={true}
                            />
                        </div>

                        {/* Instruções */}
                        <div className="alert alert-info flex items-center">
                            <Info className="h-5 w-5" />
                            <div>
                                <h3 className="font-bold">Como usar:</h3>
                                <div className="text-sm">
                                    Clique nos marcadores dos setores no mapa para ver os vendedores disponíveis. 
                                    Clique no card de um vendedor para ver seus produtos.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 