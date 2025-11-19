'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { clienteUnificado } from '@/lib/api-client'
import { toastContext } from '@/components/ui/toast-notification'

interface Factura {
    idFactura: number
    numeroFactura: string
    cedulaCliente: string
    nombreCliente: string
    fechaFactura: string
    subtotal: number
    descuento: number
    total: number
    formaPago: string
    estado: string
    numeroCuotas?: number
    cuotaMensual?: number
    idCreditoBanco?: number
    items?: ItemFactura[]
}

interface ItemFactura {
    idElectrodomestico: number
    nombre: string
    marca: string
    cantidad: number
    precioUnitario: number
    subtotal: number
}

interface FacturasPanelProps {
    setStatus: (status: { text: string; type: string }) => void
}

export default function FacturasPanel({ setStatus }: FacturasPanelProps) {
    const [facturas, setFacturas] = useState<Factura[]>([])
    const [facturasFiltradas, setFacturasFiltradas] = useState<Factura[]>([])
    const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null)
    const [mostrarDetalle, setMostrarDetalle] = useState(false)
    const [filtros, setFiltros] = useState({
        busqueda: '',
        formaPago: 'todas',
        estado: 'todos'
    })
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        cargarFacturas()
    }, [])

    useEffect(() => {
        aplicarFiltros()
    }, [filtros, facturas])

    const cargarFacturas = async () => {
        setCargando(true)
        setStatus({ text: 'Cargando facturas...', type: 'loading' })

        try {
            const result = await clienteUnificado.listarFacturas()
            if (result && Array.isArray(result)) {
                setFacturas(result)
                setStatus({ text: `Facturas cargadas: ${result.length}`, type: 'success' })
                toastContext.showSuccess('Facturas Cargadas ✅', `Se cargaron ${result.length} facturas correctamente`)
            } else {
                // Datos simulados para fallback
                const facturasSim = [
                    {
                        idFactura: 1,
                        numeroFactura: 'FAC-000001',
                        cedulaCliente: '1234567890',
                        nombreCliente: 'Juan Pérez',
                        fechaFactura: '2024-11-19 10:30:00',
                        subtotal: 1200,
                        descuento: 396,
                        total: 804,
                        formaPago: 'EFECTIVO',
                        estado: 'PAGADA'
                    },
                    {
                        idFactura: 2,
                        numeroFactura: 'FAC-000002',
                        cedulaCliente: '0987654321',
                        nombreCliente: 'María González',
                        fechaFactura: '2024-11-19 11:15:00',
                        subtotal: 850,
                        descuento: 0,
                        total: 850,
                        formaPago: 'CREDITO_DIRECTO',
                        estado: 'PAGADA',
                        numeroCuotas: 12,
                        cuotaMensual: 75.50,
                        idCreditoBanco: 1
                    }
                ]
                setFacturas(facturasSim)
                setStatus({ text: 'Datos simulados (servidor no disponible)', type: 'warning' })
                toastContext.showWarning('Modo Simulación ⚠️', 'Mostrando datos de ejemplo')
            }
        } catch (error) {
            setStatus({ text: 'Error al cargar facturas', type: 'error' })
            toastContext.showError('Error de Conexión ❌', 'No se pudieron cargar las facturas')
            setFacturas([])
        } finally {
            setCargando(false)
        }
    }

    const aplicarFiltros = () => {
        let resultado = [...facturas]

        // Filtro por texto
        if (filtros.busqueda.trim()) {
            const busqueda = filtros.busqueda.toLowerCase()
            resultado = resultado.filter(f =>
                f.numeroFactura.toLowerCase().includes(busqueda) ||
                f.nombreCliente.toLowerCase().includes(busqueda) ||
                f.cedulaCliente.includes(busqueda)
            )
        }

        // Filtro por forma de pago
        if (filtros.formaPago !== 'todas') {
            resultado = resultado.filter(f => f.formaPago === filtros.formaPago)
        }

        // Filtro por estado
        if (filtros.estado !== 'todos') {
            resultado = resultado.filter(f => f.estado === filtros.estado)
        }

        setFacturasFiltradas(resultado)
    }

    const limpiarFiltros = () => {
        setFiltros({ busqueda: '', formaPago: 'todas', estado: 'todos' })
        toastContext.showInfo('Filtros Limpiados 🧹', 'Se han removido todos los filtros')
        setStatus({ text: 'Filtros limpiados', type: 'success' })
    }

    const verDetalleFactura = async (idFactura: number) => {
        setCargando(true)
        setStatus({ text: 'Cargando detalle de factura...', type: 'loading' })

        try {
            const result = await clienteUnificado.obtenerFactura(idFactura)

            if (result?.encontrada) {
                setFacturaSeleccionada({
                    idFactura: result.idFactura,
                    numeroFactura: result.numeroFactura,
                    cedulaCliente: result.cedulaCliente,
                    nombreCliente: result.nombreCliente,
                    fechaFactura: result.fechaFactura,
                    subtotal: result.subtotal,
                    descuento: result.descuento,
                    total: result.total,
                    formaPago: result.formaPago,
                    estado: result.estado,
                    numeroCuotas: result.numeroCuotas,
                    cuotaMensual: result.cuotaMensual,
                    idCreditoBanco: result.idCreditoBanco,
                    items: result.items || []
                })
                setMostrarDetalle(true)
                setStatus({ text: 'Detalle cargado exitosamente', type: 'success' })
            } else {
                toastContext.showError('Factura No Encontrada ❌', result?.mensaje || 'La factura no existe')
                setStatus({ text: 'Factura no encontrada', type: 'error' })
            }
        } catch (error) {
            toastContext.showError('Error de Conexión ❌', 'No se pudo cargar el detalle de la factura')
            setStatus({ text: 'Error al cargar detalle', type: 'error' })
        } finally {
            setCargando(false)
        }
    }

    const buscarFacturaPorId = async () => {
        const id = prompt('Ingrese el ID de la factura:')
        if (id && !isNaN(Number(id))) {
            await verDetalleFactura(Number(id))
        } else if (id) {
            toastContext.showWarning('ID Inválido ⚠️', 'Por favor ingrese un número válido')
        }
    }

    const formatearFecha = (fecha: string) => {
        return fecha.includes(' ') ? fecha.split(' ')[0] : fecha
    }

    const obtenerTextoFormaPago = (formaPago: string) => {
        return formaPago === 'EFECTIVO' ? '💵 Efectivo (33% desc.)' : '💳 Crédito Directo'
    }

    const obtenerTextoEstado = (estado: string) => {
        return estado === 'PAGADA' ? '✅ Pagada' : '⏳ Pendiente'
    }

    const obtenerColorEstado = (estado: string) => {
        return estado === 'PAGADA' ? 'var(--success)' : 'var(--warning)'
    }

    return (
        <div className="space-y-4">
            {/* Panel de Filtros */}
            <div
                className="border rounded p-4 space-y-4"
                style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
            >
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg" style={{ color: 'var(--dark-gray)' }}>🔍 Filtros de Búsqueda</h3>
                    <div className="space-x-2">
                        <Button
                            onClick={cargarFacturas}
                            disabled={cargando}
                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                        >
                            {cargando ? '⏳ Cargando...' : '🔄 Actualizar'}
                        </Button>
                        <Button
                            onClick={buscarFacturaPorId}
                            style={{ backgroundColor: 'var(--info)', color: 'white' }}
                        >
                            🔍 Buscar por ID
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
                            Buscar:
                        </label>
                        <Input
                            placeholder="Número, cliente o cédula..."
                            value={filtros.busqueda}
                            onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
                            Forma de Pago:
                        </label>
                        <select
                            value={filtros.formaPago}
                            onChange={(e) => setFiltros({ ...filtros, formaPago: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            style={{ borderColor: 'var(--medium-gray)' }}
                        >
                            <option value="todas">Todas</option>
                            <option value="EFECTIVO">Efectivo</option>
                            <option value="CREDITO_DIRECTO">Crédito</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>
                            Estado:
                        </label>
                        <select
                            value={filtros.estado}
                            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            style={{ borderColor: 'var(--medium-gray)' }}
                        >
                            <option value="todos">Todos</option>
                            <option value="PAGADA">Pagada</option>
                            <option value="PENDIENTE">Pendiente</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={limpiarFiltros}
                            className="w-full"
                            style={{ backgroundColor: 'var(--warning)', color: 'white' }}
                        >
                            🧹 Limpiar
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabla de Facturas */}
            <div
                className="border rounded p-4"
                style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg" style={{ color: 'var(--dark-gray)' }}>
                        📋 Lista de Facturas ({facturasFiltradas.length})
                    </h3>
                </div>

                {facturasFiltradas.length === 0 ? (
                    <div
                        className="p-8 text-center rounded"
                        style={{ backgroundColor: '#f0f0f0', color: 'var(--medium-gray)' }}
                    >
                        {cargando ? (
                            <div>
                                <div className="animate-spin inline-block w-6 h-6 border-2 rounded-full border-blue-500 border-t-transparent mb-4"></div>
                                <p>Cargando facturas...</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-4xl mb-4">📄</p>
                                <p className="text-lg font-medium">No hay facturas registradas</p>
                                <p className="text-sm">Las facturas aparecerán aquí cuando realice ventas</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                    <th className="border p-3 text-left">ID</th>
                                    <th className="border p-3 text-left">Número</th>
                                    <th className="border p-3 text-left">Cliente</th>
                                    <th className="border p-3 text-left">Cédula</th>
                                    <th className="border p-3 text-left">Fecha</th>
                                    <th className="border p-3 text-right">Total</th>
                                    <th className="border p-3 text-center">Forma Pago</th>
                                    <th className="border p-3 text-center">Estado</th>
                                    <th className="border p-3 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {facturasFiltradas.map((factura, idx) => (
                                    <tr
                                        key={factura.idFactura}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => verDetalleFactura(factura.idFactura)}
                                    >
                                        <td className="border p-3 font-mono">{factura.idFactura}</td>
                                        <td className="border p-3 font-mono">{factura.numeroFactura}</td>
                                        <td className="border p-3">{factura.nombreCliente}</td>
                                        <td className="border p-3 font-mono">{factura.cedulaCliente}</td>
                                        <td className="border p-3 font-mono">{formatearFecha(factura.fechaFactura)}</td>
                                        <td className="border p-3 text-right font-bold" style={{ color: 'var(--success)' }}>
                                            ${factura.total.toFixed(2)}
                                        </td>
                                        <td className="border p-3 text-center text-xs">
                                            {obtenerTextoFormaPago(factura.formaPago)}
                                        </td>
                                        <td className="border p-3 text-center text-xs" style={{ color: obtenerColorEstado(factura.estado) }}>
                                            {obtenerTextoEstado(factura.estado)}
                                        </td>
                                        <td className="border p-3 text-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    verDetalleFactura(factura.idFactura)
                                                }}
                                                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                                            >
                                                👁️ Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de Detalle */}
            {mostrarDetalle && facturaSeleccionada && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setMostrarDetalle(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <div>
                                <h2 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                                    📄 {facturaSeleccionada.numeroFactura}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    📅 {facturaSeleccionada.fechaFactura}
                                </p>
                            </div>
                            <button
                                onClick={() => setMostrarDetalle(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Información del Cliente */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="font-bold mb-3" style={{ color: 'var(--dark-gray)' }}>👤 Información del Cliente</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Nombre:</span> {facturaSeleccionada.nombreCliente}</p>
                                    <p><span className="font-medium">Cédula:</span> {facturaSeleccionada.cedulaCliente}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-3" style={{ color: 'var(--dark-gray)' }}>💳 Información de Pago</h3>
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-medium">Forma de Pago:</span> {obtenerTextoFormaPago(facturaSeleccionada.formaPago)}</p>
                                    <p><span className="font-medium">Estado:</span>
                                        <span style={{ color: obtenerColorEstado(facturaSeleccionada.estado) }}>
                                            {obtenerTextoEstado(facturaSeleccionada.estado)}
                                        </span>
                                    </p>
                                    {facturaSeleccionada.formaPago === 'CREDITO_DIRECTO' && facturaSeleccionada.numeroCuotas && (
                                        <>
                                            <p><span className="font-medium">ID Crédito:</span> #{facturaSeleccionada.idCreditoBanco}</p>
                                            <p><span className="font-medium">Cuotas:</span> {facturaSeleccionada.numeroCuotas} de ${facturaSeleccionada.cuotaMensual?.toFixed(2)}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Productos */}
                        {facturaSeleccionada.items && facturaSeleccionada.items.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold mb-3" style={{ color: 'var(--dark-gray)' }}>🛒 Productos</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr style={{ backgroundColor: 'var(--light-gray)' }}>
                                                <th className="border p-2 text-left">Producto</th>
                                                <th className="border p-2 text-left">Marca</th>
                                                <th className="border p-2 text-center">Cantidad</th>
                                                <th className="border p-2 text-right">Precio Unit.</th>
                                                <th className="border p-2 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {facturaSeleccionada.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="border p-2">{item.nombre}</td>
                                                    <td className="border p-2">{item.marca}</td>
                                                    <td className="border p-2 text-center">{item.cantidad}</td>
                                                    <td className="border p-2 text-right">${item.precioUnitario.toFixed(2)}</td>
                                                    <td className="border p-2 text-right">${item.subtotal.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Totales */}
                        <div className="border-t pt-4">
                            <div className="flex justify-end">
                                <div className="text-right space-y-2">
                                    <p className="text-lg"><span className="font-medium">Subtotal:</span> ${facturaSeleccionada.subtotal.toFixed(2)}</p>
                                    {facturaSeleccionada.descuento > 0 && (
                                        <p className="text-lg" style={{ color: 'var(--success)' }}>
                                            <span className="font-medium">Descuento:</span> -${facturaSeleccionada.descuento.toFixed(2)}
                                        </p>
                                    )}
                                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                                        TOTAL: ${facturaSeleccionada.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-center mt-6 space-x-4">
                            {facturaSeleccionada.formaPago === 'CREDITO_DIRECTO' && facturaSeleccionada.idCreditoBanco && (
                                <Button
                                    onClick={() => {
                                        setMostrarDetalle(false)
                                        // Aquí implementarías la navegación a la tabla de amortización
                                        toastContext.showInfo('Navegación 📊', 'Función de tabla de amortización disponible en el panel de crédito')
                                    }}
                                    style={{ backgroundColor: 'var(--info)', color: 'white' }}
                                >
                                    📊 Ver Tabla de Amortización
                                </Button>
                            )}
                            <Button
                                onClick={() => setMostrarDetalle(false)}
                                style={{ backgroundColor: 'var(--medium-gray)', color: 'white' }}
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}