'use client'

interface SidebarProps {
  activePanel: string
  onPanelChange: (panel: 'productos' | 'facturacion' | 'credito' | 'conectividad') => void
}

export default function Sidebar({ activePanel, onPanelChange }: SidebarProps) {
  const menuItems = [
    { id: 'productos', icon: '📦', label: 'Productos' },
    { id: 'facturacion', icon: '🧾', label: 'Facturación' },
    { id: 'credito', icon: '💳', label: 'Crédito' },
    { id: 'conectividad', icon: '🔧', label: 'Conectividad' },
  ]

  return (
    <aside 
      className="w-48 text-white flex flex-col border-r"
      style={{ 
        backgroundColor: 'var(--bg-sidebar)',
        borderRightColor: 'var(--dark-gray)'
      }}
    >
      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id as any)}
            className="w-full text-left px-4 py-3 rounded font-medium transition flex items-center gap-3"
            style={{
              backgroundColor: activePanel === item.id ? 'var(--primary)' : 'transparent',
              color: 'white'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div 
        className="border-t p-4 text-center text-sm"
        style={{ borderTopColor: 'var(--dark-gray)', color: 'var(--light-gray)' }}
      >
        <p className="font-medium">Escuela Politécnica Nacional del Ejército</p>
        <p className="text-xs mt-2" style={{ color: 'var(--medium-gray)' }}>v1.0.0</p>
      </div>
    </aside>
  )
}
