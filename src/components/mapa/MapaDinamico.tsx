'use client'

import dynamic from 'next/dynamic'

// Importação dinâmica do componente do mapa para evitar problemas de SSR
const MapaInterativo = dynamic(() => import('./MapaInterativo'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-base-200 rounded-lg" style={{ height: '400px' }}>
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-2 text-base-content/70">Carregando mapa...</p>
      </div>
    </div>
  )
})

export default MapaInterativo 