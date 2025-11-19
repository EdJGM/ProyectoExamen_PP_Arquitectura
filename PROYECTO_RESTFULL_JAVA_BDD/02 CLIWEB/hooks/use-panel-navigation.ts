import { useState, useCallback } from 'react'

interface PanelNavigationContext {
    pendingCreditId: number | null
    navigateToCredit: (creditId: number) => void
    clearPendingCredit: () => void
}

let globalPanelContext: PanelNavigationContext = {
    pendingCreditId: null,
    navigateToCredit: () => { },
    clearPendingCredit: () => { }
}

export const usePanelNavigation = () => {
    const [pendingCreditId, setPendingCreditId] = useState<number | null>(null)

    const navigateToCredit = useCallback((creditId: number) => {
        setPendingCreditId(creditId)
        globalPanelContext.pendingCreditId = creditId
    }, [])

    const clearPendingCredit = useCallback(() => {
        setPendingCreditId(null)
        globalPanelContext.pendingCreditId = null
    }, [])

    globalPanelContext.navigateToCredit = navigateToCredit
    globalPanelContext.clearPendingCredit = clearPendingCredit

    return {
        pendingCreditId,
        navigateToCredit,
        clearPendingCredit
    }
}

export const getPanelContext = () => globalPanelContext