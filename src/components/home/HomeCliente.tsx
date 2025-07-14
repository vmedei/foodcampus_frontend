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

                {/* Instruções */}
                <div className="alert alert-info mb-6">
                    <Info className="h-5 w-5" />
                    <div>
                        <h3 className="font-bold">Como usar:</h3>
                        <div className="text-sm mt-1">
                            Clique nos marcadores dos setores no mapa para ver os vendedores disponíveis em cada localização da UFRN.
                        </div>
                    </div>
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
                                altura="600px"
                                dataFiltro={new Date().toISOString().split('T')[0]}
                                onVendedorClick={(vendedor) => {
                                    // Lógica para fazer reserva - implementar futuramente
                                    console.log('Vendedor selecionado:', vendedor)
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Legendas dos Setores */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    <div className="flex items-center gap-2 p-3 bg-base-100 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">CT</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-base-100 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium">CCSA</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-base-100 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span className="text-sm font-medium">CB</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-base-100 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-info rounded-full"></div>
                        <span className="text-sm font-medium">IMD</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-base-100 rounded-lg shadow-sm">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span className="text-sm font-medium">PAC</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 