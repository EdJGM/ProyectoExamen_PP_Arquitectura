'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Login({ onLogin }: { onLogin?: (user: string, protocol: 'REST' | 'SOAP') => void }) {
    const [usuario, setUsuario] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [protocol, setProtocol] = useState<'REST' | 'SOAP'>('REST')
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (usuario === 'MONSTER' && contrasena === 'MONSTER9') {
            setError('')
            if (onLogin) onLogin(usuario, protocol)
            else window.location.href = '/'
            localStorage.setItem('usuario', usuario)
            localStorage.setItem('protocol', protocol)
        } else {
            setError('Credenciales incorrectas')
        }
    }

    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border" style={{ borderColor: 'var(--primary)' }}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">🏛️</span>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                        ESPE - Comercializadora Electrodomésticos
                    </h1>
                </div>
                <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--primary)' }}>Iniciar sesión</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            style={{ borderColor: 'var(--medium-gray)' }}
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Contraseña</label>
                        <input
                            type="password"
                            value={contrasena}
                            onChange={e => setContrasena(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            style={{ borderColor: 'var(--medium-gray)' }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--dark-gray)' }}>Protocolo</label>
                        <select
                            value={protocol}
                            onChange={e => setProtocol(e.target.value as 'REST' | 'SOAP')}
                            className="w-full px-3 py-2 border rounded"
                            style={{ borderColor: 'var(--medium-gray)' }}
                        >
                            <option value="REST">Java RESTful</option>
                            <option value="SOAP">SOAP .NET</option>
                        </select>
                    </div>
                    {error && (
                        <div className="mb-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
                            {error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        className="w-full py-2 font-bold"
                        style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                    >
                        🗝️ Iniciar Sesión
                    </Button>
                </form>
            </div>
        </div>
    )
}