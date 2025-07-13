'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Definir tipos das props para o mapa
interface MapaProps {
  altura?: string
}

// Importação dinâmica do componente do mapa para evitar problemas de SSR
const MapaInterativo = dynamic(
  () => import('./MapaInterativo').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center bg-base-200 rounded-lg" style={{ height: '400px' }}>
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-2 text-base-content/70">Carregando mapa...</p>
        </div>
      </div>
    )
  }
) as ComponentType<MapaProps>

export default MapaInterativo 