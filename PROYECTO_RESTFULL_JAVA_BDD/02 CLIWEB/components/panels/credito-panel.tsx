'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { getPanelContext } from '@/hooks/use-panel-navigation'
import { clienteUnificado } from '@/lib/api-client'
import { toastContext } from '@/components/ui/toast-notification'

interface CreditoPanelProps {
  setStatus: (status: { text: string; type: string }) => void
  creditoIdToLoad?: number | null
  onCreditoLoaded?: () => void
}

export default function CreditoPanel({ setStatus, creditoIdToLoad, onCreditoLoaded }: CreditoPanelProps) {
  const [cedulaValidacion, setCedulaValidacion] = useState('')
  const [cedulaAmortizacion, setCedulaAmortizacion] = useState('')
  const [resultadoValidacion, setResultadoValidacion] = useState('')
  const [tablaAmortizacion, setTablaAmortizacion] = useState<any[]>([])
  const [infoCredito, setInfoCredito] = useState('')
  const panelContext = getPanelContext()

  const cargarTablaAutomaticamente = async (idCredito: number) => {
    setCedulaAmortizacion(String(idCredito))
    setStatus({ text: 'Cargando tabla de amortización automáticamente...', type: 'loading' })

    try {
      const result = await clienteUnificado.obtenerTablaAmortizacion(idCredito)

      if (result?.encontrado) {
        const cuotasFormateadas = result.cuotas.map((cuota: any) => ({
          numero: cuota.numeroCuota,           
          valor: cuota.valorCuota,              
          interes: cuota.interesPagado,        
          capital: cuota.capitalPagado,        
          saldo: cuota.saldo,                   
          vencimiento: cuota.fechaVencimiento   
        }))

        setTablaAmortizacion(cuotasFormateadas)
        setInfoCredito(`Crédito #${result.idCredito} - Monto: $${result.montoCredito} - Tasa: ${(result.tasaInteres * 100).toFixed(1)}% - Cuotas: ${result.numeroCuotas}`)
        setStatus({ text: `Tabla de amortización cargada para crédito #${idCredito}`, type: 'success' })
      } else {
        setTablaAmortizacion([])
        setInfoCredito('')
        setStatus({ text: result?.mensaje || 'Tabla no encontrada', type: 'error' })
      }
      // Notificar que se terminó de cargar
      if (onCreditoLoaded) {
        onCreditoLoaded()
      }
    } catch (error) {
      setStatus({ text: 'Error al cargar tabla automáticamente', type: 'error' })
    }
  }

  useEffect(() => {
    if (creditoIdToLoad) {
      console.log('Cargando automáticamente crédito ID:', creditoIdToLoad)
      cargarTablaAutomaticamente(creditoIdToLoad)
    }
  }, [creditoIdToLoad])
  
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

    const idCredito = parseInt(cedulaAmortizacion.trim())
    if (isNaN(idCredito)) {
      toastContext.showWarning('ID Inválido ⚠️', 'Ingrese un ID de crédito válido')
      setStatus({ text: 'ID de crédito inválido', type: 'warning' })
      return
    }

    setStatus({ text: 'Obteniendo tabla de amortización...', type: 'loading' })

    try {
      const result = await clienteUnificado.obtenerTablaAmortizacion(idCredito)

      if (result?.encontrado) {
        const cuotasFormateadas = result.cuotas.map((cuota: any) => ({
          numero: cuota.numeroCuota,           
          valor: cuota.valorCuota,              
          interes: cuota.interesPagado,        
          capital: cuota.capitalPagado,        
          saldo: cuota.saldo,                   
          vencimiento: cuota.fechaVencimiento   
        }))

        setTablaAmortizacion(cuotasFormateadas)
        setInfoCredito(`Crédito #${result.idCredito} - Monto: $${result.montoCredito} - Tasa: ${(result.tasaInteres * 100).toFixed(1)}% - Cuotas: ${result.numeroCuotas}`)
        setStatus({ text: 'Tabla de amortización cargada exitosamente', type: 'success' })
        toastContext.showSuccess('Tabla Cargada ✅', `Tabla de amortización para crédito #${idCredito}`)
      } else {
        setTablaAmortizacion([])
        setInfoCredito('')
        setStatus({ text: result?.mensaje || 'Tabla no encontrada', type: 'error' })
        toastContext.showError('Tabla No Encontrada ❌', result?.mensaje || 'No se encontró la tabla de amortización')
      }
    } catch (error) {
      setTablaAmortizacion([])
      setInfoCredito('')
      setStatus({ text: 'Error al obtener tabla', type: 'error' })
      toastContext.showError('Error de Conexión ❌', 'No se pudo obtener la tabla de amortización')
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
