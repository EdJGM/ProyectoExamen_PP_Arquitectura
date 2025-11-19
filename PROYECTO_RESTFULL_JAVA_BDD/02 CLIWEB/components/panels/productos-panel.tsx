'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { clienteUnificado } from '@/lib/api-client'

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

interface ProductosPanelProps {
  setStatus: (status: { text: string; type: string }) => void
}

interface ProductoModalProps {
  isOpen: boolean
  producto?: Electrodomestico
  onClose: () => void
  onSave: (producto: Electrodomestico) => Promise<void>
}

// Modal para crear/editar productos
function ProductoModal({ isOpen, producto, onClose, onSave }: ProductoModalProps) {
  const [formData, setFormData] = useState<Electrodomestico>(
    producto || {
      idElectrodomestico: 0,
      codigo: '',
      nombre: '',
      descripcion: '',
      marca: '',
      precioVenta: 0,
      stock: 0,
      estado: 'DISPONIBLE',
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (producto) {
      setFormData(producto)
    }
  }, [producto, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precioVenta' || name === 'stock' ? parseFloat(value) : value
    }))
  }

  const validateForm = () => {
    if (!formData.codigo.trim()) {
      setError('El código es requerido')
      return false
    }
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido')
      return false
    }
    if (formData.precioVenta <= 0) {
      setError('El precio debe ser mayor a 0')
      return false
    }
    if (formData.stock < 0) {
      setError('El stock no puede ser negativo')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      await onSave(formData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        style={{ backgroundColor: 'white', borderTop: `4px solid var(--primary)` }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--primary)' }}>
          {producto ? 'Editar Producto' : 'Agregar Producto'}
        </h3>

        {error && (
          <div className="mb-4 p-3 rounded text-sm" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Código *</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{ borderColor: 'var(--medium-gray)' }}
              disabled={loading || !!producto}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{ borderColor: 'var(--medium-gray)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{ borderColor: 'var(--medium-gray)' }}
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{ borderColor: 'var(--medium-gray)' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Precio *</label>
              <input
                type="number"
                name="precioVenta"
                value={formData.precioVenta}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded"
                style={{ borderColor: 'var(--medium-gray)' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border rounded"
                style={{ borderColor: 'var(--medium-gray)' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              style={{ borderColor: 'var(--medium-gray)' }}
            >
              <option value="DISPONIBLE">Disponible</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 rounded font-medium text-white"
              style={{ backgroundColor: 'var(--medium-gray)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded font-medium text-white"
              style={{ backgroundColor: 'var(--success)' }}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ProductosPanel({ setStatus }: ProductosPanelProps) {
  const [productos, setProductos] = useState<Electrodomestico[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProducto, setEditingProducto] = useState<Electrodomestico | undefined>()

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    setLoading(true)
    setStatus({ text: 'Cargando productos...', type: 'loading' })
    
    try {
      const result = await clienteUnificado.listarElectrodomesticos()
      
      if (result) {
        setProductos(result)
        setStatus({ text: `Productos cargados: ${result.length}`, type: 'success' })
      } else {
        // Fallback a datos simulados si no hay conexión
        const productosSimulados: Electrodomestico[] = [
          {
            idElectrodomestico: 1,
            codigo: 'REF001',
            nombre: 'Refrigerador 18 pies',
            descripcion: 'Refrigerador de doble puerta con congelador',
            marca: 'LG',
            precioVenta: 1200,
            stock: 5,
            estado: 'Activo',
          },
          {
            idElectrodomestico: 2,
            codigo: 'LAV001',
            nombre: 'Lavadora Automática',
            descripcion: 'Lavadora de 8kg con ciclos automáticos',
            marca: 'Samsung',
            precioVenta: 800,
            stock: 3,
            estado: 'Activo',
          },
          {
            idElectrodomestico: 3,
            codigo: 'TV001',
            nombre: 'TV LED 55"',
            descripcion: 'Televisor LED 55 pulgadas 4K',
            marca: 'Sony',
            precioVenta: 650,
            stock: 8,
            estado: 'Activo',
          },
        ]
        setProductos(productosSimulados)
        setStatus({ text: 'Usando datos simulados (servidor no disponible)', type: 'warning' })
      }
    } catch (error) {
      setStatus({ text: 'Error al cargar productos', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleAgregar = () => {
    setEditingProducto(undefined)
    setModalOpen(true)
  }

  const handleEditar = () => {
    if (selectedRow === null) {
      setStatus({ text: 'Seleccione un producto para editar', type: 'warning' })
      return
    }
    const producto = productosFiltrados[selectedRow]
    setEditingProducto(producto)
    setModalOpen(true)
  }

  const handleEliminar = async () => {
    if (selectedRow === null) {
      setStatus({ text: 'Seleccione un producto para eliminar', type: 'warning' })
      return
    }

    const producto = productosFiltrados[selectedRow]
    const confirmacion = window.confirm(
      `¿Está seguro de eliminar el producto?\n\nCódigo: ${producto.codigo}\nNombre: ${producto.nombre}\n\nEsta acción no se puede deshacer.`
    )

    if (!confirmacion) return

    setLoading(true)
    setStatus({ text: 'Eliminando producto...', type: 'loading' })

    try {
      const result = await clienteUnificado.eliminarElectrodomestico(producto.idElectrodomestico)
      
      if (result && result.exito) {
        setStatus({ text: 'Producto eliminado correctamente', type: 'success' })
        setSelectedRow(null)
        await cargarProductos()
      } else {
        const error = result?.mensaje || 'Error desconocido'
        setStatus({ text: `Error al eliminar: ${error}`, type: 'error' })
      }
    } catch (error) {
      setStatus({ text: `Error: ${error instanceof Error ? error.message : 'desconocido'}`, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProducto = async (formData: Electrodomestico) => {
    setStatus({ text: editingProducto ? 'Actualizando producto...' : 'Creando producto...', type: 'loading' })

    try {
      let result
      if (editingProducto) {
        result = await clienteUnificado.actualizarElectrodomestico(editingProducto.idElectrodomestico, formData)
      } else {
        result = await clienteUnificado.crearElectrodomestico(formData)
      }

      if (result && result.exito) {
        setStatus({ 
          text: editingProducto ? 'Producto actualizado correctamente' : 'Producto creado correctamente', 
          type: 'success' 
        })
        setSelectedRow(null)
        await cargarProductos()
      } else {
        const error = result?.mensaje || 'Error desconocido'
        throw new Error(`Error al guardar: ${error}`)
      }
    } catch (error) {
      throw error
    }
  }

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.marca.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <Input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={cargarProductos} 
          disabled={loading}
          className="px-4 py-2 rounded font-medium text-white"
          style={{ backgroundColor: 'var(--info)' }}
        >
          🔄 Actualizar
        </Button>
        <Button 
          onClick={handleAgregar} 
          disabled={loading}
          className="px-4 py-2 rounded font-medium text-white"
          style={{ backgroundColor: 'var(--success)' }}
        >
          ➕ Agregar
        </Button>
        <Button 
          onClick={handleEditar} 
          disabled={loading || selectedRow === null}
          className="px-4 py-2 rounded font-medium text-white"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          ✏️ Editar
        </Button>
        <Button 
          onClick={handleEliminar} 
          disabled={loading || selectedRow === null}
          className="px-4 py-2 rounded font-medium text-white"
          style={{ backgroundColor: 'var(--danger)' }}
        >
          🗑️ Eliminar
        </Button>
      </div>

      <div 
        className="overflow-x-auto border rounded"
        style={{ borderColor: 'var(--medium-gray)', backgroundColor: 'white' }}
      >
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Código</th>
              <th className="px-4 py-2 text-left font-semibold">Nombre</th>
              <th className="px-4 py-2 text-left font-semibold">Marca</th>
              <th className="px-4 py-2 text-center font-semibold">Precio</th>
              <th className="px-4 py-2 text-center font-semibold">Stock</th>
              <th className="px-4 py-2 text-center font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto, idx) => (
              <tr 
                key={producto.idElectrodomestico}
                onClick={() => setSelectedRow(idx)}
                style={{ 
                  borderBottom: '1px solid var(--light-gray)',
                  backgroundColor: selectedRow === idx ? 'var(--primary-light)' : (idx % 2 === 0 ? 'white' : 'var(--light-gray)'),
                  cursor: 'pointer',
                  fontWeight: selectedRow === idx ? 'bold' : 'normal'
                }}
              >
                <td className="px-4 py-2">{producto.codigo}</td>
                <td className="px-4 py-2">{producto.nombre}</td>
                <td className="px-4 py-2">{producto.marca}</td>
                <td className="px-4 py-2 text-center font-medium">${producto.precioVenta.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">
                  <span 
                    className="px-2 py-1 rounded text-white font-medium text-xs"
                    style={{ backgroundColor: producto.stock > 0 ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {producto.stock}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span 
                    className="px-2 py-1 rounded text-white text-xs font-medium"
                    style={{ backgroundColor: 'var(--success)' }}
                  >
                    {producto.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {productosFiltrados.length === 0 && (
          <div className="text-center py-8" style={{ color: 'var(--medium-gray)' }}>
            No hay productos que coincidan con la búsqueda
          </div>
        )}
      </div>

      <ProductoModal
        isOpen={modalOpen}
        producto={editingProducto}
        onClose={() => {
          setModalOpen(false)
          setEditingProducto(undefined)
        }}
        onSave={handleSaveProducto}
      />
    </div>
  )
}
