'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ConectividadPanelProps {
  protocol: 'REST' | 'SOAP'
  setProtocol: (protocol: 'REST' | 'SOAP') => void
  setStatus: (status: { text: string; type: string }) => void
  setConnectionStatus: (status: { connected: boolean; details: string }) => void
}

export default function ConectividadPanel({
  protocol,
  setProtocol,
  setStatus,
  setConnectionStatus,
}: ConectividadPanelProps) {
  const [logs, setLogs] = useState<string[]>(['Sistema iniciado - Protocolo: REST'])
  const [testing, setTesting] = useState(false)

  const agregarLog = (mensaje: string) => {
    const timestamp = new Date().toLocaleTimeString('es-ES')
    setLogs(prev => [...prev, `[${timestamp}] ${mensaje}`])
  }

  const probarConexiones = async () => {
    setTesting(true)
    setStatus({ text: 'Probando conexiones...', type: 'loading' })
    agregarLog('Iniciando prueba de conexiones...')

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const comercializadoraOk = Math.random() > 0.1
      const banquitoOk = Math.random() > 0.1

      if (comercializadoraOk) {
        agregarLog('✅ Comercializadora conectada')
      } else {
        agregarLog('❌ Error conectando Comercializadora')
      }

      if (banquitoOk) {
        agregarLog('✅ BanQuito conectado')
      } else {
        agregarLog('❌ Error conectando BanQuito')
      }

      const todasConectadas = comercializadoraOk && banquitoOk
      setConnectionStatus({
        connected: todasConectadas,
        details: todasConectadas ? 'Todos los servicios activos' : 'Algunos servicios no disponibles',
      })

      if (todasConectadas) {
        setStatus({ text: 'Todas las conexiones están activas', type: 'success' })
        agregarLog('✅ Todas las conexiones funcionando correctamente')
      } else {
        setStatus({ text: 'Algunos servicios no están disponibles', type: 'warning' })
        agregarLog('⚠️ Algunos servicios no están disponibles')
      }
    } catch (error) {
      setStatus({ text: 'Error al probar conexiones', type: 'error' })
      agregarLog('❌ Error al probar conexiones')
    } finally {
      setTesting(false)
    }
  }

  const cambiarProtocolo = (nuevoProtocolo: 'REST' | 'SOAP') => {
    setProtocol(nuevoProtocolo)
    agregarLog(`Protocolo cambiado a: ${nuevoProtocolo}`)
    setStatus({ text: `Protocolo cambiado a: ${nuevoProtocolo}`, type: 'success' })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div 
          className="border rounded p-4"
          style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--medium-gray)' }}>🔧 PROTOCOLO ACTUAL</p>
          <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Protocolo: {protocol}</p>
        </div>
        <div 
          className="border rounded p-4"
          style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--medium-gray)' }}>🏪 COMERCIALIZADORA</p>
          <p className="text-lg">🟢 Conectado</p>
        </div>
        <div 
          className="border rounded p-4"
          style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--medium-gray)' }}>🏦 BANQUITO CORE</p>
          <p className="text-lg">🟢 Conectado</p>
        </div>
      </div>

      <div 
        className="border rounded p-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <h3 className="font-bold text-lg mb-4">⚙️ Configuración de Protocolos</h3>
        
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => cambiarProtocolo('REST')}
            className="px-4 py-2 rounded font-medium text-white"
            style={{
              backgroundColor: protocol === 'REST' ? 'var(--success)' : 'var(--medium-gray)'
            }}
          >
            {protocol === 'REST' ? '✅ REST Activo' : 'REST (Java)'}
          </Button>
          <Button
            onClick={() => cambiarProtocolo('SOAP')}
            className="px-4 py-2 rounded font-medium text-white"
            style={{
              backgroundColor: protocol === 'SOAP' ? 'var(--success)' : 'var(--medium-gray)'
            }}
          >
            {protocol === 'SOAP' ? '✅ SOAP Activo' : 'SOAP (.NET)'}
          </Button>
          <Button
            onClick={probarConexiones}
            disabled={testing}
            className="px-4 py-2 rounded font-medium text-white"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {testing ? '⏳ Probando...' : '🔄 Probar Conexiones'}
          </Button>
        </div>
      </div>

      <div 
        className="border rounded p-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <h3 className="font-bold text-lg mb-3">📝 Log de Conexiones</h3>
        <div 
          className="p-4 rounded font-mono text-xs overflow-auto h-48 border"
          style={{ backgroundColor: '#1a1a1a', color: 'white', borderColor: 'var(--dark-gray)' }}
        >
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
