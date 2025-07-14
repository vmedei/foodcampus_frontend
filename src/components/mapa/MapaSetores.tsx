'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet'
import L from 'leaflet'
import { useSetores } from '@/hooks/useSetores'
import { Phone, Clock, MapPin, Users, Calendar, AlertCircle, X } from 'lucide-react'

// Configuração do ícone padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapaSetoresProps {
    altura?: string
    dataFiltro?: string
    onVendedorClick?: (vendedor: any) => void
}

export default function MapaSetores({
    altura = '400px',
    dataFiltro,
    onVendedorClick
}: MapaSetoresProps) {
    const { setores, loading, error, carregarVendedoresPorSetor } = useSetores()
    const [setoresComVendedores, setSetoresComVendedores] = useState<any[]>([])
    const [carregandoVendedores, setCarregandoVendedores] = useState(false)
    const [setorSelecionado, setSetorSelecionado] = useState<any>(null)
    const [sidebarAberta, setSidebarAberta] = useState(false)

    useEffect(() => {
        const carregarDados = async () => {
            if (setores.length === 0) return

            setCarregandoVendedores(true)
            try {
                const setoresAtualizados = await Promise.all(
                    setores.map(async (setor) => {
                        const vendedores = await carregarVendedoresPorSetor(setor.id, dataFiltro)
                        return { ...setor, vendedores }
                    })
                )

                setSetoresComVendedores(setoresAtualizados)
            } catch (err) {
                console.error('Erro ao carregar vendedores por setor:', err)
            } finally {
                setCarregandoVendedores(false)
            }
        }

        carregarDados()
    }, [setores, dataFiltro])

    const handleSetorClick = (setor: any) => {
        setSetorSelecionado(setor)
        setSidebarAberta(true)
    }

    const fecharSidebar = () => {
        setSidebarAberta(false)
        setSetorSelecionado(null)
    }

    // Fechar sidebar quando clicar fora dela (apenas em mobile)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024 && sidebarAberta) {
                // Em mobile, mostrar sidebar em overlay
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [sidebarAberta])

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-base-200 rounded-lg" style={{ height: altura }}>
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-2 text-base-content/70">Carregando setores...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center bg-base-200 rounded-lg" style={{ height: altura }}>
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-error mx-auto mb-2" />
                    <p className="text-error font-semibold">Erro ao carregar mapa</p>
                    <p className="text-base-content/70 text-sm">{error}</p>
                </div>
            </div>
        )
    }

    // Posição central da UFRN
    const posicaoUFRN: [number, number] = [-5.8370, -35.2041]

    // Coordenadas do perímetro do campus da UFRN (aproximadas)
    const coordenadasCampusUFRN: [number, number][] = [
        [-5.838209863704848, -35.21062187058088], 
        [-5.83490680204696, -35.21195044262278], 
        [-5.83377593949745, -35.212166965128674], 
        [-5.829485822186279, -35.21119260836936], 
        [-5.832609173488709, -35.20300078082513], 
        [-5.8368812858359025, -35.19751546135553],
        [-5.839896900165199, -35.19536824899022], 
        [-5.840040500127037, -35.19522389448505], 
        [-5.842517630027559, -35.19516972134657], 
        [-5.843612600965918, -35.195999732816105],
        [-5.843935708857704, -35.19704628656391],
        [-5.843343356175954, -35.20254969118126],
        [-5.837850619250457, -35.2055810334171],
        [-5.8384070794506275, -35.21021824355191],
        [-5.838209863704848, -35.21062187058088]  
    ]

    return (
        <div className="relative flex w-full" style={{ height: altura }}>
            {/* Mapa */}
            <div className={`transition-all  duration-300 ${sidebarAberta ? 'lg:w-2/3' : 'w-full'}`}>
                <MapContainer
                    center={posicaoUFRN}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {setoresComVendedores.map((setor) => (
                        <Marker
                            key={setor.id}
                            position={[setor.latitude, setor.longitude]}
                            eventHandlers={{
                                click: () => handleSetorClick(setor)
                            }}
                        />
                    ))}

                    {/* Polígono do Campus da UFRN */}
                    <Polygon
                        positions={coordenadasCampusUFRN}
                        pathOptions={{
                            color: '#10b981', // Verde (cor success do daisyUI)
                            weight: 3,
                            opacity: 0.5,
                            fillColor: '#10b981',
                            fillOpacity: 0.05
                        }}
                    />
                </MapContainer>
            </div>

            {/* Overlay para mobile */}
            {sidebarAberta && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={fecharSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`
                transition-all duration-300 
                ${sidebarAberta ? 'lg:w-1/3 lg:relative' : 'w-0 lg:w-0'} 
                ${sidebarAberta ? 'fixed lg:relative right-0 top-0 w-80 lg:w-1/3' : 'fixed lg:relative'} 
                overflow-hidden z-50 lg:z-auto
            `} style={{ height: sidebarAberta ? altura : 'auto' }}>
                {sidebarAberta && setorSelecionado && (
                    <div className="h-full bg-base-100 border-l border-base-300 flex flex-col shadow-lg lg:shadow-none">
                        {/* Header da Sidebar */}
                        <div className="flex items-center justify-between p-4 bg-primary text-primary-content">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5" />
                                <div>
                                    <p className="font-bold text-lg">{setorSelecionado.nome}</p>
                                    <h3 className="text-sm opacity-90">{setorSelecionado.sigla}</h3>
                                </div>
                            </div>
                            <button 
                                onClick={fecharSidebar}
                                className="btn btn-ghost btn-sm btn-circle text-primary-content hover:bg-primary-focus"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Conteúdo da Sidebar */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {/* Informações do Setor */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3 text-base-content">Informações do Setor</h4>
                                
                                {setorSelecionado.endereco && (
                                    <div className="mb-3 p-3 bg-base-200 rounded-lg">
                                        <p className="text-sm">
                                            <strong className="text-base-content">Endereço:</strong>
                                            <br />
                                            <span className="text-base-content/70">{setorSelecionado.endereco}</span>
                                        </p>
                                    </div>
                                )}

                                {setorSelecionado.descricao && (
                                    <div className="mb-3 p-3 bg-base-200 rounded-lg">
                                        <p className="text-sm text-base-content/70">{setorSelecionado.descricao}</p>
                                    </div>
                                )}

                                {/* Coordenadas */}
                                <div className="p-3 bg-base-200 rounded-lg">
                                    <p className="text-sm">
                                        <strong className="text-base-content">Coordenadas:</strong>
                                        <br />
                                        <span className="text-base-content/70 font-mono text-xs">
                                            {setorSelecionado.latitude.toFixed(4)}, {setorSelecionado.longitude.toFixed(4)}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Vendedores */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="h-5 w-5 text-primary" />
                                    <h4 className="font-semibold">
                                        Vendedores {dataFiltro ? 'Hoje' : 'Disponíveis'}
                                    </h4>
                                    {setorSelecionado.vendedores?.length > 0 && (
                                        <span className="badge badge-primary badge-sm">
                                            {setorSelecionado.vendedores.length}
                                        </span>
                                    )}
                                </div>

                                {carregandoVendedores ? (
                                    <div className="flex items-center justify-center py-8">
                                        <span className="loading loading-spinner loading-sm text-primary"></span>
                                        <span className="ml-2 text-sm">Carregando vendedores...</span>
                                    </div>
                                ) : setorSelecionado.vendedores?.length > 0 ? (
                                    <div className="space-y-3">
                                        {setorSelecionado.vendedores.map((vendedor: any) => (
                                            <div 
                                                key={vendedor.agendamentoId} 
                                                className="card bg-base-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-base-300"
                                                onClick={() => onVendedorClick?.(vendedor)}
                                            >
                                                <div className="card-body p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex-1">
                                                            <h5 className="font-semibold text-primary text-base">
                                                                {vendedor.nomeFantasia}
                                                            </h5>
                                                            <p className="text-sm text-base-content/70 mt-1">
                                                                {vendedor.descricao}
                                                            </p>
                                                        </div>
                                                        <span className={`badge badge-sm shrink-0 ${
                                                            vendedor.status === 'ATIVO' ? 'badge-success' :
                                                            vendedor.status === 'AGENDADO' ? 'badge-warning' :
                                                            'badge-neutral'
                                                        }`}>
                                                            {vendedor.status}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-secondary shrink-0" />
                                                            <span>
                                                                {new Date(vendedor.dataInicio).toLocaleDateString('pt-BR')}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-secondary shrink-0" />
                                                            <span>
                                                                {new Date(vendedor.dataInicio).toLocaleTimeString('pt-BR', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })} - {new Date(vendedor.dataFim).toLocaleTimeString('pt-BR', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="h-4 w-4 text-secondary shrink-0" />
                                                            <span className="font-mono">{vendedor.telefone}</span>
                                                        </div>
                                                    </div>

                                                    {vendedor.observacoes && (
                                                        <div className="mt-3 p-2 bg-base-300 rounded text-sm">
                                                            <span className="font-semibold">Observações:</span> {vendedor.observacoes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-5xl mb-3">🍽️</div>
                                        <p className="text-base-content/50 font-medium">
                                            Nenhum vendedor agendado
                                        </p>
                                        <p className="text-base-content/40 text-sm">
                                            {dataFiltro ? 'para hoje' : 'no momento'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 