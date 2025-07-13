'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Store, Phone, Clock } from 'lucide-react'

// Configuração do ícone padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Definir tipos para vendedores
interface Vendedor {
  id: string
  nome: string
  nomeFantasia: string
  telefone: string
  descricao: string
  horarioFuncionamento: string
  categoria: string
}

// Definir tipos para setores da UFRN
interface SetorUFRN {
  id: string
  nome: string
  sigla: string
  latitude: number
  longitude: number
  vendedores: Vendedor[]
}

// Dados dos setores da UFRN com vendedores próximos
const setoresUFRN: SetorUFRN[] = [
  {
    id: '1',
    nome: 'Centro de Tecnologia',
    sigla: 'CT',
    latitude: -5.8370,
    longitude: -35.2041,
    vendedores: [
      {
        id: '1',
        nome: 'João Silva',
        nomeFantasia: 'Lanchonete do João',
        telefone: '(84) 99999-9999',
        descricao: 'Sanduíches, sucos e açaí',
        horarioFuncionamento: '07:00 - 18:00',
        categoria: 'Lanchonete'
      },
      {
        id: '2',
        nome: 'Carlos Tech',
        nomeFantasia: 'Açaí & Tech',
        telefone: '(84) 88888-8888',
        descricao: 'Açaí, vitaminas e lanches rápidos',
        horarioFuncionamento: '08:00 - 20:00',
        categoria: 'Açaí'
      }
    ]
  },
  {
    id: '2',
    nome: 'Centro de Ciências Sociais Aplicadas',
    sigla: 'CCSA',
    latitude: -5.8380,
    longitude: -35.2025,
    vendedores: [
      {
        id: '3',
        nome: 'Maria Santos',
        nomeFantasia: 'Quentinha da Maria',
        telefone: '(84) 77777-7777',
        descricao: 'Marmitex e refeições caseiras',
        horarioFuncionamento: '11:00 - 14:00',
        categoria: 'Marmitex'
      },
      {
        id: '4',
        nome: 'Pedro Almeida',
        nomeFantasia: 'Café do CCSA',
        telefone: '(84) 66666-6666',
        descricao: 'Café, salgados e doces',
        horarioFuncionamento: '07:00 - 17:00',
        categoria: 'Café'
      }
    ]
  },
  {
    id: '3',
    nome: 'Centro de Biociências',
    sigla: 'CB',
    latitude: -5.8355,
    longitude: -35.2055,
    vendedores: [
      {
        id: '5',
        nome: 'Ana Costa',
        nomeFantasia: 'Bio Lanches',
        telefone: '(84) 55555-5555',
        descricao: 'Lanches naturais e sucos detox',
        horarioFuncionamento: '07:30 - 16:30',
        categoria: 'Natural'
      }
    ]
  },
  {
    id: '4',
    nome: 'Instituto Metrópole Digital',
    sigla: 'IMD',
    latitude: -5.8340,
    longitude: -35.2070,
    vendedores: [
      {
        id: '6',
        nome: 'Lucas Digital',
        nomeFantasia: 'IMD Food',
        telefone: '(84) 44444-4444',
        descricao: 'Pizzas, hambúrguers e bebidas',
        horarioFuncionamento: '18:00 - 23:00',
        categoria: 'Fast Food'
      },
      {
        id: '7',
        nome: 'Julia Tech',
        nomeFantasia: 'Code & Coffee',
        telefone: '(84) 33333-3333',
        descricao: 'Café especial e programação',
        horarioFuncionamento: '07:00 - 22:00',
        categoria: 'Café'
      }
    ]
  },
  {
    id: '5',
    nome: 'Praça de Alimentação Central',
    sigla: 'PAC',
    latitude: -5.8365,
    longitude: -35.2035,
    vendedores: [
      {
        id: '8',
        nome: 'Roberto Silva',
        nomeFantasia: 'Cantina Central',
        telefone: '(84) 22222-2222',
        descricao: 'Pratos executivos e self-service',
        horarioFuncionamento: '11:00 - 15:00',
        categoria: 'Restaurante'
      },
      {
        id: '9',
        nome: 'Fernanda Lima',
        nomeFantasia: 'Doces & Cia',
        telefone: '(84) 11111-1111',
        descricao: 'Doces, bolos e tortas',
        horarioFuncionamento: '08:00 - 18:00',
        categoria: 'Doces'
      }
    ]
  }
]

interface MapaInterativoProps {
  setores?: SetorUFRN[]
  altura?: string
}

export default function MapaInterativo({ 
  setores = setoresUFRN, 
  altura = '400px' 
}: MapaInterativoProps) {
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    setMapReady(true)
  }, [])

  if (!mapReady) {
    return (
      <div className="flex items-center justify-center bg-base-200 rounded-lg" style={{ height: altura }}>
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-2 text-base-content/70">Carregando mapa...</p>
        </div>
      </div>
    )
  }

  // Posição central da UFRN
  const posicaoUFRN: [number, number] = [-5.8370, -35.2041]

  return (
    <div className="w-full" style={{ height: altura }}>
      <MapContainer
        center={posicaoUFRN}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcadores dos setores */}
        {setores.map((setor) => (
          <Marker
            key={setor.id}
            position={[setor.latitude, setor.longitude]}
          >
            <Popup maxWidth={350} minWidth={300}>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-10">
                      <Store className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">{setor.sigla}</h3>
                    <p className="text-sm text-base-content/70">{setor.nome}</p>
                  </div>
                </div>
                
                <div className="divider my-2">
                  <span className="text-xs">Vendedores próximos</span>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {setor.vendedores.map((vendedor) => (
                    <div key={vendedor.id} className="bg-base-200 p-2 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm text-primary">{vendedor.nomeFantasia}</h4>
                          <p className="text-xs text-base-content/70">{vendedor.nome}</p>
                        </div>
                        <span className="badge badge-outline badge-xs">{vendedor.categoria}</span>
                      </div>
                      
                      <p className="text-xs text-base-content/80 mb-2">{vendedor.descricao}</p>
                      
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-secondary" />
                          <span className="text-success font-semibold">{vendedor.horarioFuncionamento}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-secondary" />
                          <span className="font-mono">{vendedor.telefone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex gap-2">
                  <button className="btn btn-primary btn-sm flex-1">
                    Ver Todos
                  </button>
                  <button className="btn btn-outline btn-primary btn-sm flex-1">
                    Filtrar
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Marcador da UFRN */}
        <Marker position={posicaoUFRN}>
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-bold text-primary">UFRN</h3>
              <p className="text-sm text-base-content/70">Universidade Federal do Rio Grande do Norte</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
} 