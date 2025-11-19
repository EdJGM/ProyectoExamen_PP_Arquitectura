'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CreditoPanelProps {
  setStatus: (status: { text: string; type: string }) => void
}

export default function CreditoPanel({ setStatus }: CreditoPanelProps) {
  const [cedulaValidacion, setCedulaValidacion] = useState('')
  const [cedulaAmortizacion, setCedulaAmortizacion] = useState('')
  const [resultadoValidacion, setResultadoValidacion] = useState('')
  const [tablaAmortizacion, setTablaAmortizacion] = useState<any[]>([])
  const [infoCredito, setInfoCredito] = useState('')

  const validarSujetoCredito = async () => {
    console.log('Cédula ingresada:', cedulaValidacion)
    if (!cedulaValidacion.trim()) {
      setStatus({ text: 'Ingrese la cédula a consultar', type: 'warning' })
      return
    }

    setStatus({ text: 'Validando sujeto de crédito...', type: 'loading' })

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      const sujetoCredito = Math.random() > 0.3
      setResultadoValidacion(`
RESULTADO DE VALIDACIÓN
Cédula: ${cedulaValidacion}
Estado: ${sujetoCredito ? '✅ APROBADO' : '❌ RECHAZADO'}
Mensaje: ${sujetoCredito ? 'Cliente aprobado para crédito' : 'Cliente no cumple requisitos'}
      `.trim())

      setStatus({ 
        text: sujetoCredito ? 'Cliente aprobado' : 'Cliente no aprobado',
        type: sujetoCredito ? 'success' : 'warning'
      })
    } catch (error) {
      setStatus({ text: 'Error al validar cliente', type: 'error' })
    }
  }

  const consultarMontoMaximo = async () => {
    if (!cedulaValidacion.trim()) {
      setStatus({ text: 'Ingrese la cédula a consultar', type: 'warning' })
      return
    }

    setStatus({ text: 'Consultando monto máximo...', type: 'loading' })

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      const montoMaximo = Math.random() * 10000 + 1000
      setResultadoValidacion(`
CONSULTA DE MONTO MÁXIMO
Cédula: ${cedulaValidacion}
Estado: ✅ APROBADO
Monto máximo: $${montoMaximo.toFixed(2)}
Mensaje: Monto máximo calculado correctamente
      `.trim())

      setStatus({ text: 'Consulta de monto máximo completada', type: 'success' })
    } catch (error) {
      setStatus({ text: 'Error al consultar monto', type: 'error' })
    }
  }

  const verTablaAmortizacion = async () => {
    if (!cedulaAmortizacion.trim()) {
      setStatus({ text: 'Ingrese el ID del crédito', type: 'warning' })
      return
    }

    setStatus({ text: 'Obteniendo tabla de amortización...', type: 'loading' })

    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      const cuotas = Array.from({ length: 12 }, (_, i) => ({
        numero: i + 1,
        valor: 125.50,
        interes: 15.50,
        capital: 110.00,
        saldo: 1500 - (110 * (i + 1)),
        vencimiento: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'),
      }))

      setTablaAmortizacion(cuotas)
      setInfoCredito(`Crédito #${cedulaAmortizacion} - Monto: $1,500.00 - Tasa: 12.5% - Cuotas: 12`)
      setStatus({ text: 'Tabla de amortización cargada', type: 'success' })
    } catch (error) {
      setStatus({ text: 'Error al obtener tabla', type: 'error' })
    }
  }

  return (
    <div className="space-y-4">
      <div 
        className="border rounded p-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <h3 className="font-bold text-lg mb-4">🔍 Validación de Crédito</h3>

        <div className="flex gap-3 mb-4 flex-wrap">
          <Input
            placeholder="Ingrese cédula..."
            value={cedulaValidacion}
            onChange={(e) => setCedulaValidacion(e.target.value)}
            className="flex-1 min-w-48"
          />
          <Button onClick={validarSujetoCredito} style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
            ✅ Validar
          </Button>
          <Button onClick={consultarMontoMaximo} style={{ backgroundColor: 'var(--success)', color: 'white' }}>
            💰 Monto Máximo
          </Button>
        </div>

        {resultadoValidacion && (
          <div 
            className="p-3 rounded font-mono text-xs whitespace-pre"
            style={{ backgroundColor: '#1a1a1a', color: 'white' }}
          >
            {resultadoValidacion}
          </div>
        )}
      </div>

      <div 
        className="border rounded p-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <h3 className="font-bold text-lg mb-4">📊 Tabla de Amortización</h3>

        <div className="flex gap-3 mb-4 flex-wrap">
          <Input
            placeholder="Ingrese ID del crédito..."
            value={cedulaAmortizacion}
            onChange={(e) => setCedulaAmortizacion(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={verTablaAmortizacion} style={{ backgroundColor: 'var(--success)', color: 'white' }}>
            📊 Ver Tabla
          </Button>
        </div>

        {infoCredito && (
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--dark-gray)' }}>{infoCredito}</p>
        )}

        {tablaAmortizacion.length > 0 && (
          <div className="overflow-x-auto border rounded" style={{ borderColor: 'var(--medium-gray)' }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">#</th>
                  <th className="px-3 py-2 text-right font-semibold">Valor Cuota</th>
                  <th className="px-3 py-2 text-right font-semibold">Interés</th>
                  <th className="px-3 py-2 text-right font-semibold">Capital</th>
                  <th className="px-3 py-2 text-right font-semibold">Saldo</th>
                  <th className="px-3 py-2 text-center font-semibold">Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {tablaAmortizacion.map((cuota, idx) => (
                  <tr 
                    key={cuota.numero}
                    style={{ 
                      borderBottom: '1px solid var(--light-gray)',
                      backgroundColor: idx % 2 === 0 ? 'white' : 'var(--light-gray)'
                    }}
                  >
                    <td className="px-3 py-2">{cuota.numero}</td>
                    <td className="px-3 py-2 text-right font-medium">${cuota.valor.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">${cuota.interes.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">${cuota.capital.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right font-medium">${cuota.saldo.toFixed(2)}</td>
                    <td className="px-3 py-2 text-center">{cuota.vencimiento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
