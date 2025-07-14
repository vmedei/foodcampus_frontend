'use client'

import { useAuth } from '@/hooks/useAuth'
import { User, LogOut, MapPin, Info } from 'lucide-react'
import { MapaSetores } from '@/components/mapa'

export default function HomeCliente() {
    const { user, logout } = useAuth()

    return (
        <div className="bg-base-200 min-h-screen">
            <div className="container mx-auto px-4 py-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Food Campus - Cliente</h1>
                        <p className="text-base-content/70">Bem-vindo(a), {user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="btn btn-outline btn-error btn-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>

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
                                onVendedorClick={(vendedor) => {
                                    // Lógica para fazer reserva - implementar futuramente
                                    console.log('Vendedor selecionado:', vendedor)
                                }}
                            />
                        </div>

                        {/* Instruções */}
                        <div className="alert alert-info flex items-center">
                            <Info className="h-5 w-5" />
                            <h3 className="font-bold">Como usar:</h3>
                            <div className="text-sm">
                                Clique nos marcadores dos setores no mapa para ver os vendedores disponíveis em cada localização da UFRN.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 