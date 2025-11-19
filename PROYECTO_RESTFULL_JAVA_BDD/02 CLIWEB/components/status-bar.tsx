'use client'

import { useEffect, useState } from 'react'

interface StatusBarProps {
  message: { text: string; type: string }
  connectionStatus: { connected: boolean; details: string }
  protocol: 'REST' | 'SOAP'
}

export default function StatusBar({ message, connectionStatus, protocol }: StatusBarProps) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const getMessageIcon = () => {
    switch (message.type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'loading':
        return '⏳'
      case 'info':
        return 'ℹ️'
      default:
        return ''
    }
  }

  const getMessageColor = () => {
    switch (message.type) {
      case 'success':
        return 'var(--success)'
      case 'error':
        return 'var(--danger)'
      case 'warning':
        return 'var(--warning)'
      case 'loading':
        return 'var(--info)'
      case 'info':
        return 'var(--info)'
      default:
        return 'var(--dark-gray)'
    }
  }

  return (
    <footer 
      className="border-t px-4 py-2 flex items-center justify-between text-sm"
      style={{ 
        backgroundColor: 'var(--light-gray)',
        borderTopColor: 'var(--medium-gray)',
        color: 'var(--medium-gray)'
      }}
    >
      <div className="flex items-center gap-2" style={{ color: getMessageColor() }}>
        {message.type !== 'default' && <span>{getMessageIcon()}</span>}
        <span>{message.text}</span>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <span className="flex items-center gap-1">
          {connectionStatus.connected ? '🟢' : '🔴'}
          {connectionStatus.connected ? 'Conectado' : 'Desconectado'}
        </span>
        <span style={{ color: 'var(--medium-gray)' }}>│</span>
        <span 
          className="px-2 py-0.5 rounded text-white"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          {protocol}
        </span>
        <span style={{ color: 'var(--medium-gray)' }}>│</span>
        <span>{time}</span>
      </div>
    </footer>
  )
}
