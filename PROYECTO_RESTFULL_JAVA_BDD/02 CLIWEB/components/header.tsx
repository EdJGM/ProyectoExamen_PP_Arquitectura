'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [usuario, setUsuario] = useState('')

  useEffect(() => {
    setUsuario(localStorage.getItem('usuario') || '')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    window.location.href = '/login'
  }

  return (
    <header
      className="text-white px-5 py-4 border-b-2"
      style={{
        backgroundColor: 'var(--bg-header)',
        borderBottomColor: 'var(--primary-dark)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏛️</span>
          <h1 className="text-2xl font-bold">ESPE - Comercializadora Electrodomésticos</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-lg">👤 {usuario}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded font-medium text-white"
            style={{ backgroundColor: 'var(--danger)' }}
          >
            🔒 Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}