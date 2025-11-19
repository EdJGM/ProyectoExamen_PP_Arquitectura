'use client'

import { useState, useEffect } from 'react'
import Login from '@/app/login'

export default function LoginGuard({ children }: { children: React.ReactNode }) {
    const [autenticado, setAutenticado] = useState(false)
    useEffect(() => {
        setAutenticado(!!localStorage.getItem('usuario'))
    }, [])
    if (!autenticado) {
        return <Login />
    }
    return <>{children}</>
}