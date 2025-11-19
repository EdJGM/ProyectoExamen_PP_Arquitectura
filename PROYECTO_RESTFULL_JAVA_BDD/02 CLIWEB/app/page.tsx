'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import StatusBar from '@/components/status-bar'
import ProductosPanel from '@/components/panels/productos-panel'
import FacturacionPanel from '@/components/panels/facturacion-panel'
import CreditoPanel from '@/components/panels/credito-panel'
import ConectividadPanel from '@/components/panels/conectividad-panel'

type PanelType = 'productos' | 'facturacion' | 'credito' | 'conectividad'

export default function Home() {
  const [activePanel, setActivePanel] = useState<PanelType>('productos')
  const [protocol, setProtocol] = useState<'REST' | 'SOAP'>('REST')
  const [statusMessage, setStatusMessage] = useState({ text: 'Listo', type: 'default' })
  const [connectionStatus, setConnectionStatus] = useState({ connected: false, details: '' })

  const renderPanel = () => {
    switch (activePanel) {
      case 'productos':
        return <ProductosPanel setStatus={setStatusMessage} />
      case 'facturacion':
        return <FacturacionPanel setStatus={setStatusMessage} />
      case 'credito':
        return <CreditoPanel setStatus={setStatusMessage} />
      case 'conectividad':
        return <ConectividadPanel protocol={protocol} setProtocol={setProtocol} setStatus={setStatusMessage} setConnectionStatus={setConnectionStatus} />
      default:
        return <ProductosPanel setStatus={setStatusMessage} />
    }
  }

  const getPanelTitle = () => {
    switch (activePanel) {
      case 'productos':
        return 'Gestión de Productos'
      case 'facturacion':
        return 'Sistema de Facturación'
      case 'credito':
        return 'Consultas de Crédito BanQuito'
      case 'conectividad':
        return 'Estado de Conectividad'
      default:
        return 'ESPE Comercializadora'
    }
  }

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--dark-gray)' }}>
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePanel={activePanel} onPanelChange={setActivePanel} />

        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
          <div className="p-5 border-b" style={{ borderColor: 'var(--medium-gray)' }}>
            <h2 className="text-xl font-bold" style={{ color: 'var(--dark-gray)' }}>{getPanelTitle()}</h2>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {renderPanel()}
          </div>
        </div>
      </div>

      <StatusBar message={statusMessage} connectionStatus={connectionStatus} protocol={protocol} />
    </div>
  )
}
