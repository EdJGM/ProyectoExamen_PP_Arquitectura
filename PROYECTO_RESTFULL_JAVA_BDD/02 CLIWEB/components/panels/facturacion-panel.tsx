'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { clienteUnificado } from '@/lib/api-client'
import { toastContext } from '@/components/ui/toast-notification'
import { CreditResultDialog } from '@/components/ui/credit-result-dialog'
import { getPanelContext } from '@/hooks/use-panel-navigation'

interface Electrodomestico {
  idElectrodomestico: number
  codigo: string
  nombre: string
  descripcion: string
  marca: string
  precioVenta: number
  stock: number
  estado: string
}

interface ItemVenta {
  idElectrodomestico: number
  cantidad: number
  precio: number
}

interface CreditResult {
  idFactura: number
  idCreditoBanco: number
  nombreCliente: string
  cedula: string
  subtotal: number
  cuotaMensual: number
  numeroCuotas: number
}

interface FacturacionPanelProps {
  setStatus: (status: { text: string; type: string }) => void
  onShowCreditTable?: (idCredito: number) => void // Nueva prop opcional
  onShowFacturas?: () => void
}

export default function FacturacionPanel({ setStatus, onShowCreditTable, onShowFacturas }: FacturacionPanelProps) {
  const [productos, setProductos] = useState<Electrodomestico[]>([])
  const [items, setItems] = useState<ItemVenta[]>([])
  const [formulario, setFormulario] = useState({
    cedula: '',
    nombreCliente: '',
    clienteValidado: false,
    idCliente: 0,
  })
  const [cantidad, setCantidad] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Electrodomestico | null>(null)
  const [numeroCuotas, setNumeroCuotas] = useState(12)
  const [resultado, setResultado] = useState('')
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [validando, setValidando] = useState(false)
  const [showCreditDialog, setShowCreditDialog] = useState(false)
  const [creditResult, setCreditResult] = useState<CreditResult | null>(null)

  useEffect(() => {
    cargarProductos()
  }, [])

  const handleShowFacturas = () => {
    if (onShowFacturas) {
      onShowFacturas()
    } else {
      toastContext.showInfo('Navegación 📋', 'Use el menú lateral para ir a "Facturas"')
    }
  }

  const cargarProductos = async () => {
    setStatus({ text: 'Cargando productos...', type: 'loading' })
    try {
      const result = await clienteUnificado.listarElectrodomesticos()
      if (result) {
        setProductos(result)
        setStatus({ text: `Productos cargados: ${result.length}`, type: 'success' })
      } else {
        // Fallback con datos simulados
        const productosSimulados = [
          {
            idElectrodomestico: 1,
            codigo: 'REF001',
            nombre: 'Refrigerador 18 pies',
            descripcion: 'Refrigerador de 18 pies con congelador',
            marca: 'LG',
            precioVenta: 1200.0,
            stock: 5,
            estado: 'Activo',
          },
          {
            idElectrodomestico: 2,
            codigo: 'LAV001',
            nombre: 'Lavadora Automática',
            descripcion: 'Lavadora automática de carga frontal',
            marca: 'Samsung',
            precioVenta: 800.0,
            stock: 3,
            estado: 'Activo',
          },
          {
            idElectrodomestico: 3,
            codigo: 'TV001',
            nombre: 'TV LED 55"',
            descripcion: 'Smart TV LED 55 pulgadas',
            marca: 'Sony',
            precioVenta: 650.0,
            stock: 8,
            estado: 'Activo',
          },
        ]
        setProductos(productosSimulados)
        setStatus({ text: 'Datos simulados (servidor no disponible)', type: 'warning' })
      }
    } catch (error) {
      setStatus({ text: 'Error al cargar productos', type: 'error' })
    }
  }

  const validarCliente = async () => {
    if (!formulario.cedula.trim()) {
      toastContext.showWarning('Validación', 'Ingrese la cédula del cliente')
      setStatus({ text: 'Ingrese la cédula del cliente', type: 'warning' })
      return
    }

    setValidando(true)
    setStatus({ text: 'Validando cliente...', type: 'loading' })
    try {
      const result = await clienteUnificado.validarSujetoCredito(formulario.cedula)
      
      if (result?.sujetoCredito) {
        setFormulario(prev => ({
          ...prev,
          clienteValidado: true,
          idCliente: result.idCliente || 0,
        }))
        setStatus({ text: 'Cliente validado correctamente', type: 'success' })
        toastContext.showSuccess(
          'Cliente Validado ✅',
          `${formulario.nombreCliente || 'Cliente'} es apto para crédito. ${result.mensaje || ''}`
        )
      } else {
        setFormulario(prev => ({ ...prev, clienteValidado: false }))
        setStatus({ text: 'Cliente no apto para crédito', type: 'warning' })
        toastContext.showWarning(
          'Cliente No Apto ⚠️',
          result?.mensaje || 'El cliente no cumple con los requisitos para acceder a crédito'
        )
      }
    } catch (error) {
      setFormulario(prev => ({ ...prev, clienteValidado: false }))
      setStatus({ text: 'Error al validar cliente', type: 'error' })
      toastContext.showError(
        'Error de Conexión ❌',
        'No se pudo validar el cliente. Intente de nuevo o use efectivo.'
      )
    } finally {
      setValidando(false)
    }
  }

  const agregarItem = () => {
    if (!selectedProduct) {
      toastContext.showWarning('Seleccionar Producto', 'Seleccione un producto antes de agregar')
      setStatus({ text: 'Seleccione un producto', type: 'warning' })
      return
    }

    if (cantidad <= 0) {
      toastContext.showWarning('Cantidad Inválida', 'La cantidad debe ser mayor a 0')
      setStatus({ text: 'Cantidad debe ser mayor a 0', type: 'warning' })
      return
    }

    if (cantidad > selectedProduct.stock) {
      toastContext.showWarning('Stock Insuficiente', `Solo hay ${selectedProduct.stock} unidades disponibles`)
      setStatus({ text: 'Stock insuficiente', type: 'warning' })
      return
    }

    const existingItem = items.find(item => item.idElectrodomestico === selectedProduct.idElectrodomestico)
    if (existingItem) {
      setItems(items.map(item =>
        item.idElectrodomestico === selectedProduct.idElectrodomestico
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      ))
      toastContext.showInfo('Producto Actualizado', `Cantidad aumentada a ${existingItem.cantidad + cantidad}`)
      setStatus({ text: 'Cantidad actualizada', type: 'success' })
    } else {
      setItems([...items, {
        idElectrodomestico: selectedProduct.idElectrodomestico,
        cantidad,
        precio: selectedProduct.precioVenta,
      }])
      toastContext.showSuccess('Producto Agregado ✅', `${selectedProduct.nombre} agregado al carrito`)
      setStatus({ text: `${selectedProduct.nombre} agregado al carrito`, type: 'success' })
    }

    setCantidad(1)
    setSelectedProduct(null)
  }

  const removerItem = (index: number) => {
    const producto = productos.find(p => p.idElectrodomestico === items[index].idElectrodomestico)
    setItems(items.filter((_, i) => i !== index))
    setSelectedRowIndex(null)
    toastContext.showInfo('Producto Removido', `${producto?.nombre} eliminado del carrito`)
    setStatus({ text: 'Producto removido del carrito', type: 'success' })
  }

  const calcularTotales = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0)
    const descuentoEfectivo = subtotal * 0.33
    const totalEfectivo = subtotal - descuentoEfectivo

    return { subtotal, descuentoEfectivo, totalEfectivo }
  }

  const procesarVentaEfectivo = async () => {
    if (!formulario.cedula.trim() || !formulario.nombreCliente.trim()) {
      toastContext.showWarning('Datos Incompletos', 'Complete cédula y nombre del cliente')
      setStatus({ text: 'Complete los datos del cliente', type: 'warning' })
      return
    }
    if (items.length === 0) {
      toastContext.showWarning('Carrito Vacío', 'Agregue al menos un producto a la venta')
      setStatus({ text: 'Agregue al menos un producto', type: 'warning' })
      return
    }

    setStatus({ text: 'Procesando venta en efectivo...', type: 'loading' })

    const solicitud = {
      cedula: formulario.cedula,
      nombreCliente: formulario.nombreCliente,
      items,
      numeroCuotas: 0,
    }

    try {
      const response = await clienteUnificado.procesarVentaEfectivo(solicitud)
      if (response?.exito) {
        const { subtotal, descuentoEfectivo, totalEfectivo } = calcularTotales()
        
        const mensaje = `Factura N°: ${response.idFactura}
Cliente: ${formulario.nombreCliente}
Cédula: ${formulario.cedula}
Subtotal: $${subtotal.toFixed(2)}
Descuento (33%): -$${descuentoEfectivo.toFixed(2)}
TOTAL: $${totalEfectivo.toFixed(2)}`

        toastContext.showSuccess('Venta Procesada ✅', mensaje)
        
        setResultado(`✅ VENTA PROCESADA - EFECTIVO
Factura N°: ${response.idFactura}
Cliente: ${formulario.nombreCliente}
Cédula: ${formulario.cedula}
---
Subtotal: $${subtotal.toFixed(2)}
Descuento (33%): $${descuentoEfectivo.toFixed(2)}
TOTAL: $${totalEfectivo.toFixed(2)}`)
        setMostrarResultado(true)
        limpiarFormulario()
        setStatus({ text: 'Venta procesada exitosamente', type: 'success' })
      } else {
        toastContext.showError('Error en la Venta ❌', response?.mensaje || 'Error desconocido al procesar la venta')
        setStatus({ text: `Error: ${response?.mensaje || 'Error desconocido'}`, type: 'error' })
      }
    } catch (error) {
      setStatus({ text: 'Error de conexión', type: 'error' })
      toastContext.showError('Error de Conexión ❌', 'No se pudo procesar la venta. Intente de nuevo.')
    }
  }

  const procesarVentaCredito = async () => {
    if (!formulario.cedula.trim() || !formulario.nombreCliente.trim()) {
      toastContext.showWarning('Datos Incompletos', 'Complete cédula y nombre del cliente')
      setStatus({ text: 'Complete los datos del cliente', type: 'warning' })
      return
    }
    if (items.length === 0) {
      toastContext.showWarning('Carrito Vacío', 'Agregue al menos un producto a la venta')
      setStatus({ text: 'Agregue al menos un producto', type: 'warning' })
      return
    }

    if (!formulario.clienteValidado) {
      toastContext.showWarning('Cliente No Validado ⚠️', 'El cliente debe ser validado antes de procesar crédito. Haga clic en "Validar Cliente".')
      setStatus({ text: 'Cliente no validado', type: 'warning' })
      return
    }

    setStatus({ text: 'Procesando venta a crédito...', type: 'loading' })

    const solicitud = {
      cedula: formulario.cedula,
      nombreCliente: formulario.nombreCliente,
      items,
      numeroCuotas,
    }

    try {
      const response = await clienteUnificado.procesarVentaCredito(solicitud)
      if (response?.exito) {
        const { subtotal } = calcularTotales()

        // Preparar datos para el diálogo
        const resultadoCredito: CreditResult = {
          idFactura: response.idFactura,
          idCreditoBanco: response.idCreditoBanco,
          nombreCliente: formulario.nombreCliente,
          cedula: formulario.cedula,
          subtotal,
          cuotaMensual: response.cuotaMensual,
          numeroCuotas: response.numeroCuotas
        }

        setCreditResult(resultadoCredito)
        setShowCreditDialog(true) // Mostrar diálogo personalizado

        // Toast de confirmación rápida
        toastContext.showSuccess('Crédito Aprobado ✅', 'Venta a crédito procesada exitosamente')

        limpiarFormulario()
        setStatus({ text: 'Venta a crédito procesada exitosamente', type: 'success' })
      } else {
        toastContext.showError('Error en el Crédito ❌', response?.mensaje || 'No se pudo procesar el crédito')
        setStatus({ text: `Error: ${response?.mensaje || 'Error desconocido'}`, type: 'error' })
      }
    } catch (error) {
      setStatus({ text: 'Error de conexión', type: 'error' })
      toastContext.showError('Error de Conexión ❌', 'No se pudo procesar el crédito. Intente de nuevo.')
    }
  }

  const handleViewAmortization = () => {
    console.log('handleViewAmortization ejecutado') // Para debugging
    console.log('creditResult:', creditResult) // Para debugging

    if (creditResult?.idCreditoBanco) {
      console.log('Llamando onShowCreditTable con ID:', creditResult.idCreditoBanco) // Para debugging

      // Llamar directamente al callback del padre
      if (onShowCreditTable) {
        onShowCreditTable(creditResult.idCreditoBanco)
      }

      setShowCreditDialog(false)
    }
  }

  const limpiarFormulario = () => {
    setFormulario({ cedula: '', nombreCliente: '', clienteValidado: false, idCliente: 0 })
    setItems([])
    setCantidad(1)
    setSelectedProduct(null)
    setNumeroCuotas(12)
    setMostrarResultado(false)
  }

  const { subtotal, descuentoEfectivo, totalEfectivo } = calcularTotales()

  return (
    <div className="space-y-4">
      {/* Cliente Panel */}
      <div
        className="border rounded p-4 space-y-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg" style={{ color: 'var(--dark-gray)' }}>👤 Datos del Cliente</h3>
          {formulario.clienteValidado && (
            <span className="px-3 py-1 rounded text-xs font-bold animate-pulse" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
              ✅ Cliente Validado
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Cédula:</label>
            <Input
              placeholder="Ingrese cédula..."
              value={formulario.cedula}
              onChange={(e) => setFormulario({ ...formulario, cedula: e.target.value })}
              disabled={validando}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Nombre:</label>
            <Input
              placeholder="Ingrese nombre..."
              value={formulario.nombreCliente}
              onChange={(e) => setFormulario({ ...formulario, nombreCliente: e.target.value })}
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={validarCliente}
          disabled={validando}
          className="w-full"
          style={{
            backgroundColor: formulario.clienteValidado ? 'var(--success)' : 'var(--primary)',
            color: 'white',
            opacity: validando ? 0.7 : 1,
          }}
        >
          {validando ? '⏳ Validando...' : (formulario.clienteValidado ? '✅ Cliente Validado' : '✅ Validar Cliente')}
        </Button>
      </div>

      {/* Productos Panel */}
      <div
        className="border rounded p-4 space-y-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg" style={{ color: 'var(--dark-gray)' }}>🛒 Selección de Productos</h3>
          <Button
            onClick={cargarProductos}
            style={{ backgroundColor: 'var(--info)', color: 'white' }}
          >
            🔄 Actualizar
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Producto:</label>
            <select
              value={selectedProduct?.idElectrodomestico || ''}
              onChange={(e) => {
                const prod = productos.find(p => p.idElectrodomestico === parseInt(e.target.value))
                setSelectedProduct(prod || null)
              }}
              className="w-full border rounded px-3 py-2"
              style={{ borderColor: 'var(--medium-gray)' }}
            >
              <option value="">-- Seleccione un producto --</option>
              {productos.map(p => (
                <option key={p.idElectrodomestico} value={p.idElectrodomestico}>
                  {p.nombre} ({p.marca}) - ${p.precioVenta.toFixed(2)} - Stock: {p.stock}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Cantidad:</label>
            <Input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full"
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={agregarItem}
              className="w-full"
              style={{ backgroundColor: 'var(--success)', color: 'white' }}
            >
              ➕ Agregar
            </Button>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <th className="border p-2 text-left">Producto</th>
                <th className="border p-2 text-center">Cantidad</th>
                <th className="border p-2 text-right">Precio Unit.</th>
                <th className="border p-2 text-right">Subtotal</th>
                <th className="border p-2 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const prod = productos.find(p => p.idElectrodomestico === item.idElectrodomestico)
                return (
                  <tr
                    key={idx}
                    style={{
                      backgroundColor: selectedRowIndex === idx ? '#e8f4f8' : 'white',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelectedRowIndex(idx)}
                  >
                    <td className="border p-2">{prod?.nombre} ({prod?.marca})</td>
                    <td className="border p-2 text-center">{item.cantidad}</td>
                    <td className="border p-2 text-right">${item.precio.toFixed(2)}</td>
                    <td className="border p-2 text-right">${(item.cantidad * item.precio).toFixed(2)}</td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => removerItem(idx)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {items.length === 0 && (
          <div
            className="p-3 rounded text-center text-sm"
            style={{ backgroundColor: '#f0f0f0', color: 'var(--dark-gray)' }}
          >
            No hay productos agregados
          </div>
        )}
      </div>

      {/* Totales Panel */}
      <div
        className="border rounded p-4 space-y-3"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: '#f9f9f9' }}
      >
        <h3 className="font-bold text-center" style={{ color: 'var(--dark-gray)' }}>💰 Resumen de Totales</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between" style={{ color: 'var(--dark-gray)' }}>
            <span>Subtotal:</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between" style={{ color: 'var(--dark-gray)' }}>
            <span>Descuento (33% EFECTIVO):</span>
            <span className="font-bold" style={{ color: 'var(--success)' }}>-${descuentoEfectivo.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 flex justify-between" style={{ borderColor: 'var(--medium-gray)' }}>
            <span style={{ color: 'var(--success)', fontSize: '1.1em', fontWeight: 'bold' }}>TOTAL EFECTIVO:</span>
            <span style={{ color: 'var(--success)', fontSize: '1.1em', fontWeight: 'bold' }}>${totalEfectivo.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 flex justify-between" style={{ borderColor: 'var(--medium-gray)' }}>
            <span style={{ color: 'var(--warning)', fontSize: '1.1em', fontWeight: 'bold' }}>TOTAL CRÉDITO (sin desc.):</span>
            <span style={{ color: 'var(--warning)', fontSize: '1.1em', fontWeight: 'bold' }}>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Facturación Panel */}
      <div
        className="border rounded p-4 space-y-4"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <h3 className="font-bold text-lg" style={{ color: 'var(--dark-gray)' }}>💳 Facturación</h3>

        <div className="grid grid-cols-3 gap-4">
          <Button
            onClick={procesarVentaEfectivo}
            disabled={items.length === 0}
            className="w-full py-6 font-bold"
            style={{
              backgroundColor: 'var(--success)',
              color: 'white',
              opacity: items.length === 0 ? 0.5 : 1,
            }}
          >
            <div className="text-lg">💵 Venta Efectivo</div>
            <div className="text-xs mt-1">Desc. 33% = ${totalEfectivo.toFixed(2)}</div>
          </Button>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: 'var(--dark-gray)' }}>Cuotas:</label>
            <select
              value={numeroCuotas}
              onChange={(e) => setNumeroCuotas(parseInt(e.target.value))}
              className="flex-1 border rounded px-2 py-2"
              style={{ borderColor: 'var(--medium-gray)' }}
            >
              {[3, 6, 12, 18, 24].map(n => (
                <option key={n} value={n}>{n} meses @ ${(subtotal / n).toFixed(2)}</option>
              ))}
            </select>
          </div>

          <Button
            onClick={procesarVentaCredito}
            disabled={items.length === 0}
            className="w-full py-6 font-bold"
            style={{
              backgroundColor: items.length === 0 ? '#ccc' : (formulario.clienteValidado ? 'var(--warning)' : '#ff6b6b'),
              color: 'white',
            }}
          >
            <div className="text-lg">💳 Venta Crédito</div>
            <div className="text-xs mt-1">${(subtotal / numeroCuotas).toFixed(2)}/mes {!formulario.clienteValidado && '⚠️'}</div>
          </Button>
        </div>

        <div className="mt-4">
          <Button
            onClick={handleShowFacturas}
            className="w-full py-4 font-bold"
            style={{
              backgroundColor: 'var(--info)',
              color: 'white',
            }}
          >
            <div className="text-lg">📋 Ver Facturas</div>
            <div className="text-xs mt-1">Consultar facturas emitidas</div>
          </Button>
        </div>     

        {!formulario.clienteValidado && items.length > 0 && (
          <div
            className="p-3 rounded text-center text-xs border"
            style={{ backgroundColor: '#fff3e0', borderColor: 'var(--warning)', color: 'var(--warning)' }}
          >
            ⚠️ Cliente debe ser validado para procesar crédito
          </div>
        )}
      </div>

      {/* Resultado Modal */}
      {mostrarResultado && (
        <div
          className="border rounded p-4 space-y-3"
          style={{ borderColor: 'var(--success)', backgroundColor: '#e8f5e9' }}
        >
          <h4 className="font-bold" style={{ color: 'var(--success)' }}>📋 Resultado de la Venta</h4>
          <div
            className="p-3 rounded font-mono text-xs overflow-auto max-h-48 whitespace-pre"
            style={{ backgroundColor: '#1a1a1a', color: '#00ff00' }}
          >
            {resultado}
          </div>
          <Button
            onClick={() => setMostrarResultado(false)}
            className="w-full"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            Cerrar
          </Button>
        </div>
      )}

      {creditResult && (
        <CreditResultDialog
          isOpen={showCreditDialog}
          onClose={() => setShowCreditDialog(false)}
          resultado={creditResult}
          onViewAmortization={handleViewAmortization}
        />
      )}
    </div>
  )
}
