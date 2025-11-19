'use client'

import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message: string
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message: string) => void
  showSuccess: (title: string, message: string) => void
  showError: (title: string, message: string) => void
  showWarning: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void
}

export const toastContext: ToastContextType = {
  showToast: () => {},
  showSuccess: () => {},
  showError: () => {},
  showWarning: () => {},
  showInfo: () => {},
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, type, title, message }
    setToasts(prev => [...prev, newToast])

    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  Object.assign(toastContext, {
    showToast: addToast,
    showSuccess: (title: string, message: string) => addToast('success', title, message),
    showError: (title: string, message: string) => addToast('error', title, message),
    showWarning: (title: string, message: string) => addToast('warning', title, message),
    showInfo: (title: string, message: string) => addToast('info', title, message),
  })

  const getColors = (type: ToastType) => {
    const colors: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
      success: { bg: '#e8f5e9', border: '#4caf50', icon: '✅', text: '#2e7d32' },
      error: { bg: '#ffebee', border: '#f44336', icon: '❌', text: '#c62828' },
      warning: { bg: '#fff3e0', border: '#ff9800', icon: '⚠️', text: '#e65100' },
      info: { bg: '#e3f2fd', border: '#2196f3', icon: 'ℹ️', text: '#1565c0' },
    }
    return colors[type]
  }

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 space-y-3 z-50 max-w-sm">
        {toasts.map(toast => {
          const colors = getColors(toast.type)
          return (
            <div
              key={toast.id}
              className="rounded-xl shadow-2xl p-6 border-l-4 animate-slideIn"
              style={{
                backgroundColor: colors.bg,
                borderLeftColor: colors.border,
              }}
            >
              <div className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{colors.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg" style={{ color: colors.text }}>
                    {toast.title}
                  </h4>
                  <p className="text-base mt-2" style={{ color: colors.text }}>
                    {toast.message}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
